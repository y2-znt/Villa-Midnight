"use client";

import { useAuthContext } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!authUser) {
        toast.warning("Vous devez être connecté pour accéder à cette page");
        router.push("/");
        return;
      }

      if (pathname.startsWith("/admin") && authUser.user.role !== "ADMIN") {
        toast.error(
          "Vous n'avez pas les autorisations nécessaires pour accéder à cette page",
        );
        router.push("/");
      }
    }
  }, [authUser, isLoading, router, pathname]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
