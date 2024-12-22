import Particles from "../components/ui/particles";
import Hero from "../sections/Hero";

export default function Home() {
  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url('/assets/hero_img.jpg')`,
          opacity: 0.15,
        }}
      />
      <div>
        <Hero />
        <Particles
          className="absolute inset-0 hidden xl:flex -z-10"
          quantity={200}
          ease={80}
          color={"#ffffff"}
          size={1}
          refresh
        />
      </div>
    </div>
  );
}
