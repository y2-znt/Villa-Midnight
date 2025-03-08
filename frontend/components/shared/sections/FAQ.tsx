import FadeOnScroll from "@/components/animations/FadeOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Title from "@/components/ui/title";
import { FAQData } from "@/data/data";

export default function FAQ() {
  return (
    <FadeOnScroll delay={0}>
      <div className="flex flex-col items-center">
        <Title text="FOIRE AUX" highlight="QUESTIONS" />
        <div className="mx-auto my-28 flex w-2/3 flex-col justify-center max-md:w-full">
          <Accordion type="single" collapsible className="w-full">
            {FAQData.map(({ value, question, answer }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </FadeOnScroll>
  );
}
