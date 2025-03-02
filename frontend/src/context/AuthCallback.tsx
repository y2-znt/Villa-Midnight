import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { API_BASE_URL } from "../config/apiClient";
import { useAuthContext } from "../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        localStorage.setItem("token", token);
        const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setAuthUser({ user: data.user });
        toast.success("Connexion réussie ! 🎉", { id: "success-toast" });
        navigate("/");
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        toast.error("Erreur lors de la récupération des données utilisateur.");
        navigate("/auth/error");
      }
    };

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      fetchUserData(token);
    } else {
      console.error("❌ Aucun token trouvé");
      toast.error("Aucun token trouvé.");
      navigate("/auth/error");
    }
  }, [setAuthUser, navigate]);

  return <p>Connexion en cours...</p>;
};

export default AuthCallback;
