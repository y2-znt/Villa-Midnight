"use client";
import { getToken } from "@/config/config";
import { useAuthContext } from "@/context/authContext";
import { updateUserAvatar } from "@/lib/api/userApi";
import { Camera, CheckIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
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
  const { authUser } = useAuthContext();
  const token = getToken();

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
        token,
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
    <div className="group relative mb-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {avatarPreview ? (
        <div className="relative">
          <Image
            src={avatarPreview}
            alt="Profile"
            className={`border-input hover:border-primary h-32 w-32 transform cursor-pointer overflow-hidden rounded-full border-4 transition-transform duration-300 hover:scale-105 ${
              isUpdatingAvatar ? "opacity-50" : ""
            }`}
            width={128}
            height={128}
            onClick={handleAvatarClick}
          />
          {isUploadingAvatar && (
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 transform gap-2">
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
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          className="border-primary bg-primary/10 hover:border-primary flex h-32 w-32 transform cursor-pointer items-center justify-center rounded-full border-4 transition-transform duration-300 hover:scale-105"
          onClick={handleAvatarClick}
        >
          <span className="text-primary text-4xl font-bold">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      {!isUploadingAvatar && !isUpdatingAvatar && (
        <Button
          size="icon"
          variant="outline"
          className="absolute -right-0 -bottom-0 transform rounded-full transition-transform duration-300 group-hover:scale-110 hover:scale-110"
          onClick={handleAvatarClick}
        >
          <Camera />
        </Button>
      )}
    </div>
  );
}
