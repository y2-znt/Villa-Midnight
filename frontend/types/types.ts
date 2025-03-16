import { LucideIcon } from "lucide-react";

export type EnigmaType = {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  userId: string;
  numberOfParticipants: number;
  numberOfHours: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: {
    username: string;
  };
};

export type AuthUserType = {
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string | null;
    createdAt?: string;
    role: "ADMIN" | "USER";
  };
};

export type UserApiResponse = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  googleId?: string | null;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "USER";
  enigmas: EnigmaType[];
};
export type ContactTypes = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type UserUpdateType = {
  username?: string;
  email?: string;
};

export type CreateUserType = {
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};

type FormDataValue = string | number | File | boolean | null | undefined;

export const convertToFormData = <T extends Record<string, FormDataValue>>(
  data: T,
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  return formData;
};

export type NavItemType = {
  href: string;
  icon: LucideIcon;
  label: string;
};
