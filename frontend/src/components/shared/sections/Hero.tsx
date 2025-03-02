import { Link } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import FadeIn from "../../animations/FadeIn";
import { Button } from "../../ui/button";
import Title from "../../ui/title";

const Hero = () => {
  const { authUser } = useAuthContext();

  return (
    <FadeIn delay={0.2}>
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
          Une villa pleine de mystères vous attend. Serez-vous prêts à relever
          ses énigmes ?
        </p>
        {authUser ? (
          <Link to="/create-enigma">
            <Button variant="default" size="lg" className="mt-4">
              CRÉER UNE ÉNIGME
            </Button>
          </Link>
        ) : (
          <Link to="/login">
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
