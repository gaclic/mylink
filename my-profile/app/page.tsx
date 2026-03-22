import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#0f172a] dark:to-[#020617] text-[#171717] dark:text-[#ededed] font-sans selection:bg-purple-300 selection:text-purple-900">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 dark:bg-purple-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-400/30 dark:bg-pink-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full relative z-10 glass rounded-[2.5rem] p-8 sm:p-12 shadow-2xl animate-fade-up transform transition-all duration-500 hover:scale-[1.02]">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 to-pink-500 shadow-xl animate-float">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800">
              <Image 
                src="/profile.png" 
                alt="조유나 프로필 사진" 
                width={160} 
                height={160} 
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Profile Header */}
        <section className="text-center space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              조유나
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest pt-1">
              Yuna Jo
            </p>
          </div>
          
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto my-5"></div>
          
          <div className="space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium pt-2">
            <p className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
              <span>상명대학교</span>
            </p>
            <p className="bg-purple-100/80 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 py-1.5 px-5 rounded-full inline-block text-sm font-bold shadow-sm backdrop-blur-md">
              문화예술경영전공 22학번
            </p>
          </div>
        </section>

        {/* Social / Contact Links */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="#" aria-label="Github link" className="p-3.5 rounded-full bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="#" aria-label="Instagram link" className="p-3.5 rounded-full bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>

        {/* Footer */}
        <footer className="pt-8 mt-8 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
          <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase mb-1">Arts & Culture Management</p>
          <p className="text-[10px] text-gray-400/80">© 2026 Yuna Jo. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
