import { deleteEnigma } from "../../api/enigmaApi";
import FadeUpOnScroll from "../../components/animations/FadeUpOnScroll";
import EnigmaCard from "../../components/shared/EnigmaCard";
import Title from "../../components/ui/title";
import { fakeAdminEnigmas } from "../../data/data";
import { EnigmaType } from "../../types/types";

export default function AllEnigmas() {
  return (
    <div>
      <Title text="DÉFIS DE LA" highlight="VILLA" />
      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
        {fakeAdminEnigmas.map((enigma: EnigmaType, index: number) => (
          <FadeUpOnScroll key={enigma.id} delay={index * 0.2}>
            <EnigmaCard enigma={enigma} onDelete={deleteEnigma} />
          </FadeUpOnScroll>
        ))}
      </div>
    </div>
  );
}
