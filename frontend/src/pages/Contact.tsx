import { Calendar, LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import Title from "../components/ui/title";

type ContactTypes = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function Contact() {
  const contactList: ContactTypes[] = [
    {
      icon: Calendar,
      title: "7 jours / 7",
      description: "De 10h à 00h",
    },
    {
      icon: Phone,
      title: "Téléphone",
      description: "02 99 99 99 99",
    },
    {
      icon: MapPin,
      title: "5 Rue des Écrivains",
      description: "44000 Nantes",
    },
    {
      icon: Mail,
      title: "Email",
      description: "villamidnight@gmail.com",
    },
  ];

  return (
    <div className="mt-10 md:mt-28 flex flex-col items-center">
      <Title text="REJOIGNEZ" highlight="NOUS" />
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactList.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-4 transition-transform transform hover:scale-105"
          >
            <contact.icon className="text-primary size-10" />

            <div className="flex flex-col gap-x-4 text-xl">
              <p>{contact.title}</p>
              <p>{contact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
