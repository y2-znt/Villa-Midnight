"use client";

import FadeUp from "@/components/animations/FadeUp";
import DifficultyIndicator from "@/components/shared/DifficultyIndicator";
import ParticipantsAndTime from "@/components/shared/ParticipantsAndTime";
import EnigmaDetailsSkeleton from "@/components/shared/skeletons/EnigmaDetailsSkeleton";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { fakeAdminEnigmas } from "@/data/data";
import { useEnigma } from "@/hooks/useEnigma";
import { LucideCopy } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EnigmaDetails() {
  const params = useParams();
  const id = params.id as string;
  const { data: enigma, isLoading } = useEnigma(id);
  const [buttonText, setButtonText] = useState("Copier le lien");
  const [iconVisible, setIconVisible] = useState(true);

  const displayedEnigma = enigma ?? fakeAdminEnigmas.find((e) => e.id === id);

  if (isLoading) return <EnigmaDetailsSkeleton />;
  if (!displayedEnigma)
    return <Title text="Aucune énigme" highlight="trouvée" />;

  const { title, description, difficulty, image, updatedAt, createdBy } =
    displayedEnigma;

  const shareLink = `${window?.location?.origin}/enigma/${id}`;

  const copyToClipboard = () => {
    if (typeof window === "undefined") return;

    navigator.clipboard.writeText(shareLink).then(() => {
      setButtonText("Lien copié ! ✓");
      setIconVisible(false);
      toast("Lien copié dans le presse-papier !");
      setTimeout(() => {
        setButtonText("Copier le lien");
        setIconVisible(true);
      }, 3000);
    });
  };

  return (
    <div>
      <div
        className="animate-fade-in absolute top-0 right-0 bottom-0 left-0 z-[-1] h-2/3 rounded-lg bg-cover bg-center bg-no-repeat p-5 text-white opacity-0 transition-opacity duration-700 ease-in-out"
        style={{ backgroundImage: `url(${image})`, opacity: 0.7 }}
      >
        <div className="to-background absolute inset-0 -z-10 bg-gradient-to-b from-transparent" />
      </div>

      <div className="mx-7 mt-14 mb-36 flex flex-col items-start md:mt-28">
        <FadeUp delay={0.2}>
          <Title
            text={title.split(" ").slice(0, -1).join(" ")}
            highlight={title.split(" ").pop() || ""}
            className="mx-0"
          />
        </FadeUp>
        <div className="flex justify-between">
          <div className="mt-10 flex flex-col">
            <FadeUp delay={0.4}>
              <DifficultyIndicator
                difficulty={difficulty as "ONE" | "TWO" | "THREE"}
              />
            </FadeUp>
            <FadeUp delay={0.6}>
              <div className="mt-4 max-w-lg text-base leading-relaxed md:text-xl">
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
              <p className="text-muted-foreground mt-6 text-sm md:text-base">
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
