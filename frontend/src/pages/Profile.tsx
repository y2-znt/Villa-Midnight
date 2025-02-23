import { Camera, CheckIcon, PencilIcon, X, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { deleteUser, updateUser, updateUserAvatar } from "../api/userApi";
import DeleteAccount from "../components/shared/DeleteAccount";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { UserUpdateType } from "../types/types";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<UserUpdateType>();
  const { token } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    if (authUser) {
      setValue("username", authUser.user.username);
      setAvatarPreview(authUser.user.avatarUrl || null);
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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setIsUploadingAvatar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!authUser?.user?.id || !token || !fileInputRef.current?.files?.[0]) {
      return;
    }

    try {
      setIsUpdatingAvatar(true);
      const response = await updateUserAvatar(
        authUser.user.id,
        fileInputRef.current.files[0],
        token
      );

      setAuthUser((prev) => ({
        ...prev!,
        user: {
          ...prev!.user,
          avatarUrl: response.avatarUrl,
        },
      }));
      setIsUploadingAvatar(false);
      setAvatarPreview(response.avatarUrl);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const cancelAvatarUpdate = () => {
    setAvatarPreview(authUser?.user.avatarUrl || null);
    setIsUploadingAvatar(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-32 w-32 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-16 md:mt-4 flex flex-col items-center">
        <div className="mb-8 relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {avatarPreview ? (
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Profile"
                className={`w-32 h-32 rounded-full overflow-hidden border-4 border-muted-foreground transition-transform duration-300 transform hover:scale-105 hover:border-primary cursor-pointer ${
                  isUpdatingAvatar ? "opacity-50" : ""
                }`}
                onClick={handleAvatarClick}
              />
              {isUploadingAvatar && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={cancelAvatarUpdate}
                    className="rounded-full"
                    disabled={isUpdatingAvatar}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="default"
                    onClick={handleAvatarUpdate}
                    className="rounded-full"
                    disabled={isUpdatingAvatar}
                  >
                    {isUpdatingAvatar ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-32 h-32 border-4 border-primary bg-primary/10 rounded-full transition-transform duration-300 transform hover:scale-105 hover:border-primary cursor-pointer"
              onClick={handleAvatarClick}
            >
              <span className="text-4xl font-bold text-primary">
                {authUser?.user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {!isUploadingAvatar && (
            <Button
              size="icon"
              className="absolute -bottom-0 -right-0 rounded-full"
              onClick={handleAvatarClick}
              disabled={isUpdatingAvatar}
            >
              <Camera />
            </Button>
          )}
        </div>
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
