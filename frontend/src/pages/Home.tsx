import FadeIn from "../components/animations/FadeIn";
import BestEnigmas from "../components/shared/sections/BestEnigmas";
import Footer from "../components/shared/sections/Footer";
import Navbar from "../components/shared/sections/Header";
import Hero from "../components/shared/sections/Hero";
import Testimonials from "../components/shared/sections/Testimonials";
import Particles from "../components/ui/particles";
import { ThemeProvider } from "../context/themeprovider";

import Contact from "./Contact";
import FAQ from "./FAQ";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto max-w-7xl">
        <FadeIn delay={1}>
          <Navbar />
        </FadeIn>
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url('/assets/hero_img.webp')`,
            opacity: 0.2,
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
        <BestEnigmas />
        <div className="my-[20vh] md:my-[30vh] space-y-[25vh]">
          <Testimonials />
          <FAQ />
          <Contact />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
