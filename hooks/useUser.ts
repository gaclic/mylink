import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  username: string;
  bio: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch or create user profile in Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let userProfileData: UserProfile;

        if (userSnap.exists()) {
          userProfileData = userSnap.data() as UserProfile;
        } else {
          // Create new user profile document
          // Using email handle as default username
          let defaultUsername = currentUser.uid;
          if (currentUser.email) {
            defaultUsername = currentUser.email.split("@")[0] + "_" + Math.floor(Math.random() * 1000);
          }

          userProfileData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            username: defaultUsername,
            bio: "환영합니다! 이곳에 소개글을 작성할 수 있어요. ✎",
          };

          await setDoc(userRef, {
            ...userProfileData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
        setProfile(userProfileData);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, isLoading, setProfile };
}
