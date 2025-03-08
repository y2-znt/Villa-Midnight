import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Profile from "./Profile";

export default function page() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}

export async function generateMetadata() {
  return {
    title: "Profil - La Villa Midnight",
    description: "Gérez votre profil sur La Villa Midnight",
  };
}
