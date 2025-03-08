import FadeOnScroll from "@/components/animations/FadeOnScroll";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { fakeAdminEnigmas } from "@/data/data";
import { UsersIcon } from "lucide-react";
import Link from "next/link";

export default function BestEnigmas() {
  return (
    <FadeOnScroll delay={0}>
      <div className="flex flex-col items-center">
        <Title text="énigmes" highlight="de la villa" />

        <div className="my-36 flex w-4/5 flex-col gap-32 max-md:w-full">
          {fakeAdminEnigmas.map((enigma, index) => (
            <FadeOnScroll key={enigma.id} delay={index * 0.3}>
              <div
                className={`flex max-md:flex-col ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } gap-10 md:gap-52`}
              >
                <div className="group relative flex-1">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r opacity-25 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
                  <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[500px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${enigma.image})`,
                      }}
                    />
                    <div className="from-background/95 to-background/95 absolute inset-0 bg-gradient-to-t via-transparent" />
                    <div className="from-background/95 to-background/95 absolute inset-0 bg-gradient-to-r via-transparent" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center px-8">
                  <span className="mb-6 text-3xl font-bold md:text-5xl">
                    {enigma.title}
                  </span>
                  <p className="text-muted-foreground mb-4 md:text-xl">
                    {enigma.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between md:mr-4">
                    <p className="flex items-center gap-3">
                      <span className="font-medium">
                        <UsersIcon size={24} />
                      </span>
                      {enigma.numberOfParticipants} personnes
                    </p>
                    <Link href={`/enigma/${enigma.id}`}>
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
