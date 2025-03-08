import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { fetchAuthUser } from "../lib/api/authApi";

export const useGoogleCallback = () => {
  const router = useRouter();
  const { setAuthUser } = useAuthContext();

  const googleCallbackMutation = useMutation({
    mutationFn: async (token: string) => {
      localStorage.setItem("token", token);
      const response = await fetchAuthUser();
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
      setAuthUser(data.user);
      toast.success("Connexion réussie! 🎉");
      router.push("/");
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      console.error("❌ Error during Google callback:", error);
      toast.error("Erreur lors de la connexion", {
        description: error.message || "Une erreur est survenue",
      });
      router.push("/login");
    },
  });

  return {
    handleGoogleCallback: googleCallbackMutation.mutate,
    isLoading: googleCallbackMutation.isPending,
  };
};
