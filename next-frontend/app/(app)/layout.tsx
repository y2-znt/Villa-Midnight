import Footer from "@/components/shared/sections/Footer";
import Navbar from "@/components/shared/sections/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
