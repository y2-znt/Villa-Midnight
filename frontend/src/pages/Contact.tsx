import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Title from "../components/ui/title";
import { contactList } from "../data/data";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 pointer-events-none" />

      <Title text="ENTREZ DANS" highlight="L'AVENTURE" />

      <div className="mt-20 w-full max-w-5xl px-4" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactList.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background/50 backdrop-blur-sm rounded-2xl p-8 border  transition-all hover:before:opacity-100 before:opacity-0 before:absolute before:inset-0 before:rounded-2xl before:border before:border-primary before:transition-all before:duration-300"
            >
              <div className="relative flex items-start gap-6">
                <div className="p-4 rounded-xl bg-background/80 border border-primary/30">
                  <contact.icon className="text-primary size-8 md:size-10" />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl md:text-2xl font-semibold text-foreground/90">
                    {contact.title}
                  </p>
                  <p className="text-foreground/70 md:text-lg leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
