import { Providers } from "@/app/providers";
import ScrollToTop from "@/components/shared/ScrollToTop";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://villa-midnight.vercel.app"),
  title: "La Villa Midnight",
  description:
    "Découvrez des énigmes palpitantes et des escape games immersifs à Nantes. Une expérience unique mêlant mystère, aventure et travail d'équipe.",
  icons: {
    icon: "/assets/villa-midnight-logo-black.png",
  },
  authors: [
    {
      name: "y2",
      url: "https://x.com/y2_dev",
    },
  ],
  openGraph: {
    title: "La Villa Midnight",
    description:
      "Découvrez des énigmes palpitantes et des escape games immersifs à Nantes. Une expérience unique mêlant mystère, aventure et travail d'équipe.",
    url: "https://villa-midnight.vercel.app",
    siteName: "La Villa Midnight",
    images: "/assets/metadata.png",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Villa Midnight",
    description:
      "Découvrez des énigmes palpitantes et des escape games immersifs à Nantes. Une expérience unique mêlant mystère, aventure et travail d'équipe.",
    images: "/assets/metadata.png",
    creator: "@y2_dev",
  },
  keywords: [
    "escape game",
    "énigme",
    "aventure",
    "villa midnight",
    "y2",
    "y2_dev",
    "y2dev",
    "y2-dev",
  ],
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
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
