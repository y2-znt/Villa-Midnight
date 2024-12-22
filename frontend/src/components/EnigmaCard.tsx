import { Link } from "react-router";
import { EnigmaType } from "../types/types";
import DifficultyIndicator from "./DifficultyIndicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ParticipantsAndTime from "./ParticipantsAndTime";

export default function EnigmaCard({ enigma }: { enigma: EnigmaType }) {
  return (
    <Card key={enigma.id}>
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
    </Card>
  );
}
