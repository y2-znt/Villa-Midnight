import ProtectedRoute from "@/components/shared/ProtectedRoute";
import EditEnigma from "../EditEnigma";

export default function page() {
  return (
    <ProtectedRoute>
      <EditEnigma />
    </ProtectedRoute>
  );
}
