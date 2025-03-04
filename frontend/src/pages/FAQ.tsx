import FadeOnScroll from "../components/animations/FadeOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import Title from "../components/ui/title";
import { FAQData } from "../data/data";

export default function FAQ() {
  return (
    <FadeOnScroll delay={0}>
      <div className="flex flex-col items-center">
        <Title text="FOIRE AUX" highlight="QUESTIONS" />
        <div className="flex justify-center mx-auto flex-col w-2/3 my-28 max-md:w-full">
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
