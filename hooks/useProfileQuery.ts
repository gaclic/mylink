import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  username: string;
  bio: string;
}

export const profileKeys = {
  all: ["profile"] as const,
  detail: (uid: string) => [...profileKeys.all, uid] as const,
};

export function useProfileQuery(user: User | null | undefined) {
  return useQuery({
    queryKey: user ? profileKeys.detail(user.uid) : [],
    queryFn: async () => {
      if (!user) return null;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        let needsUpdate = false;

        // 마이그레이션 1: username이 아예 없는 과거 데이터인 경우
        if (!data.username) {
          data.username = user.displayName || user.uid;
          needsUpdate = true;
        }

        // 마이그레이션 2: 이전 로직으로 생성되어 (username = 이메일 앞부분, displayName = 구글 이름) 형태인 경우
        if (
          user.email &&
          data.username === user.email.split("@")[0] &&
          data.displayName === user.displayName
        ) {
          data.username = user.displayName || user.uid;
          data.displayName = user.email.split("@")[0];
          needsUpdate = true;
        }

        if (needsUpdate) {
          updateDoc(userRef, {
            username: data.username,
            displayName: data.displayName,
          }).catch(console.error);
        }

        return data;
      }

      // Create initial profile if it doesn't exist
      let defaultUsername = user.displayName ? user.displayName : user.uid;
      let defaultDisplayName = "User";

      if (user.email) {
        const emailPrefix = user.email.split("@")[0];
        defaultDisplayName = emailPrefix;
      }

      const initialProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: defaultDisplayName,
        photoURL: user.photoURL,
        username: defaultUsername,
        bio: "환영합니다! 이곳에 소개글을 작성할 수 있어요.",
      };

      await setDoc(userRef, {
        ...initialProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return initialProfile;
    },
    enabled: !!user,
  });
}

export function useUpdateProfileMutation(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!uid) throw new Error("No user ID");
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return updates;
    },
    onMutate: async (newProfileUpdates) => {
      if (!uid) return;
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: profileKeys.detail(uid) });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<UserProfile>(profileKeys.detail(uid));

      // Optimistically update to the new value
      if (previousProfile) {
        queryClient.setQueryData<UserProfile>(profileKeys.detail(uid), {
          ...previousProfile,
          ...newProfileUpdates,
        });
      }

      // Return a context object with the snapshotted value
      return { previousProfile };
    },
    onError: (err, newProfileUpdates, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProfile && uid) {
        queryClient.setQueryData<UserProfile>(profileKeys.detail(uid), context.previousProfile);
      }
    },
    onSettled: () => {
      if (uid) {
        // queryClient.invalidateQueries({ queryKey: profileKeys.detail(uid) });
      }
    },
  });
}
