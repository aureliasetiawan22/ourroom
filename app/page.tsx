import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "2.2rem" }}>Our Room</h1>
      <p style={{ color: "var(--text-muted)", maxWidth: 420, lineHeight: 1.7 }}>
        Kamar kenangan digital. Isi satu kali, bagikan lewat satu tautan,
        orang yang kamu tuju akan menemukannya sendiri.
      </p>
      <Link
        href="/form"
        style={{
          border: "1px solid var(--lamp)",
          color: "var(--lamp)",
          padding: "0.75rem 1.5rem",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        Mulai buat kamar
      </Link>
    </main>
  );
}
