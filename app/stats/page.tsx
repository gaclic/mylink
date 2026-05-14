"use client";

import { useEffect, useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useGetLinks } from "@/hooks/useLinksQuery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { LinkIcon, TrendingUp } from "lucide-react";

export default function StatsPage() {
  const { user, isLoading: isAuthLoading } = useUser();
  const router = useRouter();

  // 비로그인 시 홈으로 리다이렉트
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/");
    }
  }, [user, isAuthLoading, router]);

  const { data: links, isLoading: isLinksLoading } = useGetLinks(user?.uid);

  const chartData = useMemo(() => {
    if (!links) return [];
    return [...links]
      .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0)) // 클릭수 많은 순
      .map((link) => ({
        title: link.title || "제목 없음",
        clicks: link.clickCount || 0,
      }));
  }, [links]);

  const totalClicks = useMemo(() => {
    if (!links) return 0;
    return links.reduce((sum, link) => sum + (link.clickCount || 0), 0);
  }, [links]);

  const totalLinks = links?.length || 0;

  const chartConfig = {
    clicks: {
      label: "클릭 수",
      color: "var(--color-clicks)",
    },
  } satisfies ChartConfig;

  // 인증 로딩 중이거나 사용자가 없으면 빈 화면 반환
  if (isAuthLoading || !user) return <div className="min-h-screen"></div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl space-y-6 pt-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        통계 대시보드
      </h1>
      
      {/* 요약 카드 목록 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">총 클릭 수</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{totalClicks}</div>
            <p className="text-xs text-zinc-500 mt-1">모든 링크의 총 누적 클릭 수</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">등록된 링크 수</CardTitle>
            <LinkIcon className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{totalLinks}</div>
            <p className="text-xs text-zinc-500 mt-1">관리 중인 활성 링크</p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 */}
      <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
          <CardTitle>링크별 클릭수 비교</CardTitle>
          <CardDescription>가장 인기있는 링크를 확인해보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLinksLoading ? (
            <div className="h-[300px] flex items-center justify-center text-sm text-zinc-500">요청한 데이터를 계산하는 중입니다...</div>
          ) : chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" verticalFill={[]} horizontalPoints={[]} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
                <XAxis
                  dataKey="title"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickFormatter={(value) => value.length > 8 ? value.slice(0, 8) + '...' : value}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#71717a", fontSize: 12 }}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                  content={<ChartTooltipContent hideLabel indicator="line" />}
                />
                <Bar 
                  dataKey="clicks" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                  label={{ position: 'top', fill: '#6366f1', fontSize: 12, fontWeight: 600 }}
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-zinc-500 text-sm">
              클릭 통계가 없습니다. 링크를 탭 해보세요!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
