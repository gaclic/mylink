import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{
    displayName: string;
  }>;
};

export default async function Image(props: Props) {
  // Next.js 최신 런타임에 맞춰 params를 비동기로 해결해야 값이 정상적으로 들어옵니다.
  const params = await props.params;
  const displayName = params.displayName;

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
            fontWeight: 800,
            color: "#312e81",
            letterSpacing: "-0.05em",
          }}
        >
          {displayName}님의 MyLink
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
