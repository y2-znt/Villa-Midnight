import { API_BASE_URL, getToken } from "@/config/config";
import { UserUpdateType } from "@/types/types";

export const fetchUserById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  user: UserUpdateType,
  token: string,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export const deleteUser = async (id: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }

    if (response.status === 204) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};

export const updateUserAvatar = async (
  id: string,
  file: File,
  token: string,
) => {
  try {
    const formData = new FormData();
    formData.append("avatarUrl", file);

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'avatar");
    }

    return response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avatar:", error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
