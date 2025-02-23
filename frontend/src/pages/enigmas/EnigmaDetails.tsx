import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchEnigmaById } from "../../api/enigmaApi";
import { fetchUserById } from "../../api/userApi";
import DifficultyIndicator from "../../components/shared/DifficultyIndicator";
import ParticipantsAndTime from "../../components/shared/ParticipantsAndTime";
import EnigmaDetailsSkeleton from "../../components/shared/skeletons/EnigmaDetailsSkeleton";
import Title from "../../components/ui/title";
import { useAuthContext } from "../../context/AuthContext";
import { fakeAdminEnigmas } from "../../data/data";
import { EnigmaType } from "../../types/types";

export default function EnigmaDetails() {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [enigma, setEnigma] = useState<EnigmaType | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEnigma = async () => {
      if (!id || !token) {
        console.error("Enigma ID or Token is undefined");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchEnigmaById(id, token);
        if (data) {
          setEnigma(data);
          const userData = await fetchUserById(data.userId, token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'énigme:", error);
      } finally {
        setLoading(false);
      }
    };

    getEnigma();
  }, [id, token]);

  const displayedEnigma = enigma ?? fakeAdminEnigmas.find((e) => e.id === id);

  if (loading) return <EnigmaDetailsSkeleton />;
  if (!displayedEnigma)
    return <Title text="Aucune énigme" highlight="trouvée" />;

  const { title, description, difficulty, image, updatedAt, createdBy } =
    displayedEnigma;

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat p-5 rounded-lg text-white h-2/3 absolute top-0 left-0 right-0 bottom-0 z-[-1]"
        style={{ backgroundImage: `url(${image})`, opacity: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />
      </div>

      <div className="mx-7 mt-14 mb-36 md:mt-28 flex flex-col items-start">
        <Title
          text={title.split(" ").slice(0, -1).join(" ")}
          highlight={title.split(" ").pop() || ""}
          className="mx-0"
        />
        <div className="flex justify-between">
          <div className="flex flex-col mt-10">
            <DifficultyIndicator
              difficulty={difficulty as "ONE" | "TWO" | "THREE"}
            />
            <div className="text-base md:text-xl max-w-lg leading-relaxed mt-4">
              {description}
            </div>

            <ParticipantsAndTime
              numberOfParticipants={displayedEnigma.numberOfParticipants}
              numberOfHours={displayedEnigma.numberOfHours}
            />
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              Mis à jour le :{" "}
              {updatedAt
                ? new Date(updatedAt).toLocaleDateString()
                : "Date inconnue"}{" "}
              par {user?.username || createdBy?.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
