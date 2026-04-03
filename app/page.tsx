"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { dummyLinks, Link as LinkType } from "@/data/links";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "링크 제목을 입력해주세요." }),
  url: z.string().trim().min(1, { message: "URL 주소를 입력해주세요." })
    .transform((val) => {
      // http / https 프로토콜 추가 보정
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return `https://${val}`;
      }
      return val;
    })
    .refine((val) => {
      // 올바른 URL 형식인지 파싱 테스트
      try {
        new URL(val);
        return true;
      } catch (err) {
        return false;
      }
    }, { message: "올바른 URL 형식을 입력해주세요. (예: https://...)" }),
});

export default function Page() {
  const [links, setLinks] = useState<LinkType[]>(dummyLinks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // React Hook Form 초기화
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  // 서브밋 로직
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newLink: LinkType = {
      id: Date.now().toString(),
      title: values.title,
      url: values.url,
    };

    setLinks([...links, newLink]);
    reset();
    setIsDialogOpen(false);
  };

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

        {/* Add Link Button */}
        <div className="w-full mb-6">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            // 닫힐 때 폼 초기화 (취소 시 재진입 시 쓰레기값 방지)
            if (!open) {
              reset();
            }
          }}>
            <DialogTrigger render={
              <Button className="w-full rounded-2xl h-12 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                새로운 링크 추가하기
              </Button>
            } />
            <DialogContent className="sm:max-w-md rounded-2xl border-white/40 dark:border-zinc-800/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">링크 추가</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="title" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    링크 제목
                  </Label>
                  <Input 
                    id="title"
                    placeholder="예: 내 포트폴리오 빙글 빙글" 
                    className={`h-12 px-4 rounded-xl focus-visible:ring-indigo-500 dark:bg-zinc-800 ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`} 
                    autoFocus 
                    {...register("title")} 
                  />
                  {errors.title && <p className="text-sm font-medium text-red-500">{errors.title.message as string}</p>}
                </div>
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="url" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    URL 주소
                  </Label>
                  <Input 
                    id="url"
                    type="text"
                    placeholder="예: https://example.com" 
                    className={`h-12 px-4 rounded-xl focus-visible:ring-indigo-500 dark:bg-zinc-800 ${errors.url ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`} 
                    {...register("url")} 
                  />
                  {errors.url && <p className="text-sm font-medium text-red-500">{errors.url.message as string}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="mt-2 h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-md"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  리스트에 추가하기
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link, index) => {
            let domain = "";
            try {
              domain = new URL(link.url).hostname;
            } catch (e) {
              domain = "example.com";
            }
            // 구글 파비콘 API 사용
            const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl group"
                style={{
                  animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + 0.3}s both`,
                }}
              >
                <Card className="relative overflow-hidden w-full p-4 flex items-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl">
                  {/* Hover Graphic */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-700/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  {/* Favicon */}
                  <div className="relative z-10 w-12 flex justify-center">
                    <img
                      src={faviconUrl}
                      alt={`${link.title} icon`}
                      className="w-6 h-6 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
                      }}
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
