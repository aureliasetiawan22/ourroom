"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FormPage() {
  const [judul, setJudul] = useState("");
  const [pesan, setPesan] = useState("");
  const [fotoFiles, setFotoFiles] = useState<FileList | null>(null);
  const [laguFile, setLaguFile] = useState<File | null>(null);
  const [pesanTeddy, setPesanTeddy] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultLink, setResultLink] = useState("");

  async function uploadFile(file: File, folder: string) {
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!judul.trim()) {
      setError("Judul kamar belum diisi.");
      return;
    }
    if (!fotoFiles || fotoFiles.length === 0) {
      setError("Pilih minimal 1 foto.");
      return;
    }

    setLoading(true);
    try {
      const sessionId = crypto.randomUUID();

      const fotoUrls: string[] = [];
      for (const file of Array.from(fotoFiles)) {
        const url = await uploadFile(file, `foto/${sessionId}`);
        fotoUrls.push(url);
      }

      let laguUrl: string | null = null;
      if (laguFile) {
        laguUrl = await uploadFile(laguFile, `lagu/${sessionId}`);
      }

      const teddyFiltered = pesanTeddy.map((t) => t.trim()).filter(Boolean);

      const { data, error: insertError } = await supabase
        .from("rooms")
        .insert({
          judul,
          pesan,
          lagu_url: laguUrl,
          foto_urls: fotoUrls,
          pesan_teddy: teddyFiltered,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      const origin = window.location.origin;
      setResultLink(`${origin}/${data.id}`);
    } catch (err: any) {
      setError(err.message ?? "Ada yang salah, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  if (resultLink) {
    return (
      <main style={wrapStyle}>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>
            Kamar kamu sudah jadi
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Bagikan tautan ini ke orang yang kamu tuju.
          </p>
          <div
            style={{
              background: "var(--bg-panel)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "0.9rem 1rem",
              wordBreak: "break-all",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            {resultLink}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(resultLink)}
            style={btnStyle}
          >
            Salin tautan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={wrapStyle}>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: 480, display: "grid", gap: "1.1rem" }}
      >
        <h1 style={{ fontSize: "1.6rem" }}>Isi kamar kamu</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: -8 }}>
          Semua isian ini yang akan muncul saat kamar dibuka.
        </p>

        <label style={labelStyle}>
          Nama kamar
          <input
            style={inputStyle}
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Kamar buat Sayang"
          />
        </label>

        <label style={labelStyle}>
          Pesan penutup
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Pesan yang muncul setelah semua objek dibuka"
          />
        </label>

        <label style={labelStyle}>
          Foto (bisa pilih beberapa)
          <input
            type="file"
            accept="image/*"
            multiple
            style={inputStyle}
            onChange={(e) => setFotoFiles(e.target.files)}
          />
        </label>

        <label style={labelStyle}>
          Lagu (opsional)
          <input
            type="file"
            accept="audio/*"
            style={inputStyle}
            onChange={(e) => setLaguFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8 }}>
            Pesan-pesan singkat di teddy bear
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {pesanTeddy.map((val, i) => (
              <input
                key={i}
                style={inputStyle}
                value={val}
                placeholder={`Pesan singkat ${i + 1}`}
                onChange={(e) => {
                  const next = [...pesanTeddy];
                  next[i] = e.target.value;
                  setPesanTeddy(next);
                }}
              />
            ))}
          </div>
        </div>

        {error && (
          <p style={{ color: "#E8A0A0", fontSize: "0.85rem" }}>{error}</p>
        )}

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Menyimpan..." : "Buat kamar"}
        </button>
      </form>
    </main>
  );
}

const wrapStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.25rem",
};

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 6,
  fontSize: "0.85rem",
  color: "var(--text-muted)",
};

const inputStyle: React.CSSProperties = {
  background: "var(--bg-panel)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  padding: "0.65rem 0.75rem",
  color: "var(--text-primary)",
  fontSize: "0.95rem",
};

const btnStyle: React.CSSProperties = {
  background: "var(--lamp)",
  color: "#2A2113",
  border: "none",
  borderRadius: 8,
  padding: "0.8rem 1rem",
  fontSize: "0.95rem",
  fontWeight: 600,
};
