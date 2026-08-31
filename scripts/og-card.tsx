/**
 * Source for `public/og.png` (the social share card).
 *
 * `next/og` only runs inside a Next build, and with `output: "export"` the
 * route emits an extension-less file that static hosts serve with the wrong
 * Content-Type, so the PNG is committed instead of generated on every build.
 *
 * To regenerate after editing this file:
 *   1. cp scripts/og-card.tsx src/app/opengraph-image.tsx
 *   2. yarn build
 *   3. cp out/opengraph-image public/og.png && rm src/app/opengraph-image.tsx
 */
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Nabin Thapa — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        background: "linear-gradient(135deg, #050816 0%, #151030 100%)",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 30,
          color: "#aaa6c3",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#915eff",
          }}
        />
        nabin-thapa.com.np
      </div>
      <div style={{ fontSize: 96, fontWeight: 700, marginTop: 28 }}>
        Nabin Thapa
      </div>
      <div style={{ fontSize: 46, color: "#915eff", marginTop: 4 }}>
        Software Engineer
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#aaa6c3",
          marginTop: 28,
          maxWidth: 900,
        }}
      >
        Building user-friendly tools and intuitive web experiences from
        Kathmandu, Nepal.
      </div>
    </div>,
    size,
  );
}
