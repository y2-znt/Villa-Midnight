import ProtectedRoute from "@/components/shared/ProtectedRoute";
import CreateEnigma from "./CreateEnigma";

export default function Page() {
  return (
    <ProtectedRoute>
      <CreateEnigma />
    </ProtectedRoute>
  );
}

export async function generateMetadata() {
  return {
    title: "Créez votre énigme - La Villa Midnight",
    description: "Créez votre énigme pour La Villa Midnight",
  };
}
