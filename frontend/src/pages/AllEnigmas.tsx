import { deleteEnigma } from "../api/enigmaApi";
import EnigmaCard from "../components/shared/EnigmaCard";
import Title from "../components/ui/title";
import { fakeAdminEnigmas } from "../data/data";
import { EnigmaType } from "../types/types";

export default function AllEnigmas() {
  return (
    <div>
      <Title text="DÉFIS DE LA" highlight="VILLA" />
      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
        {fakeAdminEnigmas.length === 0 ? (
          <div className="text-center text-2xl font-bold">
            Aucune énigme disponible.
          </div>
        ) : (
          fakeAdminEnigmas.map((enigma: EnigmaType) => (
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
