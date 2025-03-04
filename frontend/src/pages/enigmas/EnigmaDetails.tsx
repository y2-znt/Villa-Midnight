import { LucideCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchEnigmaById } from "../../api/enigmaApi";
import FadeUp from "../../components/animations/FadeUp";
import DifficultyIndicator from "../../components/shared/DifficultyIndicator";
import ParticipantsAndTime from "../../components/shared/ParticipantsAndTime";
import EnigmaDetailsSkeleton from "../../components/shared/skeletons/EnigmaDetailsSkeleton";
import { Button } from "../../components/ui/button";
import Title from "../../components/ui/title";
import { fakeAdminEnigmas } from "../../data/data";
import { EnigmaType } from "../../types/types";

export default function EnigmaDetails() {
  const { id } = useParams();
  const [enigma, setEnigma] = useState<EnigmaType | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Copier le lien");
  const [iconVisible, setIconVisible] = useState(true);

  useEffect(() => {
    const getEnigma = async () => {
      if (!id) {
        console.error("Enigma ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchEnigmaById(id);
        if (data) {
          setEnigma(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'énigme:", error);
      } finally {
        setLoading(false);
      }
    };

    getEnigma();
  }, [id]);

  const displayedEnigma = enigma ?? fakeAdminEnigmas.find((e) => e.id === id);

  if (loading) return <EnigmaDetailsSkeleton />;
  if (!displayedEnigma)
    return <Title text="Aucune énigme" highlight="trouvée" />;

  const { title, description, difficulty, image, updatedAt, createdBy } =
    displayedEnigma;

  const shareLink = `${window.location.origin}/enigma/${id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setButtonText("Lien copié ! ✓");
      setIconVisible(false);
      setTimeout(() => {
        setButtonText("Copier le lien");
        setIconVisible(true);
      }, 3000);
    });
  };

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat p-5 rounded-lg text-white h-2/3 absolute top-0 left-0 right-0 bottom-0 z-[-1] transition-opacity duration-700 ease-in-out opacity-0 animate-fade-in"
        style={{ backgroundImage: `url(${image})`, opacity: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />
      </div>

      <div className="mx-7 mt-14 mb-36 md:mt-28 flex flex-col items-start">
        <FadeUp delay={0.2}>
          <Title
            text={title.split(" ").slice(0, -1).join(" ")}
            highlight={title.split(" ").pop() || ""}
            className="mx-0"
          />
        </FadeUp>
        <div className="flex justify-between">
          <div className="flex flex-col mt-10">
            <FadeUp delay={0.4}>
              <DifficultyIndicator
                difficulty={difficulty as "ONE" | "TWO" | "THREE"}
              />
            </FadeUp>
            <FadeUp delay={0.6}>
              <div className="text-base md:text-xl max-w-lg leading-relaxed mt-4">
                {description}
              </div>
            </FadeUp>
            <FadeUp delay={0.8}>
              <ParticipantsAndTime
                numberOfParticipants={displayedEnigma.numberOfParticipants}
                numberOfHours={displayedEnigma.numberOfHours}
              />
            </FadeUp>
            <FadeUp delay={1.0}>
              <p className="mt-6 text-sm md:text-base text-muted-foreground">
                Mis à jour le :{" "}
                {updatedAt
                  ? new Date(updatedAt).toLocaleDateString()
                  : "Date inconnue"}{" "}
                par {createdBy?.username || "Utilisateur inconnu"}
              </p>
            </FadeUp>
            <FadeUp delay={1.2}>
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="mt-10 flex items-center justify-center"
              >
                {buttonText}
                {iconVisible && <LucideCopy />}
              </Button>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
