import Logo from "./Logo";

type DifficultyIndicatorProps = {
  difficulty: number;
  className?: string;
};

const DifficultyIndicator = ({
  difficulty,
  className,
}: DifficultyIndicatorProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`font-bold text-primary italic text-xl md:text-3xl ${className}`}
      >
        DIFFICULTÉ
      </span>{" "}
      {[...Array(difficulty)].map((_, index) => (
        <Logo key={index} />
      ))}
    </div>
  );
};

export default DifficultyIndicator;
