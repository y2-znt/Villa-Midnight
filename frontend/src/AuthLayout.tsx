import LogoWithName from "./components/LogoWithName";
import { ThemeProvider } from "./components/providers/themeprovider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto m-4 max-w-7xl">
        <LogoWithName />
        <div className="mt-12">{children}</div>
      </div>
    </ThemeProvider>
  );
}
