import Contact from "@/components/shared/sections/Contact";

export default function page() {
  return <Contact />;
}

export async function generateMetadata() {
  return {
    title: "Contact - La Villa Midnight",
    description: "Contactez-nous pour plus d'informations",
  };
}
