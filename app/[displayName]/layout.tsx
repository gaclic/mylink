import { Metadata } from "next";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

interface Props {
  params: Promise<{ displayName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const displayName = resolvedParams.displayName;

  const defaultTitle = `@${displayName}`;
  const defaultDescription = "내 모든 링크를 한 곳에서 관리하고 공유하세요.";

  try {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      const userUsername = userData.username || "이름 없음";
      const title = `${userUsername} (@${userData.displayName})`;
      const description = userData.bio || defaultDescription;
      
      const overrideMetadata: Metadata = {
        title,
        description,
        openGraph: {
          title: `${title} | MyLink`,
          description,
        },
      };

      if (userData.photoURL) {
        overrideMetadata.openGraph!.images = [userData.photoURL];
      }
      return overrideMetadata;
    }
  } catch (error) {
    console.error("Failed to fetch metadata for profile:", error);
  }

  return {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      title: `${defaultTitle} | MyLink`,
      description: defaultDescription,
    },
  };
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
