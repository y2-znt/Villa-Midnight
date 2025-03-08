import ProtectedRoute from "@/components/shared/ProtectedRoute";
import EditEnigma from "../EditEnigma";

export default function page() {
  return (
    <ProtectedRoute>
      <EditEnigma />
    </ProtectedRoute>
  );
}

export async function generateMetadata() {
  return {
    title: `Modifier votre énigme - La Villa Midnight`,
    description: `Modifier votre énigme sur La Villa Midnight`,
  };
}
