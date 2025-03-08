import ProtectedRoute from "@/components/shared/ProtectedRoute";
import CreateEnigma from "./CreateEnigma";

export default function Page() {
  return (
    <ProtectedRoute>
      <CreateEnigma />
    </ProtectedRoute>
  );
}
