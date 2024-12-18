import { Button } from "../components/ui/button";
import Title from "../components/ui/title";

const Hero = () => {
  return (
    <section className="mt-28 md:mt-48 relative flex h-full flex-col items-center justify-center text-center">
      <Title
        text={
          <>
            Entrez dans la villa. <br /> Résolvez ses
          </>
        }
        highlight="Énigmes Palpitantes."
      />
      <p className="my-4 w-[330px] text-sm md:w-[550px] md:text-2xl">
        Une villa pleine de mystères vous attend. Serez-vous prêts à relever ses
        énigmes ?
      </p>
      <Button variant="default" size="lg" className="mt-4">
        RELEVEZ LE DÉFI
      </Button>
    </section>
  );
};

export default Hero;
