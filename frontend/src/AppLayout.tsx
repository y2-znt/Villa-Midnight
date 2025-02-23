import Footer from "./components/shared/sections/Footer";
import Navbar from "./components/shared/sections/Header";
import { ThemeProvider } from "./context/themeprovider";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="mt-10 my-28 md:mt-28">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
