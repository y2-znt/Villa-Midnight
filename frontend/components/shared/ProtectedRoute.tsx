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
    if (!isLoading && !authUser) {
      toast.warning("Vous devez être connecté pour accéder à cette page");
      router.push("/");
    }
  }, [authUser, isLoading, router, pathname]);

  if (authUser) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
