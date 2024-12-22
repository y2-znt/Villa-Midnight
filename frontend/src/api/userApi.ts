import { API_BASE_URL } from "../config/apiClient";

export const fetchUserById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }

  const data = await response.json();
  return data;
};
