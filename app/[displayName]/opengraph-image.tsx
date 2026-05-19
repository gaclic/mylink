import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: {
    displayName: string;
  };
};

export default async function Image({ params }: Props) {
  // Promise wrap to support Next.js 14-16 params pattern
  const resolvedParams = await Promise.resolve(params);
  const displayName = resolvedParams.displayName;
  
  let user = {
    username: displayName,
    displayName: displayName,
    bio: "MyLink에서 링크를 확인해보세요",
  };

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
          // Next.js ISR (캐시 활용 가능)
          next: { revalidate: 60 }
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        // firebase struct format parsing
        if (data && data.length > 0 && data[0].document) {
          const fields = data[0].document.fields;
          user.username = fields.username?.stringValue || displayName;
          user.bio = fields.bio?.stringValue || "MyLink에서 링크를 확인해보세요";
          
          if (user.bio && user.bio.length > 80) {
              user.bio = user.bio.slice(0, 80) + "...";
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching user profile for OG image:", error);
  }

  // avatar image (using dicebear as safe fallback)
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${user.username}`;

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
          bottom: 0,
          right: 200,
          width: 600,
          height: 600,
          backgroundColor: "rgba(216, 180, 254, 0.2)",
          borderRadius: "300px",
        }} />
        
        {/* 중앙 카드 형태 - 정적 이미지 톤 매너 유지 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "40px",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 80px rgba(0, 0, 0, 0.08)",
            zIndex: 10,
            maxWidth: 900,
            width: "80%"
          }}
        >
          <img
            src={avatarUrl}
            width={180}
            height={180}
            style={{
              borderRadius: "90px",
              border: "6px solid #fff",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#312e81", // indigo 900 (정적 이미지와 통일)
              marginTop: 36,
              letterSpacing: "-0.05em",
            }}
          >
            {user.username}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#4f46e5", // indigo 600
              marginTop: 16,
            }}
          >
            @{user.displayName}
          </div>
          {user.bio && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "#6b7280", // gray 500
                marginTop: 24,
                textAlign: "center",
                whiteSpace: "pre-wrap",
                lineHeight: 1.4,
              }}
            >
              {user.bio}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
