"use client";
import { useAuthContext } from "@/context/authContext";
import { EnigmaType } from "@/types/types";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DeleteEnigma from "./DeleteEnigma";
import DifficultyIndicator from "./DifficultyIndicator";
import ParticipantsAndTime from "./ParticipantsAndTime";
import EnigmaCardSkeleton from "./skeletons/EnigmaCardSkeleton";

export interface EnigmaCardProps {
  enigma: EnigmaType;
  onDelete: (id: string, token: string) => void;
}

export default function EnigmaCard({ enigma, onDelete }: EnigmaCardProps) {
  const { authUser } = useAuthContext();
  const [isDeleted, setIsDeleted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await onDelete(enigma.id, token);
    setIsDeleted(true);
  };

  if (isDeleted) return null;

  return (
    <div className="relative">
      {!imageLoaded && <EnigmaCardSkeleton />}
      <Card
        key={enigma.id}
        className="group relative"
        style={{ display: imageLoaded ? "block" : "none" }}
      >
        <Link href={`/enigma/${enigma.id}`}>
          <div className="relative">
            <Image
              src={enigma.image}
              alt={enigma.title}
              className="h-56 w-full rounded-t-xl object-cover brightness-90 filter md:h-72"
              width={1000}
              height={1000}
              onLoadingComplete={() => setImageLoaded(true)}
              priority
            />
          </div>
          <CardHeader>
            <CardTitle>{enigma.title}</CardTitle>
            <DifficultyIndicator difficulty={enigma.difficulty} />
            <CardContent>
              {enigma.description.length > 130
                ? `${enigma.description.slice(0, 130)}...`
                : enigma.description}
            </CardContent>
          </CardHeader>
          <CardFooter>
            <ParticipantsAndTime
              numberOfParticipants={enigma.numberOfParticipants}
              numberOfHours={enigma.numberOfHours}
              className="justify-between"
            />
          </CardFooter>
        </Link>
        {authUser?.user?.id === enigma.userId && (
          <div className="absolute top-2 right-2 opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
            <Link href={`/edit-enigma/${enigma.id}`}>
              <button className="mr-2">
                <PencilIcon className="size-7 text-white" />
              </button>
            </Link>
            <DeleteEnigma enigmaId={enigma.id} onDelete={handleDeleteClick} />
          </div>
        )}
      </Card>
    </div>
  );
}
