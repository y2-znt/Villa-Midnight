import { useEffect, useState } from "react";
import { deleteEnigma, fetchAllEnigmas } from "../api/enigmaApi";
import EnigmaCard from "../components/shared/EnigmaCard";
import Title from "../components/ui/title";
import { EnigmaType } from "../types/types";

export default function AllEnigmas() {
  const [enigmas, setEnigmas] = useState<EnigmaType[]>([]);

  useEffect(() => {
    const getEnigmas = async () => {
      try {
        const data = await fetchAllEnigmas();
        setEnigmas(data.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors de la récupération des énigmes:", error);
      }
    };

    getEnigmas();
  }, []);

  return (
    <div>
      <Title text="DÉFIS DE LA" highlight="VILLA" />
      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
        {enigmas.length === 0 ? (
          <div className="text-center text-2xl font-bold">
            Aucune énigme disponible.
          </div>
        ) : (
          enigmas.map((enigma: EnigmaType) => (
            <EnigmaCard
              key={enigma.id}
              enigma={enigma}
              onDelete={deleteEnigma}
            />
          ))
        )}
      </div>
    </div>
  );
}
