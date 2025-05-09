import { z } from "zod";

export const enigmaSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  difficulty: z.enum(["ONE", "TWO", "THREE"]),
  image: z.union([
    z.instanceof(File, { message: "Le fichier doit être une image" }),
    z.string().url("L'image doit être une URL valide"),
    z.null(),
  ]),
  numberOfParticipants: z
    .number()
    .min(2, "Le nombre de participants doit être d'au moins 2"),
  numberOfHours: z.number().min(1, "Le nombre d'heures doit être d'au moins 1"),
});

export type EnigmaSchema = z.infer<typeof enigmaSchema>;
