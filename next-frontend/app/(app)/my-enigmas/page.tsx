import ProtectedRoute from "@/components/shared/ProtectedRoute";
import MyEnigmas from "./MyEnigmas";

export default function page() {
  return (
    <ProtectedRoute>
      <MyEnigmas />
    </ProtectedRoute>
  );
}
