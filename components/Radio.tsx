"use client";

import { useState } from "react";

export default function Radio({
  laguUrl,
  intro,
  onOpen,
}: {
  laguUrl: string | null;
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
        left: "12%",
        bottom: "14%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          width: 70,
          height: 50,
          borderRadius: 8,
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
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "2px solid var(--lamp)",
            opacity: opened ? 1 : 0.5,
          }}
        />
      </div>
      {opened && (
        <div style={{ maxWidth: 190, textAlign: "center" }}>
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
          {laguUrl ? (
            <audio controls src={laguUrl} style={{ width: 190 }} />
          ) : (
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Belum ada lagu di kamar ini.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
