import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { deleteUser, updateUser } from "../api/userApi";
import AvatarSection from "../components/shared/AvatarSection";
import DeleteAccount from "../components/shared/DeleteAccount";
import AvatarSectionSkeleton from "../components/shared/skeletons/AvatarSectionSkeleton";
import ProfileInfoSkeleton from "../components/shared/skeletons/ProfileInfoSkeleton";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { UserUpdateType } from "../types/types";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<UserUpdateType>();
  const { token } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    if (authUser) {
      setValue("username", authUser.user.username);
      setIsLoading(false);
    }
  }, [authUser, setValue]);

  const onSubmit = async (data: UserUpdateType) => {
    if (!authUser?.user?.id) {
      console.error("User is not authenticated.");
      return;
    }

    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      setIsSaving(true);
      console.log("Saving user data:", data);
      await updateUser(authUser.user.id, { username: data.username }, token);
      setAuthUser((prev) => ({
        ...prev,
        user: {
          ...prev!.user,
          username: data.username || "",
        },
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    const userId = authUser?.user?.id;
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      setIsLoading(true);
      await deleteUser(userId, token);
      localStorage.removeItem("token");
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setAuthUser((prev) => ({
      ...prev!,
      user: {
        ...prev!.user,
        avatarUrl: newAvatarUrl,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Title text="MON" highlight="PROFIL" />
        <div className="mt-16 md:mt-4 flex flex-col items-center">
          <AvatarSectionSkeleton />
          <ProfileInfoSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-16 md:mt-4 flex flex-col items-center">
        {authUser && (
          <AvatarSection
            avatarUrl={authUser.user.avatarUrl || null}
            username={authUser.user.username}
            onAvatarUpdate={handleAvatarUpdate}
          />
        )}
        <div className="space-y-4 w-full max-w-md">
          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md w-full space-y-4"
            >
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Nom d'utilisateur
                </Label>
                <Input
                  type="text"
                  className="border border-primary"
                  {...register("username")}
                  disabled={isSaving}
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : (
                  <CheckIcon className="h-5 w-5 mr-2" />
                )}
                Sauvegarder
              </Button>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label className="text-sm text-muted-foreground">
                  Nom d'utilisateur
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
            <Label className="text-sm text-muted-foreground">Email</Label>
            <p className="text-lg font-medium">{authUser?.user.email}</p>

            <Label className="text-sm text-muted-foreground">
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
        <DeleteAccount handleDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
}
