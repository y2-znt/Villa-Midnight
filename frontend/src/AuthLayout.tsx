import LogoWithName from "./components/LogoWithName";
import { ThemeProvider } from "./components/providers/themeprovider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-7 md:mx-auto mt-4 max-w-7xl">
        <LogoWithName />
        <div className="my-16 md:my-28">{children}</div>
      </div>
    </ThemeProvider>
  );
}
