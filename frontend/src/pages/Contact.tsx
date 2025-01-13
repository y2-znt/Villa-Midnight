import Title from "../components/ui/title";
import { contactList } from "../data/data";

export default function Contact() {
  return (
    <div className="flex flex-col items-center">
      <Title text="REJOIGNEZ" highlight="NOUS" />
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactList.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-4 transition-transform transform hover:scale-105"
          >
            <contact.icon className="text-primary size-8 md:size-10" />

            <div className="flex flex-col gap-x-4 md:text-xl">
              <p>{contact.title}</p>
              <p>{contact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
