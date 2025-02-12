import { z } from "zod";

export const enigmaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["ONE", "TWO", "THREE"]),
  image: z.string().url("Image must be a valid URL"),
  userId: z.string().min(1, "User ID is required"),
  numberOfParticipants: z
    .number()
    .min(2, "Number of participants must be at least 2"),
  numberOfHours: z.number().min(1, "Number of hours must be at least 1"),
});
