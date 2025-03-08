import { AuthContextProvider } from "@/context/authContext";
import TanstackProvider from "@/context/tanstack-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <AuthContextProvider>
        <Toaster richColors position="bottom-right" />
        {children}
      </AuthContextProvider>
    </TanstackProvider>
  );
}
