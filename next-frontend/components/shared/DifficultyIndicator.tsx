import Logo from "./Logo";

type DifficultyIndicatorProps = {
  difficulty: string;
};

const DifficultyIndicator = ({ difficulty }: DifficultyIndicatorProps) => {
  const difficultyLevels = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
  }[difficulty];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-primary text-xl font-bold italic md:text-3xl">
        DIFFICULTÉ
      </span>
      {[...Array(difficultyLevels)].map((_, index) => (
        <Logo key={index} />
      ))}
    </div>
  );
};

export default DifficultyIndicator;
