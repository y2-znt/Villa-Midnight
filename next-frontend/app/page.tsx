import BestEnigmas from "@/components/shared/sections/BestEnigmas";
import Contact from "@/components/shared/sections/Contact";
import FAQ from "@/components/shared/sections/FAQ";
import Footer from "@/components/shared/sections/Footer";
import Hero from "@/components/shared/sections/Hero";
import Testimonials from "@/components/shared/sections/Testimonials";
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/hero_img.webp')`,
          opacity: 0.2,
        }}
      />
      <div className="to-background absolute inset-0 -z-10 bg-gradient-to-b from-transparent" />
      <Particles
        className="absolute inset-0 -z-10 hidden xl:flex"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        size={1}
        refresh
      />
      <Hero />
      <div className="mt-[50vh]"></div>
      <BestEnigmas />
      <div className="my-[20vh] space-y-[25vh] md:my-[30vh]">
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
