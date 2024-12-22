import { ThemeProvider } from "./components/providers/themeprovider";
import Footer from "./sections/Footer";
import Header from "./sections/Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto max-w-7xl">
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
