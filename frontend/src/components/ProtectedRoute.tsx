import { Navigate } from "react-router";
import AuthLayout from "../AuthLayout";
import { useAuthContext } from "../context/AuthContext";
import Title from "./ui/title";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <AuthLayout>
        <Title text="Chargement en" highlight="cours..." />
      </AuthLayout>
    );
  }

  return authUser ? children : <Navigate to="/" />;
}
