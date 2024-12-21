import { Hourglass, UsersIcon } from "lucide-react";
import { EnigmaType } from "../types/types";
import Logo from "./Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function EnigmaCard({ enigma }: { enigma: EnigmaType }) {
  return (
    <Card key={enigma.id}>
      <img
        src={enigma.image}
        alt={enigma.title}
        className="w-full h-56 md:h-72 object-cover rounded-t-xl filter brightness-90"
      />
      <CardHeader>
        <CardTitle>{enigma.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-primary italic text-xl md:text-3xl">
              DIFFICULTÉ
            </span>{" "}
            {[...Array(enigma.difficulty)].map((_, index) => (
              <Logo key={index} />
            ))}
          </div>
        </CardDescription>
        <CardContent>
          {enigma.description.length > 130
            ? `${enigma.description.slice(0, 130)}...`
            : enigma.description}
        </CardContent>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row justify-between gap-4">
          <p className="flex items-center gap-2">
            <span className="font-medium">
              <UsersIcon />
            </span>{" "}
            {enigma.numberOfParticipants} personnes
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">
              <Hourglass />
            </span>{" "}
            {enigma.numberOfHours === 1
              ? `${enigma.numberOfHours} heure`
              : `${enigma.numberOfHours} heures`}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
