"use client";
import FadeUpOnScroll from "@/components/animations/FadeUpOnScroll";
import EnigmaCard from "@/components/shared/EnigmaCard";
import EnigmaCardSkeleton from "@/components/shared/skeletons/EnigmaCardSkeleton";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { getToken } from "@/config/config";
import { useAuthContext } from "@/context/authContext";
import { useDeleteEnigma, useEnigmasByUserId } from "@/hooks/useEnigma";
import { EnigmaType } from "@/types/types";
import Link from "next/link";

export default function MyEnigmas() {
  const { authUser } = useAuthContext();
  const { deleteEnigma } = useDeleteEnigma();
  const { data: enigmas, isLoading } = useEnigmasByUserId(authUser?.user?.id);

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) {
      console.error("No token available for deletion");
      return;
    }
    deleteEnigma({ id, token });
  };

  return (
    <div>
      <Title
        text={!isLoading && enigmas?.length === 0 ? "AUCUNE" : "MES"}
        highlight="ÉNIGMES"
      />
      {!isLoading && enigmas?.length === 0 ? (
        <Link href="/create-enigma">
          <Button size="lg" className="mx-auto my-24 flex justify-center">
            Créer une énigme
          </Button>
        </Link>
      ) : (
        <div className="mx-4 mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <EnigmaCardSkeleton />
              <EnigmaCardSkeleton />
              <EnigmaCardSkeleton />
            </>
          ) : (
            enigmas?.map((enigma: EnigmaType, index: number) => (
              <FadeUpOnScroll key={enigma.id} delay={index * 0.2}>
                <EnigmaCard
                  enigma={enigma}
                  onDelete={() => handleDelete(enigma.id)}
                />
              </FadeUpOnScroll>
            ))
          )}
        </div>
      )}
    </div>
  );
}
