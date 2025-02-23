import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser, isLoading } = useAuthContext();

  if (!isLoading && !authUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
