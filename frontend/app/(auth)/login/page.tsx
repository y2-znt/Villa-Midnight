import Login from "./Login";

export default function page() {
  return <Login />;
}

export async function generateMetadata() {
  return {
    title: "Connectez-vous - La Villa Midnight",
    description: "Connectez-vous à La Villa Midnight",
  };
}
