type TitleType = {
  text: React.ReactNode;
  highlight: string;
};

export default function Title({ text, highlight }: TitleType) {
  return (
    <h1 className="flex mx-7 text-4xl md:text-6xl/snug flex-col text-center">
      <span>
        {text} <span className="text-primary">{highlight}</span>
      </span>
    </h1>
  );
}
