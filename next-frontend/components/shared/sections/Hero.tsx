"use client";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";

const Hero = () => {
  const { authUser } = useAuthContext();

  return (
    <FadeIn delay={0.2}>
      <section className="relative mt-28 flex h-full flex-col items-center justify-center text-center md:mt-48">
        <Title
          text={
            <>
              Entrez dans la villa. <br /> Résolvez ses
            </>
          }
          highlight="Énigmes Palpitantes."
        />
        <p className="my-4 w-[330px] text-sm md:w-[550px] md:text-2xl">
          Une villa pleine de mystères vous attend. Serez-vous prêts à relever
          ses énigmes ?
        </p>
        {authUser ? (
          <Link href="/create-enigma">
            <Button variant="default" size="lg" className="mt-4">
              CRÉER UNE ÉNIGME
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="default" size="lg" className="mt-4">
              RELEVER LE DÉFI
            </Button>
          </Link>
        )}
      </section>
    </FadeIn>
  );
};

export default Hero;
