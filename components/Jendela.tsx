"use client";

export default function Jendela() {
  const drops = Array.from({ length: 28 });

  return (
    <div
      style={{
        position: "absolute",
        top: "6%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 180,
        height: 130,
        borderRadius: "6px 6px 0 0",
        border: "3px solid rgba(237,238,243,0.15)",
        background:
          "linear-gradient(180deg, rgba(124,147,184,0.25), rgba(38,46,63,0.6))",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 3,
          background: "rgba(237,238,243,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(237,238,243,0.15)",
        }}
      />
      {drops.map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: -20,
            left: `${Math.random() * 100}%`,
            width: 2,
            height: 14 + Math.random() * 10,
            background: "rgba(124,147,184,0.55)",
            borderRadius: 2,
            animation: `rain-fall ${1.4 + Math.random() * 1.2}s linear ${
              Math.random() * 2
            }s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(150px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
