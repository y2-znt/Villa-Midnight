import Particles from "../components/ui/particles";
import Hero from "../sections/Hero";

export default function Home() {
  return (
    <div>
      <div>
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url('/assets/hero_img.jpg')`,
            opacity: 0.3,
          }}
        />
        <Particles
          className="absolute inset-0 hidden xl:flex -z-10"
          quantity={200}
          ease={80}
          color={"#ffffff"}
          size={1}
          refresh
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
}
