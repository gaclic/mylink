import { Card } from "@/components/ui/card";
import { dummyLinks } from "@/data/links";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center mb-6">마이링크</h1>
        {dummyLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full transition-transform active:scale-95 hover:scale-[1.02]"
          >
            <Card className="w-full p-4 flex items-center justify-center bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm border-zinc-200 dark:border-zinc-800">
              <span className="font-medium text-lg text-zinc-900 dark:text-zinc-100">{link.title}</span>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}
