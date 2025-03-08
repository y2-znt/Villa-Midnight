import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { loginUser, logoutUser, registerUser } from "../lib/api/authApi";

export const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await loginUser(data.email, data.password);
      return response;
    },
    onMutate: () => {
      const toastId = toast.loading("Connexion en cours...");
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Connecté avec succès ! 🎉");
      if (data.user) {
        setAuthUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        router.push("/");
      }
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      if (error.message === "User not found") {
        toast.error("Email ou mot de passe incorrect");
      } else if (error.message === "Invalid password") {
        toast.error("Mot de passe incorrect");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error("Erreur :", error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onMutate: () => {
      const toastId = toast.loading("Déconnexion en cours...");
      setAuthUser(null);
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Déconnecté avec succès");
      router.push("/");
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Échec de la déconnexion");
      console.error("Échec de la déconnexion :", error);
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending,
  };
};

export const useRegister = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await registerUser(
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
      );
      return response;
    },
    onMutate: () => {
      const toastId = toast.loading("Inscription en cours...");
      return { toastId };
    },
    onSuccess: (data, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Inscription réussie ! 🎉");
      if (data.user) {
        setAuthUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        router.push("/");
      }
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      if (error.message === "Email already exists") {
        toast.error("L'email existe déjà");
      } else if (error.message === "Validation error") {
        toast.error("Email ou mot de passe invalide");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    },
  });

  return {
    signUp: registerMutation.mutate,
    isLoading: registerMutation.isPending,
  };
};
