import { API_BASE_URL } from "../config/apiClient";
import { UserUpdateType } from "../types/types";

export const fetchUserById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }

  const data = await response.json();
  return data;
};

export const updateUser = async (id: string, user: UserUpdateType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
  return response.json();
};
