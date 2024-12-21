import { EnigmaSchema } from "../schemas/enigmaSchema";

const API_URL = "http://localhost:4000/api/enigmas";

export const fetchAllEnigmas = async () => {
  try {
    const response = await fetch(API_URL);
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

export const createEnigma = async (enigma: EnigmaSchema) => {
  try {
    const response = await fetch(API_URL, {
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
