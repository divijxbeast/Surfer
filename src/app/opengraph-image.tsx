import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SURFER — Pants Made For You";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F5F4F0",
          padding: "60px 80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #D8D7D2",
            paddingBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontFamily: "sans-serif",
              letterSpacing: "0.25em",
              color: "#8A8A86",
              textTransform: "uppercase",
            }}
          >
            Bespoke Tailoring Atelier
          </span>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#8A8A86",
              letterSpacing: "0.15em",
            }}
          >
            COLLECTION 2026
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "88px",
              letterSpacing: "0.15em",
              color: "#0A0A0A",
              fontWeight: "normal",
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: "20px",
            }}
          >
            SURFER
          </span>
          <span
            style={{
              fontSize: "32px",
              letterSpacing: "-0.01em",
              color: "#1C1C1C",
              fontStyle: "italic",
            }}
          >
            Pants Made For You.
          </span>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #D8D7D2",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontFamily: "sans-serif",
              letterSpacing: "0.2em",
              color: "#8A8A86",
              textTransform: "uppercase",
            }}
          >
            Tailored To Your Measurements · Designed Around Your Fit
          </span>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#0A0A0A",
            }}
          >
            surfer-tailoring.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
