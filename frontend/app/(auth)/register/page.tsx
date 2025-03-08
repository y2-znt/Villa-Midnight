import Register from "./Register";

export default function page() {
  return <Register />;
}

export async function generateMetadata() {
  return {
    title: "Inscrivez-vous - La Villa Midnight",
    description: "Inscrivez-vous à La Villa Midnight",
  };
}
