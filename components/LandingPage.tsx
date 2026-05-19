"use client";

import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { 
  Link2, Camera, MessageCircle, Code2, Briefcase, ArrowRight,
  Zap, Sparkles, LayoutTemplate, MousePointer2 
} from "lucide-react";
import { useState, useEffect } from "react";

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col min-h-[calc(100svh-3.5rem)] bg-zinc-50/50 dark:bg-zinc-950 font-sans overflow-x-hidden selection:bg-indigo-100">
      
      {/* 1. Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100svh-3.5rem)] px-4 py-20 pb-32">
        {/* Subtle Background Pattern to make glass stand out */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] opacity-60 z-0" />
        
        <div className="container relative z-10 flex flex-col items-center md:flex-row md:items-center md:justify-around gap-12 max-w-6xl">
          
          {/* Left Content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2 md:pr-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-zinc-800 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-300 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>당신만의 완벽한 멀티 프로필</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1] text-zinc-900 dark:text-white">
              어디서든 돋보이는 <br className="hidden md:block" />
              <span className="text-indigo-600 dark:text-indigo-400">
                나만의 페이지.
              </span>
            </h1>
            
            <p className="mb-10 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-lg">
              SNS, 포트폴리오 등 흩어진 링크를 하나로. <br className="hidden md:block" />
              복잡한 설정 없이 단 1분 만에 깔끔한 페이지를 완성하세요.
            </p>

            <div className="flex flex-col w-full sm:flex-row gap-4 max-w-md md:max-w-none">
              <Button 
                onClick={handleLogin}
                className="group h-14 w-full rounded-xl bg-zinc-900 px-8 text-base font-bold text-white hover:bg-zinc-800 transition-all duration-300 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 sm:w-auto overflow-hidden relative shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center">
                  <svg className="mr-3 h-5 w-5 bg-white rounded-full p-0.5 shadow-sm" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google로 시작하기
                </span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
                className="group h-14 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md px-8 text-base font-bold transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 dark:hover:border-zinc-700 sm:w-auto shadow-sm"
              >
                더 알아보기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Content / Glass Cards */}
          <div className="relative mt-12 md:mt-0 w-full max-w-sm md:w-1/2 animate-in fade-in zoom-in-95 duration-1000 delay-200 pl-4 sm:pl-0 perspective-[1000px]">
            <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center justify-center space-y-4 rounded-3xl border border-white/60 bg-white/50 backdrop-blur-xl p-6 shadow-2xl dark:border-zinc-800/50 dark:bg-zinc-900/50 hover:-translate-y-2 hover:rotate-y-[-2deg] transition-transform duration-500 ease-out group">
              
              <div className="mb-4 flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 ring-4 ring-white/50 dark:ring-zinc-800/50">
                  <Link2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white tracking-tight">@Creator</h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">포트폴리오 & 소셜 채널</p>
              </div>

              {/* Mock Link Buttons (Glass inner) */}
              <div className="w-full cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                <div className="flex w-full items-center justify-between rounded-xl bg-white/70 backdrop-blur-md p-4 shadow-sm border border-white/60 dark:bg-zinc-800/70 dark:border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-900 dark:bg-zinc-900/80 dark:text-zinc-100">
                      <Camera className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Instagram</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>

              <div className="w-full cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                <div className="flex w-full items-center justify-between rounded-xl bg-white/70 backdrop-blur-md p-4 shadow-sm border border-white/60 dark:bg-zinc-800/70 dark:border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-900 dark:bg-zinc-900/80 dark:text-zinc-100">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Twitter (X)</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>

              <div className="w-full cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                <div className="flex w-full items-center justify-between rounded-xl bg-white/70 backdrop-blur-md p-4 shadow-sm border border-white/60 dark:bg-zinc-800/70 dark:border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100/80 text-zinc-900 dark:bg-zinc-900/80 dark:text-zinc-100">
                      <Code2 className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">GitHub</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </div>
              
              <div className="w-full cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                <div className="flex w-full items-center justify-between rounded-xl bg-white/40 backdrop-blur-md p-4 border border-dashed border-zinc-300 hover:border-indigo-400 hover:bg-white/60 dark:border-zinc-700 dark:hover:border-indigo-500 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100/50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-zinc-500 dark:text-zinc-400">새로운 링크 추가하기</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-transparent transition-colors" />
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse opacity-60">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-zinc-400 flex justify-center pt-1 backdrop-blur-sm">
            <div className="w-1.5 h-2 bg-zinc-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Features Section (Glass) */}
      <section className="relative z-10 w-full py-24 sm:py-32 flex justify-center px-4 bg-zinc-100/30 dark:bg-zinc-900/30 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white">
              더 쉽고, 깔끔하게.
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400">
              마이링크가 제공하는 투명하고 강력한 기능들을 만나보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group flex flex-col rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-md border border-white/80 dark:border-zinc-800/60 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50/80 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <MousePointer2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">번거로움 제로 편집</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                별도의 편집 창 없이 보여지는 페이지 위에서 텍스트를 바로 클릭해 빠르고 직관적으로 내용을 수정할 수 있습니다.
              </p>
            </div>

            <div className="group flex flex-col rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-md border border-white/80 dark:border-zinc-800/60 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50/80 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">자동 파비콘 추출</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                URL 주소만 붙여넣으세요. 링크된 웹사이트의 공식 파비콘을 실시간으로 감지해 자동으로 예쁘게 배치해 줍니다.
              </p>
            </div>

            <div className="group flex flex-col rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-md border border-white/80 dark:border-zinc-800/60 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50/80 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <LayoutTemplate className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">깔끔한 디자인</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                복잡한 요소 없이 본질에 집중하는 단정하고 투명한 모던 UI를 제공합니다. 다크모드도 완벽히 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA & Footer (Glass) */}
      <footer className="relative z-10 w-full mt-auto flex flex-col items-center bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-t border-white/50 dark:border-zinc-800/30">
        {/* Deep CTA */}
        <div className="w-full pt-32 pb-24 px-4 flex justify-center">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
              가장 완벽한 나만의 프로필. <br className="md:hidden" />지금 바로 시작하세요.
            </h2>
            <p className="mb-10 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
              별도의 회원가입 없이 구글 계정으로 1초 만에 생성할 수 있습니다. <br className="hidden md:block" />
              투명하고 감각적인 마이링크를 가장 먼저 경험해 보세요.
            </p>
            <Button 
                onClick={handleLogin}
                className="group h-16 rounded-xl bg-zinc-900 px-10 text-lg font-bold text-white shadow-xl hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                무료로 프로필 만들기
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="w-full text-zinc-500 py-10 px-4 flex justify-center border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
          <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">MyLink</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              <span className="text-sm font-medium">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">서비스 소개</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
