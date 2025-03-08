"use client";
import FadeUpOnScroll from "@/components/animations/FadeUpOnScroll";
import EnigmaCard from "@/components/shared/EnigmaCard";
import Title from "@/components/ui/title";
import { fakeAdminEnigmas } from "@/data/data";
import { deleteEnigma } from "@/lib/api/enigmaApi";
import { EnigmaType } from "@/types/types";

export default function AllEnigmas() {
  return (
    <div>
      <Title text="DÉFIS DE LA" highlight="VILLA" />
      <div className="mx-4 mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
        {fakeAdminEnigmas.map((enigma: EnigmaType, index: number) => (
          <FadeUpOnScroll key={enigma.id} delay={index * 0.2}>
            <EnigmaCard enigma={enigma} onDelete={deleteEnigma} />
          </FadeUpOnScroll>
        ))}
      </div>
    </div>
  );
}
