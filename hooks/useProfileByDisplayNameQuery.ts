import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { UserProfile } from "./useProfileQuery";

export const profileByDisplayNameKeys = {
  all: ["profileByDisplayName"] as const,
  detail: (displayName: string) => [...profileByDisplayNameKeys.all, displayName] as const,
};

export function useProfileByDisplayNameQuery(displayName: string | undefined) {
  return useQuery({
    queryKey: displayName ? profileByDisplayNameKeys.detail(displayName) : [],
    queryFn: async () => {
      if (!displayName) return null;

      const q = query(
        collection(db, "users"),
        where("displayName", "==", displayName),
        limit(1)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      return snapshot.docs[0].data() as UserProfile;
    },
    enabled: !!displayName,
  });
}
