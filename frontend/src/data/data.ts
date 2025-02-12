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

export const fakeAdminEnigmas = [
  {
    id: "1",
    userId: "1",
    title: "L’Ombre Rouge",
    description:
      "Une silhouette sombre surgit du brouillard écarlate, laissant derrière elle une énigme non résolue. Un message crypté se cache dans la brume, un secret oublié que seuls les esprits les plus aiguisés sauront percer. Qui est-il ? Pourquoi est-il venu ? Et surtout… que cache-t-il ? ",
    image: "https://podmust.com/wp-content/uploads/podcasts-horreur.jpg",
    difficulty: "ONE",
    numberOfParticipants: 2,
    numberOfHours: 1,
    createdAt: "2024-12-21T08:27:08.044Z",
    updatedAt: "2024-12-22T14:31:46.081Z",
    createdBy: {
      username: "𝕏: @y2_dev",
    },
  },
  {
    id: "2",
    userId: "1",
    title: "Les Masques de Vérité",
    description:
      "Quatre hommes masqués mystérieux sont alignés. Chacun raconte une version différente d'une même histoire, un seul dit la vérité.Un signal d’urgence clignote en morse. Décoder le signal mène à une pièce secrète dans la station.",
    image:
      "https://chaslescorp.com/wp-content/uploads/2023/02/18413-redeyes-hackers-use-new-malware-to-steal-data-from-windows-phones.jpg",
    difficulty: "TWO",
    numberOfParticipants: 2,
    numberOfHours: 1,
    createdAt: "2024-12-21T08:27:08.044Z",
    updatedAt: "2024-12-22T14:31:46.081Z",
    createdBy: {
      username: "𝕏: @y2_dev",
    },
  },
  {
    id: "3",
    userId: "1",
    title: "Les Couloirs du Silence",
    description:
      "Le bureau du médecin-chef est fermé. Un journal intime laissé dans la salle d’attente contient des indices pour trouver la clé.Un signal d’urgence clignote en morse. Décoder le signal mène à une pièce secrète dans la station.",
    image:
      "https://i.pinimg.com/736x/a2/32/5b/a2325b2f81e4760b9fabd3312ce1a531.jpg",
    difficulty: "THREE",
    numberOfParticipants: 3,
    numberOfHours: 1,
    createdAt: "2024-12-21T08:56:30.321Z",
    updatedAt: "2025-01-17T12:33:43.706Z",
    createdBy: {
      username: "𝕏: @y2_dev",
    },
  },
];
