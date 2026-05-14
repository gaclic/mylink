import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, doc, updateDoc, deleteDoc, increment } from "firebase/firestore";
import { Link as LinkType } from "@/data/links";

export const linksKeys = {
  all: ["links"] as const,
  lists: (uid: string) => [...linksKeys.all, uid] as const,
};

// 1. Fetch Links (Query)
export function useGetLinks(uid: string | undefined) {
  return useQuery({
    queryKey: uid ? linksKeys.lists(uid) : [],
    queryFn: async () => {
      if (!uid) return [];
      const q = query(collection(db, "users", uid, "links"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as LinkType[];
    },
    enabled: !!uid,
  });
}

// 2. Add Link (Mutation)
export function useAddLink(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLink: Omit<LinkType, "id">) => {
      if (!uid) throw new Error("No user ID");
      const docRef = await addDoc(collection(db, "users", uid, "links"), {
        ...newLink,
        clickCount: 0,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...newLink };
    },
    onSuccess: (data) => {
      if (uid) {
        queryClient.setQueryData<LinkType[]>(linksKeys.lists(uid), (oldData) => {
          return oldData ? [data, ...oldData] : [data];
        });
      }
    },
  });
}

// 3. Update Link (Mutation)
export function useUpdateLink(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, url }: { id: string; title: string; url: string }) => {
      if (!uid) throw new Error("No user ID");
      const linkRef = doc(db, "users", uid, "links", id);
      await updateDoc(linkRef, {
        title,
        url,
        updatedAt: serverTimestamp(),
      });
      return { id, title, url };
    },
    onSuccess: (data) => {
      if (uid) {
        queryClient.setQueryData<LinkType[]>(linksKeys.lists(uid), (oldData) => {
          if (!oldData) return [];
          return oldData.map((link) => (link.id === data.id ? { ...link, title: data.title, url: data.url } : link));
        });
      }
    },
  });
}

// 4. Increment Link Click (Mutation)
export function useIncrementLinkClick(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!uid) throw new Error("No user ID");
      const linkRef = doc(db, "users", uid, "links", id);
      await updateDoc(linkRef, {
        clickCount: increment(1),
      });
      return id;
    },
    onSuccess: (updatedId) => {
      if (uid) {
        queryClient.setQueryData<LinkType[]>(linksKeys.lists(uid), (oldData) => {
          if (!oldData) return [];
          return oldData.map((link) =>
            link.id === updatedId
              ? { ...link, clickCount: (link.clickCount || 0) + 1 }
              : link
          );
        });
      }
    },
  });
}

// 5. Delete Link (Mutation)
export function useDeleteLink(uid: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!uid) throw new Error("No user ID");
      const linkRef = doc(db, "users", uid, "links", id);
      await deleteDoc(linkRef);
      return id;
    },
    onSuccess: (deletedId) => {
      if (uid) {
        queryClient.setQueryData<LinkType[]>(linksKeys.lists(uid), (oldData) => {
          if (!oldData) return [];
          return oldData.filter((link) => link.id !== deletedId);
        });
      }
    },
  });
}
