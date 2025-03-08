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
  };
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
