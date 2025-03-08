import { fakeAdminEnigmas } from "@/data/data";
import { fetchEnigmaById } from "@/lib/api/enigmaApi";
import EnigmaDetails from "../EnigmaDetails";

export default function EnigmaPage() {
  return <EnigmaDetails />;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  let enigma = null;
  let fakeEnigma = null;

  try {
    enigma = await fetchEnigmaById(params.id);
  } catch (error) {
    console.error(error);
  }

  fakeEnigma = fakeAdminEnigmas.find((e) => e.id === params.id);

  const selectedEnigma = enigma || fakeEnigma;

  return {
    title: `${selectedEnigma.title} - La Villa Midnight`,
    description: selectedEnigma.description,
    images: selectedEnigma.image,
  };
}
