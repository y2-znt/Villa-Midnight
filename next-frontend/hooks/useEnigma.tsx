import { getToken } from "@/config/config";
import {
  createEnigma,
  deleteEnigma,
  fetchEnigmaById,
  fetchEnigmasByUserId,
  updateEnigma,
} from "@/lib/api/enigmaApi";
import { EnigmaSchema } from "@/schemas/enigmaSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateEnigma = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createEnigmaMutation = useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: EnigmaSchema;
      token: string;
    }) => {
      return await createEnigma(data, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Création de l'énigme en cours...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Énigme créée avec succès ! 🎉");
      queryClient.invalidateQueries({ queryKey: ["enigmas"] });
      router.push("/my-enigmas");
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la création de l'énigme");
      console.error("Erreur lors de la création de l'énigme:", error);
    },
  });

  return {
    createEnigma: createEnigmaMutation.mutate,
    isCreating: createEnigmaMutation.isPending,
  };
};

export const useUpdateEnigma = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateEnigmaMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      token,
    }: {
      id: string;
      data: EnigmaSchema;
      token: string;
    }) => {
      return await updateEnigma(id, data, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Mise à jour de l'énigme en cours...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Énigme mise à jour avec succès ! 🎉");
      queryClient.invalidateQueries({ queryKey: ["enigmas"] });
      router.push("/my-enigmas");
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la mise à jour de l'énigme");
      console.error("Erreur lors de la mise à jour de l'énigme:", error);
    },
  });

  return {
    updateEnigma: updateEnigmaMutation.mutate,
    isUpdating: updateEnigmaMutation.isPending,
  };
};

export const useDeleteEnigma = () => {
  const queryClient = useQueryClient();

  const deleteEnigmaMutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return await deleteEnigma(id, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Suppression de l'énigme en cours...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Énigme supprimée avec succès !");
      queryClient.invalidateQueries({ queryKey: ["enigmas"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la suppression de l'énigme");
      console.error("Erreur lors de la suppression de l'énigme:", error);
    },
  });

  return {
    deleteEnigma: deleteEnigmaMutation.mutate,
    isDeleting: deleteEnigmaMutation.isPending,
  };
};

export const useEnigma = (id?: string) => {
  return useQuery({
    queryKey: ["enigma", id],
    queryFn: () => (id ? fetchEnigmaById(id) : null),
    enabled: !!id,
  });
};

export const useEnigmasByUserId = (userId?: string) => {
  const token = getToken();

  return useQuery({
    queryKey: ["enigmas", userId],
    queryFn: () => {
      if (!userId || !token) return null;
      return fetchEnigmasByUserId(userId, token);
    },
    enabled: !!userId && !!token,
  });
};
