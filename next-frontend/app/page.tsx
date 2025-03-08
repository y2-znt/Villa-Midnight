import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Title text="Home" highlight="Home" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <Button>Click me</Button>
    </div>
  );
}
