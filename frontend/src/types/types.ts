import { LucideIcon } from "lucide-react";

export type EnigmaType = {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: "ONE" | "TWO" | "THREE";
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
