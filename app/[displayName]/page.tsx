"use client";

import { useProfileByDisplayNameQuery } from "@/hooks/useProfileByDisplayNameQuery";
import { useGetLinks } from "@/hooks/useLinksQuery";
import { notFound, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link as LinkType } from "@/data/links";

const VisitorLinkCard = ({ link, index }: { link: LinkType; index: number }) => {
  let domain = "example.com";
  try {
    domain = new URL(link.url).hostname;
  } catch (e) {
    // fallback
  }
  
  const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl group"
      style={{
        animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
      }}
    >
      <Card className="relative overflow-hidden w-full p-4 flex items-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl pr-2">
        {/* Hover Graphic */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-700/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

        {/* Favicon */}
        <div className="relative z-10 w-12 flex justify-center shrink-0">
          <img
            src={faviconUrl}
            alt={`${link.title} icon`}
            className="w-6 h-6 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
            }}
          />
        </div>

        {/* Title */}
        <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden pr-2">
          <span className="text-center font-semibold text-[15px] tracking-wide text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate block">
            {link.title}
          </span>
        </div>
      </Card>
    </a>
  );
};

export default function VisitorPage() {
  const params = useParams<{ displayName: string }>();
  const displayName = params?.displayName;
  
  const { data: profile, isLoading: isProfileLoading } = useProfileByDisplayNameQuery(displayName);
  const { data: links = [], isLoading: isLinksLoading } = useGetLinks(profile?.uid);

  // If no param, handle safely
  if (!displayName) return null;

  if (isProfileLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Not found scenario
  if (!profile) {
    notFound();
  }

  return (
    <main className="flex min-h-svh flex-col items-center py-10 px-6 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden relative">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center mb-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <img
            src={profile.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
            alt={`${profile.displayName} Avatar`}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white dark:border-zinc-800 object-cover bg-indigo-100 dark:bg-zinc-800"
            referrerPolicy="no-referrer"
          />
          <h1 className="mt-5 text-2xl tracking-tight font-extrabold text-zinc-900 dark:text-zinc-50">
            {profile.username || "이름 없음"}
          </h1>
          <h2 className="mt-0.5 text-sm font-medium text-zinc-500">
            @{profile.displayName}
          </h2>
          {profile.bio && (
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-center text-sm font-medium px-4 leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-4">
          {isLinksLoading ? (
             <div className="flex justify-center p-8">
               <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
             </div>
          ) : links.length === 0 ? (
            <div className="text-center p-8 text-zinc-500 dark:text-zinc-400">아직 추가된 링크가 없습니다.</div>
          ) : (
            links.map((link, index) => (
              <VisitorLinkCard key={link.id} link={link} index={index} />
            ))
          )}
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
