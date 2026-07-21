import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TÜRKIZ BUDAPEST Demo",
  description: "Készítette a SONAWEB.",
  icons: {
    icon: "/turkiz-favicon.png", // <--- EZT A SORT ADD HOZZÁ
    //apple: "/turkiz-favicon.png", // (Opcionális: Apple ikonnak is beteheted ugyanazt)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}