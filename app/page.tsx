import { Card } from "@/components/ui/card";
import { dummyLinks } from "@/data/links";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden relative">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=MyLinkProfile"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white dark:border-zinc-800 object-cover bg-indigo-100 dark:bg-zinc-800"
          />
          <h1 className="mt-5 text-2xl tracking-tight font-extrabold text-zinc-900 dark:text-zinc-50">
            @MyLink_Creator
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-center text-sm font-medium px-4 leading-relaxed">
            프론트엔드 엔지니어 & 크리에이터. <br /> 저의 다양한 채널을 한곳에서 만나보세요! 👇
          </p>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-4">
          {dummyLinks.map((link, index) => {
            const domain = new URL(link.url).hostname;
            // 구글 파비콘 API 사용
            const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl"
                style={{
                  animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + 0.3}s both`,
                }}
              >
                <Card className="group relative overflow-hidden w-full p-4 flex items-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl">
                  {/* Hover Graphic */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-700/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  {/* Favicon */}
                  <div className="relative z-10 w-12 flex justify-center">
                    <img
                      src={faviconUrl}
                      alt={`${link.title} icon`}
                      className="w-6 h-6 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Title */}
                  <span className="relative z-10 flex-1 text-center font-semibold text-[15px] tracking-wide text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {link.title}
                  </span>

                  {/* Right padding balancer to keep text dead-center */}
                  <div className="w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-indigo-400 dark:text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}
