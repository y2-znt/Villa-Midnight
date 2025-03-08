import AllEnigmas from "./AllEnigmas";

export default function page() {
  return <AllEnigmas />;
}

export async function generateMetadata() {
  return {
    title: "Enigmes - La Villa Midnight",
    description: "Découvrez les énigmes de La Villa Midnight",
  };
}
