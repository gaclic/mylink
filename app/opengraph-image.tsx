import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{
          position: "absolute",
          top: 0,
          left: 200,
          width: 600,
          height: 600,
          backgroundColor: "rgba(165, 180, 252, 0.2)",
          borderRadius: "300px",
        }} />
        <div style={{
          position: "absolute",
          top: 100,
          right: 200,
          width: 600,
          height: 600,
          backgroundColor: "rgba(216, 180, 254, 0.2)",
          borderRadius: "300px",
        }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 120px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "40px",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 80px rgba(0, 0, 0, 0.08)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#312e81", // indigo 900
              marginBottom: 24,
              letterSpacing: "-0.05em",
            }}
          >
            MyLink
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#4f46e5", // indigo 600
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            모든 링크를 하나의 페이지로
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#6b7280", // gray 500
              marginTop: 24,
              textAlign: "center",
            }}
          >
            가장 직관적이고 아름다운 링크 관리 플랫폼
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
