import Particles from "../components/ui/particles";
import Hero from "../sections/Hero";
import Contact from "./Contact";
import FAQ from "./FAQ";

export default function Home() {
  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url('/assets/hero_img.jpg')`,
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />
      <Particles
        className="absolute inset-0 hidden xl:flex -z-10"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        size={1}
        refresh
      />

      <Hero />
      <div className="mt-[50vh]"></div>
      <FAQ />
      <div className="my-[30vh]">
        <Contact />
      </div>
    </div>
  );
}
