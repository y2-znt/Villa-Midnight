import ProtectedRoute from "@/components/shared/ProtectedRoute";
import MyEnigmas from "./MyEnigmas";

export default function page() {
  return (
    <ProtectedRoute>
      <MyEnigmas />
    </ProtectedRoute>
  );
}

export async function generateMetadata() {
  return {
    title: "Mes énigmes - La Villa Midnight",
    description: "Gérez vos énigmes sur La Villa Midnight",
  };
}
