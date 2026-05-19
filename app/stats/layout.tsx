import { Metadata } from "next";

export const metadata: Metadata = {
  title: "통계 대시보드",
  description: "등록된 링크의 클릭수 통계를 확인하세요.",
  openGraph: {
    title: "통계 대시보드 | MyLink",
    description: "등록된 링크의 클릭수 통계를 확인하세요.",
  },
};

export default function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
