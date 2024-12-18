import { ThemeProvider } from "./components/providers/themeprovider";
import Header from "./sections/Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="relative h-screen bg-cover bg-center">
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
}
