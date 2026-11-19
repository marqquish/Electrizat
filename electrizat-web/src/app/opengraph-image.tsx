import { ImageResponse } from "next/og";

export const alt = "ELECTRIZAT – Electricistas en Madrid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #1E3E62 0%, #0B192C 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, color: "#0B192C", fontWeight: 800 }}>
            Z
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>ELECTRIZAT</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Electricistas en Madrid
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#F59E0B" }}>Servicios eléctricos en Latina · 612 46 62 28</div>
      </div>
    ),
    size,
  );
}
