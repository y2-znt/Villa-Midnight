import { API_BASE_URL, getToken } from "@/config/config";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });

  if (response.ok) {
    console.log("Inscription réussie");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l'inscription");
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    console.log("Connexion réussie");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la connexion");
  }
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    console.log("Déconnexion réussie");
    localStorage.removeItem("token");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la déconnexion");
  }
};

export const fetchAuthUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.log("No token found");
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch user:", response.status);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching auth user:", error);
    throw error;
  }
};

export const googleAuth = async () => {
  window.location.href = `${API_BASE_URL}/auth/google`;
};
