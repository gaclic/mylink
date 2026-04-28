import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { Link2, Camera, MessageCircle, Code2, Briefcase, ArrowRight } from "lucide-react";

export function LandingPage() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-zinc-950 font-sans">
      
      {/* Background Gradients & Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-400/20 mix-blend-multiply blur-3xl filter dark:bg-violet-900/20 animate-blob" />
        <div className="absolute top-40 -left-20 h-[450px] w-[450px] rounded-full bg-cyan-400/20 mix-blend-multiply blur-3xl filter dark:bg-cyan-900/20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-fuchsia-400/20 mix-blend-multiply blur-3xl filter dark:bg-fuchsia-900/20 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 flex flex-col items-center px-4 md:flex-row md:items-center md:justify-around gap-12 max-w-6xl py-12 md:py-24">
        
        {/* Left Content / Hero Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2 md:pr-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-800 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300 mb-6 shadow-sm">
            <span>✨ 당신만의 완벽한 멀티 프로필</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            흩어진 링크를 <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              하나의 페이지
            </span>에.
          </h1>
          
          <p className="mb-10 text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
            SNS, 포트폴리오, 블로그 등 내 모든 흔적을 직관적이고 아름답게 정리하세요. 방문자들에게 강렬한 첫인상을 남길 수 있습니다.
          </p>

          <div className="flex flex-col w-full sm:flex-row gap-4 max-w-md md:max-w-none">
            <Button 
              onClick={handleLogin}
              className="group h-14 w-full rounded-2xl bg-zinc-900 px-8 text-base font-semibold text-white shadow-xl hover:bg-zinc-800 hover:-translate-y-0.5 transition-all dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 sm:w-auto"
            >
              <svg className="mr-3 h-5 w-5 bg-white rounded-full p-0.5 shadow-sm" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google로 1초 만에 시작하기
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleLogin}
              className="h-14 w-full rounded-2xl border-2 border-zinc-200 bg-white/50 px-8 text-base font-bold shadow-sm backdrop-blur-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 sm:w-auto"
            >
              내 링크 둘러보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Content / Interactive Glass Cards */}
        <div className="relative mt-8 md:mt-0 w-full max-w-sm md:w-1/2 animate-in fade-in zoom-in-95 duration-1000 delay-200 pl-4 sm:pl-0">
          <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center justify-center space-y-4 rounded-3xl border border-white/40 bg-white/40 p-6 shadow-2xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/40">
            
            <div className="mb-4 flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg ring-4 ring-white/50 dark:ring-zinc-800/50">
                <Link2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-bold dark:text-white">@Creator</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">포트폴리오 & 소셜 채널</p>
            </div>

            {/* Mock Link Buttons */}
            <div className="w-full group cursor-pointer">
              <div className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900/80 border border-transparent dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                    <Camera className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">Instagram</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
              </div>
            </div>

            <div className="w-full group cursor-pointer">
              <div className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900/80 border border-transparent dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">Twitter (X)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
              </div>
            </div>

            <div className="w-full group cursor-pointer">
              <div className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900/80 border border-transparent dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <Code2 className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">GitHub</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
              </div>
            </div>
            
            <div className="w-full group cursor-pointer opacity-70">
              <div className="flex w-full items-center justify-between rounded-2xl bg-white/60 p-4 border border-dashed border-slate-300 dark:border-zinc-700 dark:bg-zinc-900/30">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-400 dark:bg-indigo-900/20 dark:text-indigo-400">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-600 dark:text-zinc-400">LinkedIn 추가하기</span>
                </div>
              </div>
            </div>

            {/* Floating Decors */}
            <div className="absolute -left-10 top-10 h-20 w-20 animate-[bounce_4s_infinite] rounded-2xl bg-white/40 shadow-xl backdrop-blur-md dark:bg-zinc-800/40 border border-white/50 dark:border-zinc-700/50 hidden sm:flex items-center justify-center">
               <span className="text-3xl">✨</span>
            </div>
            <div className="absolute -right-8 bottom-20 h-16 w-16 animate-[bounce_5s_infinite_1s] rounded-full bg-white/40 shadow-xl backdrop-blur-md dark:bg-zinc-800/40 border border-white/50 dark:border-zinc-700/50 hidden sm:flex items-center justify-center">
               <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
