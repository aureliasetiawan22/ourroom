import { supabase } from "@/lib/supabase";
import Room from "./Room";

export default async function KamarPage({
  params,
}: {
  params: { kode: string };
}) {
  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", params.kode)
    .single();

  if (!room) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ color: "var(--text-muted)" }}>
          Kamar ini tidak ditemukan. Periksa lagi tautannya.
        </p>
      </main>
    );
  }

  return <Room room={room} />;
}
