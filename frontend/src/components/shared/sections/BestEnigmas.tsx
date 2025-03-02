import { UsersIcon } from "lucide-react";
import { Link } from "react-router";
import { fakeAdminEnigmas } from "../../../data/data";
import FadeOnScroll from "../../animations/FadeOnScroll";
import { Button } from "../../ui/button";
import Title from "../../ui/title";

export default function BestEnigmas() {
  return (
    <FadeOnScroll delay={0}>
      <div className="flex flex-col items-center">
        <Title text="énigmes" highlight="de la villa" />

        <div className="flex flex-col gap-32 w-4/5 my-36 max-md:w-full">
          {fakeAdminEnigmas.map((enigma, index) => (
            <FadeOnScroll key={enigma.id} delay={index * 0.3}>
              <div
                className={`flex max-md:flex-col ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } gap-10 md:gap-52`}
              >
                <div className="relative group flex-1">
                  <div className="absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                  <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${enigma.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/95" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-transparent to-background/95" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center px-8">
                  <span className="text-3xl md:text-5xl font-bold mb-6">
                    {enigma.title}
                  </span>
                  <p className="md:text-xl text-muted-foreground mb-4">
                    {enigma.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 md:mr-4">
                    <p className="flex items-center gap-3">
                      <span className="font-medium">
                        <UsersIcon size={24} />
                      </span>
                      {enigma.numberOfParticipants} personnes
                    </p>
                    <Link to={`/enigma/${enigma.id}`}>
                      <Button size="lg" className="">
                        Enquêter
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeOnScroll>
          ))}
        </div>
      </div>
    </FadeOnScroll>
  );
}
