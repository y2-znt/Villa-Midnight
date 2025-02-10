import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { EnigmaType } from "../../types/types";
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

export interface EnigmaCardProps {
  enigma: EnigmaType;
  onDelete: (id: string, token: string) => void;
}

export default function EnigmaCard({ enigma, onDelete }: EnigmaCardProps) {
  const { authUser, token } = useAuthContext();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    if (!token) {
      console.error("No token available for deletion");
      return;
    }
    onDelete(enigma.id, token);
    setIsDeleted(true);
  };

  if (isDeleted) return null;

  return (
    <Card key={enigma.id} className="relative group">
      <Link to={`/enigma/${enigma.id}`}>
        <img
          src={enigma.image}
          alt={enigma.title}
          className="w-full h-56 md:h-72 object-cover rounded-t-xl filter brightness-90"
        />
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
      {authUser?.user.id === enigma.userId && (
        <div className="absolute top-2 right-2 opacity-100 transition-opacity md:opacity-0 group-hover:opacity-100">
          <Link to={`/edit-enigma/${enigma.id}`}>
            <button className="mr-2">
              <PencilIcon className="size-7 text-white" />
            </button>
          </Link>
          <DeleteEnigma enigmaId={enigma.id} onDelete={handleDeleteClick} />
        </div>
      )}
    </Card>
  );
}
