import { API_BASE_URL } from "@/config/config";
import { EnigmaSchema } from "@/schemas/enigmaSchema";
import { convertToFormData } from "@/types/types";

export const fetchAllEnigmas = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enigmas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la récupération des énigmes",
      );
    }
    const data = await response.json();
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
        errorData.message || "Erreur lors de la récupération de l'énigme",
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'énigme:", error);
    throw error;
  }
};

export const createEnigma = async (enigma: EnigmaSchema, token: string) => {
  try {
    const formData = convertToFormData(enigma);

    const response = await fetch(`${API_BASE_URL}/enigmas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log("Énigme créée avec succès");
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création de l'énigme",
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'énigme:", error);
    throw error;
  }
};

export const updateEnigma = async (
  id: string,
  enigma: EnigmaSchema,
  token: string,
) => {
  try {
    const formData = convertToFormData(enigma);

    const response = await fetch(`${API_BASE_URL}/enigmas/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la mise à jour de l'énigme",
      );
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'énigme:", error);
    throw error;
  }
};

export const deleteEnigma = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enigmas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la suppression de l'énigme",
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'énigme:", error);
    throw error;
  }
};

export const fetchEnigmasByUserId = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/enigmas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          "Erreur lors de la récupération des énigmes de l'utilisateur",
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des énigmes de l'utilisateur:",
      error,
    );
    throw error;
  }
};
