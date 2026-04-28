"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { LinkIcon, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { user, profile, isLoading } = useUser();
  const [isCopied, setIsCopied] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCopyLink = () => {
    if (!profile) return;
    const url = `${window.location.origin}/${profile.username}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* Logo or Title */}
          <Link href="/" className="font-bold text-lg tracking-tight text-indigo-600 dark:text-indigo-400 mr-2 shrink-0">
            MyLink
          </Link>

          {/* Admin features */}
          {!isLoading && user && profile && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                🔗 내 링크 주소:
              </span>
              <button
                onClick={handleCopyLink}
                className="text-sm font-semibold truncate hover:text-indigo-600 hover:underline dark:hover:text-indigo-400 transition-colors"
              >
                mylink.com/{profile.username}
              </button>
              {isCopied && <span className="text-xs text-indigo-600 ml-1 font-semibold fade-in">복사됨!</span>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/${profile?.username}`, '_blank')}
                    className="hidden sm:flex border-zinc-200 dark:border-zinc-800 rounded-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    내 페이지 보기
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    <LogOut className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">로그아웃</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="default"
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  시작하기
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile address display */}
      {!isLoading && user && profile && (
        <div className="sm:hidden flex items-center justify-center h-8 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-xs px-4">
          <span className="text-zinc-500 mr-1">🔗</span>
          <button
            onClick={handleCopyLink}
            className="font-medium truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            mylink.com/{profile.username}
          </button>
          {isCopied && <span className="text-[10px] text-indigo-600 ml-2 font-bold animate-pulse">복사 완료</span>}
        </div>
      )}
    </header>
  );
}
