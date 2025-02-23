import { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteEnigma, fetchEnigmasByUserId } from "../../api/enigmaApi";
import EnigmaCard from "../../components/shared/EnigmaCard";
import EnigmaCardSkeleton from "../../components/shared/skeletons/EnigmaCardSkeleton";
import { Button } from "../../components/ui/button";
import Title from "../../components/ui/title";
import { useAuthContext } from "../../context/AuthContext";
import { EnigmaType } from "../../types/types";

export default function MyEnigmas() {
  const { authUser, token } = useAuthContext();
  const [enigmas, setEnigmas] = useState<EnigmaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id: string) => {
    if (!token) {
      console.error("No token available for deletion");
      return;
    }

    try {
      await deleteEnigma(id, token);
      setEnigmas((prevEnigmas) =>
        prevEnigmas.filter((enigma) => enigma.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'énigme:", error);
    }
  };

  useEffect(() => {
    const getEnigmasByUserId = async () => {
      if (authUser && token) {
        try {
          setIsLoading(true);
          const data = await fetchEnigmasByUserId(authUser.user.id, token);
          setEnigmas(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des énigmes de l'utilisateur:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    getEnigmasByUserId();
  }, [authUser, token]);

  return (
    <div>
      <Title
        text={!isLoading && enigmas.length === 0 ? "AUCUNE" : "MES"}
        highlight="ÉNIGMES"
      />
      {!isLoading && enigmas.length === 0 ? (
        <Link to="/create-enigma">
          <Button size="lg" className="my-24 mx-auto flex justify-center">
            Créer une énigme
          </Button>
        </Link>
      ) : (
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2 mt-16">
          {isLoading ? (
            <>
              <EnigmaCardSkeleton />
              <EnigmaCardSkeleton />
              <EnigmaCardSkeleton />
            </>
          ) : (
            enigmas.map((enigma: EnigmaType) => (
              <EnigmaCard
                key={enigma.id}
                enigma={enigma}
                onDelete={() => handleDelete(enigma.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
