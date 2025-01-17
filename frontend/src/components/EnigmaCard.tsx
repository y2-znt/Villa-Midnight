import { TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { EnigmaType } from "../types/types";
import DifficultyIndicator from "./DifficultyIndicator";
import ParticipantsAndTime from "./ParticipantsAndTime";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function EnigmaCard({
  enigma,
  onDelete,
}: {
  enigma: EnigmaType;
  onDelete: (id: string) => void;
}) {
  const { authUser } = useAuthContext();

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette énigme ? Cette action est irréversible."
    );
    if (isConfirmed) {
      onDelete(enigma.id);
    }
  };

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
          <CardDescription>
            <DifficultyIndicator difficulty={enigma.difficulty} />
          </CardDescription>
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
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <TrashIcon className="size-7 text-primary" />
        </button>
      )}
    </Card>
  );
}
