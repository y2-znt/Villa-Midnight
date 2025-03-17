import { z } from "zod";

export const createUserSchema = z
  .object({
    username: z.string().min(3, {
      message: "Le nom d'utilisateur doit comporter au moins 3 caractères",
    }),
    email: z
      .string()
      .min(1, { message: "L'email est requis" })
      .email({ message: "Adresse email invalide" }),
    role: z.enum(["USER", "ADMIN"]),
    password: z
      .string()
      .min(1, { message: "Le mot de passe est requis" })
      .min(8, "Le mot de passe doit comporter au moins 8 caractères")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule",
      )
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule",
      )
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractère spécial",
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Veuillez confirmer votre mot de passe" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const editUserSchema = z.object({
  username: z.string().min(3, {
    message: "Le nom d'utilisateur doit comporter au moins 3 caractères",
  }),
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Adresse email invalide" }),
  role: z.enum(["USER", "ADMIN"]),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type EditUserSchema = z.infer<typeof editUserSchema>;
