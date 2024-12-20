const API_URL = "http://localhost:4000/api/auth";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });

  if (response.ok) {
    console.log("Inscription réussie");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l'inscription");
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    console.log("Connexion réussie");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la connexion");
  }
};
