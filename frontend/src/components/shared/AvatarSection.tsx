import { Camera, CheckIcon, Loader2, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { updateUserAvatar } from "../../api/userApi";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "../ui/button";
import AvatarSectionSkeleton from "./skeletons/AvatarSectionSkeleton";

interface AvatarSectionProps {
  avatarUrl: string | null;
  username: string;
  onAvatarUpdate: (newAvatarUrl: string) => void;
  isLoading?: boolean;
}

export default function AvatarSection({
  avatarUrl,
  username,
  onAvatarUpdate,
  isLoading = false,
}: AvatarSectionProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authUser, token } = useAuthContext();

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

      onAvatarUpdate(response.avatarUrl);
      setIsUploadingAvatar(false);
      setAvatarPreview(response.avatarUrl);
      toast.success("Avatar mis à jour avec succès !");
    } catch (error) {
      console.error("Failed to update avatar:", error);
      toast.error("Erreur lors de la mise à jour de l'avatar.");
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const cancelAvatarUpdate = () => {
    setAvatarPreview(avatarUrl);
    setIsUploadingAvatar(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return <AvatarSectionSkeleton />;
  }

  return (
    <div className="mb-8 relative group">
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
            className={`w-32 h-32 rounded-full overflow-hidden border-4 border-input transition-transform duration-300 transform hover:scale-105 hover:border-primary cursor-pointer ${
              isUpdatingAvatar ? "opacity-50" : ""
            }`}
            onClick={handleAvatarClick}
          />
          {isUploadingAvatar && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={cancelAvatarUpdate}
                className="rounded-full"
                disabled={isUpdatingAvatar}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="tertiary"
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
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      {!isUploadingAvatar && !isUpdatingAvatar && (
        <Button
          size="icon"
          variant="outline"
          className="absolute -bottom-0 -right-0 rounded-full transition-transform duration-300 transform hover:scale-110 group-hover:scale-110"
          onClick={handleAvatarClick}
        >
          <Camera />
        </Button>
      )}
    </div>
  );
}
