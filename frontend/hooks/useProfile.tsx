import { getToken } from "@/config/config";
import {
  deleteUser,
  fetchUserById,
  updateUser,
  updateUserAvatar,
} from "@/lib/api/userApi";
import { AuthUserType, UserUpdateType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUserProfile = (id?: string) => {
  const token = getToken();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => (id && token ? fetchUserById(id, token) : null),
    enabled: !!id && !!token,
  });
};

export const useUpdateUserProfile = (
  setAuthUser?: (user: AuthUserType | null) => void,
) => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      token,
    }: {
      id: string;
      data: UserUpdateType;
      token: string;
    }) => {
      return await updateUser(id, data, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Mise à jour du profil en cours...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      if (setAuthUser) {
        const currentUser = queryClient.getQueryData<AuthUserType>([
          "authUser",
        ]);
        if (currentUser) {
          // Create updated user object
          const updatedUser = {
            ...currentUser,
            user: {
              ...currentUser.user,
              ...(variables.data.username && {
                username: variables.data.username,
              }),
              ...(variables.data.email && { email: variables.data.email }),
            },
          };
          // Update auth context
          setAuthUser(updatedUser);
        }
      }

      toast.success("Profil mis à jour avec succès !");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la mise à jour du profil");
      console.error("Erreur lors de la mise à jour du profil:", error);
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
  };
};

export const useUpdateUserAvatar = (
  setAuthUser?: (user: AuthUserType | null) => void,
) => {
  const queryClient = useQueryClient();

  const updateAvatarMutation = useMutation({
    mutationFn: async ({
      id,
      file,
      token,
    }: {
      id: string;
      file: File;
      token: string;
    }) => {
      return await updateUserAvatar(id, file, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Mise à jour de l'avatar en cours...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      // Update auth context if setAuthUser is provided
      if (setAuthUser && data.avatarUrl) {
        // Get current user data
        const currentUser = queryClient.getQueryData<AuthUserType>([
          "authUser",
        ]);
        if (currentUser) {
          // Create updated user object
          const updatedUser = {
            ...currentUser,
            user: {
              ...currentUser.user,
              avatarUrl: data.avatarUrl,
            },
          };
          // Update auth context
          setAuthUser(updatedUser);
        }
      }

      toast.success("Avatar mis à jour avec succès !");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la mise à jour de l'avatar");
      console.error("Erreur lors de la mise à jour de l'avatar:", error);
    },
  });

  return {
    updateAvatar: updateAvatarMutation.mutate,
    isUpdatingAvatar: updateAvatarMutation.isPending,
  };
};

export const useDeleteUserProfile = (
  setAuthUser?: (user: AuthUserType | null) => void,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return await deleteUser(id, token);
    },
    onMutate: () => {
      const toastId = toast.loading("Suppression du compte en cours...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      localStorage.removeItem("token");

      if (setAuthUser) {
        setAuthUser(null);
      }

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();

      toast.success("Compte supprimé avec succès");
      router.push("/");
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Erreur lors de la suppression du compte");
      console.error("Erreur lors de la suppression du compte:", error);
    },
  });

  return {
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
};
