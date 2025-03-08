import Navbar from "@/components/shared/sections/Navbar";
import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/shared/sections/Footer";

export const metadata: Metadata = {
  title: "La Villa Midnight",
  description:
    "Découvrez des énigmes palpitantes et des escape games immersifs à Nantes. Une expérience unique mêlant mystère, aventure et travail d'équipe.",
  icons: {
    icon: "/assets/villa-midnight-logo-black.png",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="mx-auto max-w-7xl font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
