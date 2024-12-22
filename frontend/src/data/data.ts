import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { ContactTypes } from "../types/types";

export const contactList: ContactTypes[] = [
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

export const FAQData = [
  {
    value: "item-1",
    question: "Comment participer aux énigmes ?",
    answer:
      "Vous pouvez rejoindre une énigme en sélectionnant l'une des missions disponibles. Une fois sélectionnée, suivez les instructions pour commencer votre aventure.",
  },
  {
    value: "item-2",
    question:
      "Est-ce que la villa Midnight est adaptée aux personnes à mobilité réduite ?",
    answer:
      "Oui, la villa Midnight est adaptée aux personnes à mobilité réduite. Nous avons pris en compte les besoins de nos utilisateurs pour rendre l'expérience la plus accessible possible.",
  },
  {
    value: "item-3",
    question: "Puis-je proposer des énigmes ?",
    answer:
      "Bien sûr ! Toute idée est la bienvenue. Nous vous aiderons à rendre votre énigme captivante et bien structurée.",
  },
  {
    value: "item-4",
    question: "Combien de temps dure une énigme ?",
    answer:
      "La durée dépend de l'énigme sélectionnée. Chaque mission indique un temps moyen nécessaire pour sa résolution.",
  },
];

export const servicesFooter = [
  { name: "Team Building", link: "/faq" },
  { name: "Anniversaire", link: "/faq" },
  { name: "Bon cadeau", link: "/faq" },
];

export const contactFooter = [
  {
    icon: MapPin,
    title: "5 Rue des Écrivains, 44000, Nantes",
  },
  {
    icon: Phone,
    title: "02 99 99 99 99",
  },
  {
    icon: Mail,
    title: "contact@villamidnight.com",
  },
];

export const informationsFooter = [
  {
    name: "Foire aux questions",
    link: "/faq",
    ariaLabel: "Aller à la page de la foire aux questions",
  },
  {
    name: "Mentions légales",
    link: "/mentions",
    ariaLabel: "Aller à la page des mentions légales",
  },
  {
    name: "Conditions générales de vente",
    link: "/cgv",
    ariaLabel: "Aller à la page des conditions générales de ventes",
  },
];
