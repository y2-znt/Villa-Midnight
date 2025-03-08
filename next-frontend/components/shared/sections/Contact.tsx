"use client";
import FadeUpOnScroll from "@/components/animations/FadeUpOnScroll";
import Title from "@/components/ui/title";
import { contactList } from "@/data/data";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);

  return (
    <FadeUpOnScroll delay={0}>
      <div className="relative flex flex-col items-center">
        <div className="to-background/30 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent" />

        <Title text="ENTREZ DANS" highlight="L'AVENTURE" />

        <div className="mt-20 w-full max-w-5xl px-4" ref={ref}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {contactList.map((contact, index) => (
              <FadeUpOnScroll key={index} delay={index * 0.2}>
                <div className="group bg-background/50 before:border-primary relative rounded-2xl border p-8 backdrop-blur-sm transition-all before:absolute before:inset-0 before:rounded-2xl before:border before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100">
                  <div className="relative flex items-start gap-6">
                    <div className="bg-background/80 border-primary/30 rounded-xl border p-4">
                      <contact.icon className="text-primary size-8 md:size-10" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-foreground/90 text-xl font-semibold md:text-2xl">
                        {contact.title}
                      </p>
                      <p className="text-foreground/70 leading-relaxed md:text-lg">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUpOnScroll>
            ))}
          </div>
        </div>
      </div>
    </FadeUpOnScroll>
  );
}
