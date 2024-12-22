import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchEnigmaById } from "../api/enigmaApi";
import { fetchUserById } from "../api/userApi";
import DifficultyIndicator from "../components/DifficultyIndicator";
import Title from "../components/ui/title";
import { EnigmaType } from "../types/types";
import ParticipantsAndTime from "../components/ParticipantsAndTime";

export default function EnigmaDetails() {
  const { id } = useParams();
  const [enigma, setEnigma] = useState<EnigmaType | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const getEnigma = async () => {
      if (!id) {
        console.error("Enigma ID is undefined");
        return;
      }
      try {
        const data = await fetchEnigmaById(id);
        setEnigma(data);

        const userData = await fetchUserById(data.userId);
        setUser(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'énigme:", error);
      }
    };

    getEnigma();
  }, [id]);

  if (!enigma) return <div>Loading...</div>;
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat p-5 rounded-lg text-white h-2/3 absolute top-0 left-0 right-0 bottom-0 z-[-1]"
        style={{ backgroundImage: `url(${enigma.image})`, opacity: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />
      </div>

      <div className="mx-7 mt-10 mb-36 md:mt-28 flex flex-col items-start">
        <Title
          text={enigma.title.split(" ").slice(0, -1).join(" ")}
          highlight={enigma.title.split(" ").pop() || ""}
          className="mx-0"
        />
        <div className="flex justify-between">
          <div className="flex flex-col mt-10">
            <DifficultyIndicator difficulty={enigma.difficulty} />
            <div className="text-base md:text-xl max-w-lg leading-relaxed mt-4">
              {enigma.description}
            </div>

            <ParticipantsAndTime
              numberOfParticipants={enigma.numberOfParticipants}
              numberOfHours={enigma.numberOfHours}
            />
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              Mis à jour le :{" "}
              {enigma.updatedAt
                ? new Date(enigma.updatedAt).toLocaleDateString()
                : "Date inconnue"}{" "}
              par {user ? user.username : "Personne mystèrieuse"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
