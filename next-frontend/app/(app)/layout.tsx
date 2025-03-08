import Footer from "@/components/shared/sections/Footer";
import Navbar from "@/components/shared/sections/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="my-16 md:my-24">{children}</main>
      <Footer />
    </div>
  );
}
