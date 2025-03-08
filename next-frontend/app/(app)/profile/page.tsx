import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Profile from "./Profile";

export default function page() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
