import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Bernardo Maia",
  description: "Portfolio pessoal de Bernardo Maia",
  openGraph: {
    url: "https://bernardomaia.dev/",
    type: "website",
    title: "Bernardo Maia",
    description: "Portfolio pessoal de Bernardo Maia",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bernardo Maia",
    description: "Portfolio pessoal de Bernardo Maia",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
      </head>
      <body>
        <div className="crt">
          <Cursor />
          {children}
        </div>
      </body>
    </html>
  );
}
