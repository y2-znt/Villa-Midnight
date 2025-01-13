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
    <div>
      <Title
        text={enigmas.length === 0 ? "AUCUNE" : "MES"}
        highlight="ÉNIGMES"
      />
      {enigmas.length === 0 ? (
        <Link to="/create-enigma">
          <Button size="lg" className="my-24 mx-auto flex justify-center">
            Créer une énigme
          </Button>
        </Link>
      ) : (
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
          {enigmas.map((enigma: EnigmaType) => (
            <EnigmaCard key={enigma.id} enigma={enigma} />
          ))}
        </div>
      )}
    </div>
  );
}
