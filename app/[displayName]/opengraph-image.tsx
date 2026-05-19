import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { displayName: string } }) {
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
            fontSize: 100,
            fontWeight: 800,
            color: "#312e81",
            letterSpacing: "-0.05em",
            marginBottom: 20,
          }}
        >
          {displayName}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#4f46e5",
          }}
        >
          MyLink 프로필
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
