type TitleType = {
  text: React.ReactNode;
  highlight: string;
  className?: string;
};

export default function Title({ text, highlight, className }: TitleType) {
  return (
    <h1
      className={`mx-7 flex flex-col text-center text-4xl md:text-6xl/snug lg:mx-0 ${className}`}
    >
      <span>
        {text} <span className="text-primary">{highlight}</span>
      </span>
    </h1>
  );
}
