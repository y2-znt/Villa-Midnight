import { API_BASE_URL } from "../config/apiClient";
import { EnigmaSchema } from "../schemas/enigmaSchema";

export const fetchAllEnigmas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/enigmas`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la récupération des énigmes"
      );
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des énigmes:", error);
    throw error;
  }
};

export const fetchEnigmaById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enigmas/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la récupération de l'énigme"
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'énigme:", error);
    throw error;
  }
};

export const createEnigma = async (enigma: EnigmaSchema) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enigmas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(enigma),
    });

    if (response.ok) {
      console.log("Énigme créée avec succès");
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création de l'énigme"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'énigme:", error);
    throw error;
  }
};
