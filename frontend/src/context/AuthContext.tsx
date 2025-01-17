import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { API_BASE_URL } from "../config/apiClient";
import { AuthUserType } from "../types/types";

type AuthContextType = {
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {
    throw new Error("setAuthUser not implemented");
  },
  isLoading: false,
  error: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("User not authenticated or network error");
        }

        const data: AuthUserType = await response.json();
        if (data && data.user.id) {
          setAuthUser(data);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
        setAuthUser(null);
        setError("Erreur lors de la récupération de l'utilisateur");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, [location]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
