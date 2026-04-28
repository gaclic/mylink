"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { LinkIcon, LogOut, ExternalLink, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function Header() {
  const { user, profile, isLoading } = useUser();
  const { theme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
    toast.success("링크 복사 완료!");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* Logo or Title */}
          <Link href="/" className="font-bold text-lg tracking-tight text-indigo-600 dark:text-indigo-400 mr-2 shrink-0">
            MyLink
          </Link>

          {/* Admin features -> Moved to Dropdown */}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {!isLoading && (
            <>
              {user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm p-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                    <img
                      src={profile.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                      alt="Profile"
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal border-b border-zinc-100 dark:border-zinc-800 pb-3 pt-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-50">{profile.displayName || `@${profile.username}`}</p>
                          <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400 mt-1">
                            {profile.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    
                    <div className="py-1">
                      <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg focus:bg-zinc-100 dark:focus:bg-zinc-800" onClick={handleCopyLink}>
                        <LinkIcon className="mr-2.5 h-4 w-4 text-zinc-500" />
                        <span className="font-medium">내 링크 주소 복사</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg focus:bg-zinc-100 dark:focus:bg-zinc-800" onClick={() => window.open(`/${profile?.username}`, '_blank')}>
                        <ExternalLink className="mr-2.5 h-4 w-4 text-zinc-500" />
                        <span className="font-medium">내 페이지 보기</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer py-2.5 px-3 rounded-lg focus:bg-zinc-100 dark:focus:bg-zinc-800"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {mounted && theme === 'dark' ? (
                          <Sun className="mr-2.5 h-4 w-4 text-zinc-500" />
                        ) : (
                          <Moon className="mr-2.5 h-4 w-4 text-zinc-500" />
                        )}
                        <span className="font-medium">{mounted && theme === 'dark' ? '라이트 모드' : '다크 모드'}</span>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 my-0" />
                    
                    <div className="py-1">
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/30 py-2.5 px-3 rounded-lg" 
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2.5 h-4 w-4" />
                        <span className="font-medium">로그아웃</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
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

    </header>
  );
}
