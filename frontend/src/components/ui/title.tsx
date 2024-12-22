type TitleType = {
  text: React.ReactNode;
  highlight: string;
  className?: string;
};

export default function Title({ text, highlight, className }: TitleType) {
  return (
    <h1
      className={`flex mx-7 lg:mx-0 text-4xl md:text-6xl/snug flex-col text-center ${className}`}
    >
      <span>
        {text} <span className="text-primary">{highlight}</span>
      </span>
    </h1>
  );
}
