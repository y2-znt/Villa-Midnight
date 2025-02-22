import LogoWithName from "./components/shared/LogoWithName";
import { ThemeProvider } from "./context/themeprovider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto max-w-7xl">
        <div className="p-4">
          <LogoWithName />
        </div>
        <div className="my-16 md:my-28">{children}</div>
      </div>
    </ThemeProvider>
  );
}
