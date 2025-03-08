import { Hourglass, UsersIcon } from "lucide-react";

type ParticipantsAndTimeProps = {
  numberOfParticipants: number;
  numberOfHours: number;
  className?: string;
};

const ParticipantsAndTime = ({
  numberOfParticipants,
  numberOfHours,
  className,
}: ParticipantsAndTimeProps) => {
  return (
    <div
      className={`mt-10 flex flex-row gap-4 text-sm md:text-lg ${className}`}
    >
      <p className="flex items-center gap-2">
        <span className="font-medium">
          <UsersIcon />
        </span>
        {numberOfParticipants} personnes
      </p>
      <p className="flex items-center gap-2">
        <span className="font-medium">
          <Hourglass />
        </span>
        {numberOfHours === 1
          ? `${numberOfHours} heure`
          : `${numberOfHours} heures`}
      </p>
    </div>
  );
};

export default ParticipantsAndTime;
