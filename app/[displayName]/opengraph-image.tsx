import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 모든 비동기(Promise), 폰트 Fetch 등의 동작을 제거한 가장 순수한 형태
export default function Image({ params }: { params: { displayName: string } }) {
  // params를 await 하지 않고 바로 꺼내 쓰도록 롤백
  const name = params.displayName;

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
          backgroundColor: "#eef2ff",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#312e81",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#4f46e5",
            marginTop: 20,
          }}
        >
          MyLink
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
