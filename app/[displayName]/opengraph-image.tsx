import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{
    displayName: string;
  }>;
};

export default async function Image({ params }: Props) {
  const { displayName } = await params;
  
  let username = displayName;
  let bio = "모든 링크를 하나의 페이지로";

  // Firestore DB 직접 조회 시도 (실패 시 기본 문구 렌더링)
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            structuredQuery: {
              from: [{ collectionId: "users" }],
              where: {
                fieldFilter: {
                  field: { fieldPath: "displayName" },
                  op: "EQUAL",
                  value: { stringValue: displayName }
                }
              },
              limit: 1
            }
          }),
          next: { revalidate: 60 }
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0 && data[0].document) {
          const fields = data[0].document.fields;
          username = fields.username?.stringValue || displayName;
          const userBio = fields.bio?.stringValue;
          if (userBio) {
            bio = userBio.length > 80 ? userBio.slice(0, 80) + "..." : userBio;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching user profile for OG image:", error);
  }

  // 텍스트 기호로 아바타 아이콘 대체 (외부 렌더링 에러 방지)
  const initial = username.charAt(0).toUpperCase();

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
        {/* Blob 배경 데코레이션 (정적 이미지와 통일) */}
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
          bottom: 0,
          right: 200,
          width: 600,
          height: 600,
          backgroundColor: "rgba(216, 180, 254, 0.2)",
          borderRadius: "300px",
        }} />
        
        {/* 중앙 컨텐츠 카드 */}
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
            maxWidth: 1000,
            width: "85%"
          }}
        >
          {/* Avatar Area (CSS-based to avoid external image loading issues in Edge) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              backgroundColor: "#e0e7ff", // indigo-100
              border: "8px solid #fff",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
              fontSize: "72px",
              fontWeight: 800,
              color: "#4f46e5", // indigo-600
              marginBottom: "24px"
            }}
          >
            {initial}
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#312e81", // indigo 900 
              marginBottom: 12,
              letterSpacing: "-0.05em",
              textAlign: "center"
            }}
          >
            {username}
          </div>
          
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#4f46e5", // indigo 600
              letterSpacing: "-0.02em",
              marginBottom: 24
            }}
          >
            @{displayName}
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#6b7280", // gray 500
              textAlign: "center",
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              maxWidth: "800px"
            }}
          >
            {bio}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
