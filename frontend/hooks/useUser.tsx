import { getToken } from "@/config/config";
import { fetchEnigmasByUserId } from "@/lib/api/enigmaApi";
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "@/lib/api/userApi";
import { CreateUserType, UserApiResponse, UserUpdateType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUsers = () => {
  const token = getToken();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await fetchAllUsers();
      const usersWithEnigmas = await Promise.all(
        users.map(async (user: UserApiResponse) => {
          const enigmas = await fetchEnigmasByUserId(user.id, token || "");
          return { ...user, enigmas };
        }),
      );
      return usersWithEnigmas;
    },
    enabled: !!token,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const createUserMutation = useMutation({
    mutationFn: async (data: CreateUserType) => {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await createUser(data, token);
      return response;
    },
    onMutate: () => {
      const toastId = toast.loading("Création de l'utilisateur en cours...");
      return { toastId };
    },
    onSuccess: (response, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Utilisateur créé avec succès ! 🎉");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la création de l'utilisateur");
      console.error("Erreur lors de la création de l'utilisateur:", error);
    },
  });

  return {
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
  };
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const token = getToken();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserUpdateType) => {
      if (!token) {
        throw new Error("No token found");
      }
      return await updateUser(id, data, token);
    },
    onMutate: () => {
      const toastId = toast.loading(
        "Modification de l'utilisateur en cours...",
      );
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Utilisateur modifié avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la modification de l'utilisateur");
      console.error("Erreur lors de la modification de l'utilisateur:", error);
    },
  });
  return {
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
  };
};

export const useDeleteUser = (
  setAuthUser?: (user: UserApiResponse | null) => void,
) => {
  const queryClient = useQueryClient();
  const token = getToken();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        throw new Error("No token found");
      }
      return await deleteUser(id, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Suppression de l'utilisateur en cours...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      if (setAuthUser) {
        setAuthUser(null);
      }

      toast.success("Utilisateur supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la suppression de l'utilisateur");
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    },
  });

  return {
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};
