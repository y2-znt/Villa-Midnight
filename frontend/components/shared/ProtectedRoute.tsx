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
      } else if (authUser.user.role !== "ADMIN") {
        toast.error(
          "Vous n'avez pas les autorisations nécessaires pour accéder à cette page",
        );
        router.push("/");
      }
    }
  }, [authUser, isLoading, router, pathname]);

  if (authUser && authUser.user.role === "ADMIN") {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
