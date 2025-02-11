import Logo from "./Logo";

type DifficultyIndicatorProps = {
  difficulty: "ONE" | "TWO" | "THREE";
};

const DifficultyIndicator = ({ difficulty }: DifficultyIndicatorProps) => {
  const difficultyLevels = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-bold text-primary italic text-xl md:text-3xl">
        DIFFICULTÉ
      </span>{" "}
      {[...Array(difficultyLevels[difficulty])].map((_, index) => (
        <Logo key={index} />
      ))}
    </div>
  );
};

export default DifficultyIndicator;
