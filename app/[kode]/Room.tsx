"use client";

import { useEffect, useState } from "react";
import type { Room as RoomType } from "@/lib/supabase";
import Jendela from "@/components/Jendela";
import Radio from "@/components/Radio";
import Kamera from "@/components/Kamera";
import TeddyBear from "@/components/TeddyBear";

const OBJECT_COUNT = 3; // radio, kamera, teddy (jendela = atmosfer, bukan interaksi wajib)

export default function Room({ room }: { room: RoomType }) {
  const [stage, setStage] = useState<"entering" | "room">("entering");
  const [openedCount, setOpenedCount] = useState(0);
  const [showClosing, setShowClosing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStage("room"), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (openedCount >= OBJECT_COUNT) {
      const t = setTimeout(() => setShowClosing(true), 900);
      return () => clearTimeout(t);
    }
  }, [openedCount]);

  if (stage === "entering") {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12151d",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-voice)",
            fontStyle: "italic",
            color: "var(--text-muted)",
            fontSize: "0.95rem",
            opacity: 0,
            animation: "fade-in 1.5s ease forwards",
          }}
        >
          Memasuki kamar...
          <style>{`@keyframes fade-in { to { opacity: 1; } }`}</style>
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 0%, var(--bg-room), var(--bg-deep))",
        opacity: 0,
        animation: "room-fade-in 1.8s ease forwards",
      }}
    >
      <style>{`@keyframes room-fade-in { to { opacity: 1; } }`}</style>

      <div
        style={{
          textAlign: "center",
          paddingTop: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.4rem" }}>{room.judul}</h1>
      </div>

      <div
        style={{
          position: "relative",
          minHeight: "70vh",
        }}
      >
        <Jendela />
        <Radio
          laguUrl={room.lagu_url}
          intro="lagu ini selalu diputar waktu itu..."
          onOpen={() => setOpenedCount((c) => c + 1)}
        />
        <Kamera
          fotoUrls={room.foto_urls}
          intro="beberapa potret yang tersimpan..."
          onOpen={() => setOpenedCount((c) => c + 1)}
        />
        <TeddyBear
          pesanTeddy={room.pesan_teddy}
          intro="ada yang ingin disampaikan..."
          onOpen={() => setOpenedCount((c) => c + 1)}
        />
      </div>

      {showClosing && room.pesan && (
        <div
          style={{
            maxWidth: 420,
            margin: "0 auto",
            padding: "2rem 1.5rem 3rem",
            textAlign: "center",
            opacity: 0,
            animation: "fade-in 2s ease forwards",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-voice)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            {room.pesan}
          </p>
        </div>
      )}
    </main>
  );
}
