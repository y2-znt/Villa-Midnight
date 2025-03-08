import { Providers } from "@/app/providers";
import ScrollToTop from "@/components/shared/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Villa Midnight",
  description:
    "Découvrez des énigmes palpitantes et des escape games immersifs à Nantes. Une expérience unique mêlant mystère, aventure et travail d'équipe.",
  icons: {
    icon: "/assets/villa-midnight-logo-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Providers>
          <ScrollToTop />
          <div className="mx-auto max-w-7xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
