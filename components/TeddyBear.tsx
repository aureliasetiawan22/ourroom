"use client";

import { useState } from "react";

export default function TeddyBear({
  pesanTeddy,
  intro,
  onOpen,
}: {
  pesanTeddy: string[];
  intro: string;
  onOpen: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(0);

  function handleClick() {
    if (!opened) {
      setOpened(true);
      onOpen();
      return;
    }
    if (pesanTeddy.length > 0) {
      setIndex((i) => (i + 1) % pesanTeddy.length);
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        left: "50%",
        bottom: "6%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
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
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid var(--lamp)",
            opacity: opened ? 1 : 0.5,
          }}
        />
      </div>

      {opened && (
        <div style={{ maxWidth: 220, textAlign: "center" }}>
          {intro && (
            <p
              style={{
                fontFamily: "var(--font-voice)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              {intro}
            </p>
          )}
          <p style={{ fontSize: "0.95rem" }}>
            {pesanTeddy[index] ?? "Belum ada pesan di teddy ini."}
          </p>
          {pesanTeddy.length > 1 && (
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 6 }}>
              Ketuk lagi untuk pesan berikutnya
            </p>
          )}
        </div>
      )}
    </div>
  );
}
