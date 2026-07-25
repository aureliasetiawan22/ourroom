import "./globals.css";

export const metadata = {
  title: "Our Room",
  description: "Kamar kenangan digital — buka, temukan, kenang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
