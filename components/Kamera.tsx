"use client";

import { useState } from "react";

export default function Kamera({
  fotoUrls,
  intro,
  onOpen,
}: {
  fotoUrls: string[];
  intro: string;
  onOpen: () => void;
}) {
  const [opened, setOpened] = useState(false);

  function handleClick() {
    if (!opened) {
      setOpened(true);
      onOpen();
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        right: "10%",
        bottom: "16%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
    >
      <div
        onClick={handleClick}
        style={{
          width: 54,
          height: 38,
          borderRadius: 6,
          background: "var(--bg-panel)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: opened ? "0 0 18px var(--lamp-soft)" : "none",
          transition: "box-shadow 0.6s ease",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid var(--lamp)",
            opacity: opened ? 1 : 0.5,
          }}
        />
      </div>

      {opened && (
        <div style={{ textAlign: "center" }}>
          {intro && (
            <p
              style={{
                fontFamily: "var(--font-voice)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginBottom: 10,
              }}
            >
              {intro}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              maxWidth: 260,
            }}
          >
            {fotoUrls.length === 0 && (
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Belum ada foto di kamar ini.
              </p>
            )}
            {fotoUrls.map((url, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  padding: 6,
                  paddingBottom: 14,
                  borderRadius: 3,
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (4 + i)}deg)`,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  style={{
                    width: 84,
                    height: 84,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
