import { z } from "zod";

export const enigmaSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  difficulty: z
    .number()
    .min(1, "La difficulté doit être au moins 1")
    .max(3, "La difficulté ne doit pas dépasser 3"),
  image: z.string().url("L'image doit être une URL valide"),
  numberOfParticipants: z
    .number()
    .min(2, "Le nombre de participants doit être d'au moins 2"),
  numberOfHours: z.number().min(1, "Le nombre d'heures doit être d'au moins 1"),
});

export type EnigmaSchema = z.infer<typeof enigmaSchema>;
