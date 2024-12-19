import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import Title from "../components/ui/title";
import { FAQData } from "../data.json";

export default function FAQ() {
  return (
    <div className="mt-10 md:mt-28">
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
  );
}
