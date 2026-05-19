import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글(CJK) 텍스트가 OG 이미지 에지 환경에서 렌더링되지 않거나 깨지는 것을 방지하기 위해 폰트 주입
async function loadGoogleFont() {
  const url = "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap";
  // WOFF2를 피하고 TTF 포맷을 받기 위한 오래된 User-Agent 스푸핑
  const cssRes = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  });
  const css = await cssRes.text();
  const fontUrl = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (fontUrl) {
    const fontRes = await fetch(fontUrl[1]);
    return await fontRes.arrayBuffer();
  }
  return null;
}

// 명시적으로 타입을 분리 (Next.js 14, 15+ 모두 안전 호환되는 구조)
type Props = {
  params: Promise<{
    displayName: string;
  }>;
};

export default async function Image(props: Props) {
  const params = await props.params;
  const displayName = params.displayName || "공유";
  
  const fontData = await loadGoogleFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #f0f9ff 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#312e81",
            fontFamily: fontData ? '"NotoSansKR"' : "sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          {displayName}님의 MyLink
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "NotoSansKR",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
