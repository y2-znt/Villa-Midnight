import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchEnigmasByUserId } from "../api/enigmaApi";
import EnigmaCard from "../components/EnigmaCard";
import { Button } from "../components/ui/button";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { EnigmaType } from "../types/types";

export default function MyEnigmas() {
  const { authUser } = useAuthContext();
  const [enigmas, setEnigmas] = useState<EnigmaType[]>([]);

  useEffect(() => {
    const getEnigmasByUserId = async () => {
      if (authUser) {
        try {
          const data = await fetchEnigmasByUserId(authUser.user.id);
          setEnigmas(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des énigmes de l'utilisateur:",
            error
          );
        }
      }
    };
    getEnigmasByUserId();
  }, [authUser]);

  return (
    <section className="mt-10 mb-28 md:mt-28">
      <Title text="MES" highlight="ÉNIGMES" />
      {enigmas.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <p className="mx-7 md:text-xl text-center font-bold">
            Vous n'avez pas encore créé d'énigmes. <br /> Commencez à en créer
            dès maintenant !
          </p>
          <Link to="/create-enigma">
            <Button>Créer une énigme</Button>
          </Link>
        </div>
      ) : (
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
          {enigmas.map((enigma: EnigmaType) => (
            <EnigmaCard key={enigma.id} enigma={enigma} />
          ))}
        </div>
      )}
    </section>
  );
}
