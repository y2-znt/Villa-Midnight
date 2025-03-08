"use client";
import AvatarSection from "@/components/shared/AvatarSection";
import DeleteAccount from "@/components/shared/DeleteAccount";
import AvatarSectionSkeleton from "@/components/shared/skeletons/AvatarSectionSkeleton";
import ProfileInfoSkeleton from "@/components/shared/skeletons/ProfileInfoSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Title from "@/components/ui/title";
import { getToken } from "@/config/config";
import { useAuthContext } from "@/context/authContext";
import { useDeleteUserProfile, useUpdateUserProfile } from "@/hooks/useProfile";
import { UserUpdateType } from "@/types/types";
import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm<UserUpdateType>();
  const token = getToken();

  const { updateUser, isUpdating } = useUpdateUserProfile(setAuthUser);
  const { deleteUser, isDeleting } = useDeleteUserProfile();

  useEffect(() => {
    if (authUser) {
      setValue("username", authUser.user.username);
      setIsLoading(false);
    }
  }, [authUser, setValue]);

  const onSubmit = async (data: UserUpdateType) => {
    if (!authUser?.user?.id || !token) {
      console.error("User is not authenticated or token is not available.");
      return;
    }

    updateUser({
      id: authUser.user.id,
      data: { username: data.username },
      token,
    });
    setIsEditing(false);
  };

  const handleDeleteUser = async () => {
    const userId = authUser?.user?.id;
    if (!userId || !token) {
      console.error("User is not authenticated or token is not available.");
      return;
    }

    deleteUser({ id: userId, token });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Title text="MON" highlight="PROFIL" />
        <div className="mt-16 flex flex-col items-center md:mt-4">
          <AvatarSectionSkeleton />
          <ProfileInfoSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-16 flex flex-col items-center md:mt-4">
        {authUser && (
          <AvatarSection
            avatarUrl={authUser.user.avatarUrl || null}
            username={authUser.user.username}
            onAvatarUpdate={() => {}}
          />
        )}
        <div className="w-full max-w-md space-y-4">
          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-4"
            >
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">
                  Nom d&apos;utilisateur
                </Label>
                <Input
                  type="text"
                  className="border-primary border"
                  {...register("username")}
                  disabled={isUpdating}
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <CheckIcon className="mr-2 h-5 w-5" />
                )}
                Sauvegarder
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <Label className="text-muted-foreground text-sm">
                  Nom d&apos;utilisateur
                </Label>
                <p className="text-lg font-medium">{authUser?.user.username}</p>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="icon"
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground text-sm">Email</Label>
            <p className="text-lg font-medium">{authUser?.user.email}</p>

            <Label className="text-muted-foreground text-sm">
              Membre depuis le
            </Label>
            <p className="text-lg font-medium">
              {authUser?.user.createdAt &&
                new Date(authUser.user.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <DeleteAccount
          handleDeleteUser={handleDeleteUser}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
