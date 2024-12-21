export type EnigmaType = {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: number;
  numberOfParticipants: number;
  numberOfHours: number;
  createdAt: string;
  updatedAt: string;
};

export type AuthUserType = {
  id: number;
  username: string;
  email: string;
};
