"use client";
import DifficultySelect from "@/components/shared/DifficultySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/ui/title";
import { getToken } from "@/config/config";
import { useAuthContext } from "@/context/authContext";
import { useCreateEnigma } from "@/hooks/useEnigma";
import { EnigmaSchema, enigmaSchema } from "@/schemas/enigmaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Hourglass, LoaderCircle, Users, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateEnigma() {
  const { authUser } = useAuthContext();
  const { createEnigma, isCreating } = useCreateEnigma();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EnigmaSchema>({
    resolver: zodResolver(enigmaSchema),
  });

  const onSubmit = async (data: EnigmaSchema) => {
    const token = getToken();
    if (!authUser || !authUser.user || !authUser.user.id || !token) {
      toast.error("Vous devez être connecté pour créer une énigme");
      return;
    }

    createEnigma({ data, token });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setValue("image", null);
    setImagePreview(null);
    toast.info("Image supprimée.");
  };

  return (
    <div>
      <Title text="Créez votre" highlight="énigme" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 w-11/12 space-y-4 md:w-1/2"
      >
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input type="text" {...register("title")} placeholder="Titre" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea {...register("description")} placeholder="Description" />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulté</Label>
          <DifficultySelect
            onChange={(value) =>
              setValue("difficulty", value as EnigmaSchema["difficulty"])
            }
          />
          {errors.difficulty && (
            <p className="text-red-500">{errors.difficulty.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <div className="mt-2 flex items-center gap-4">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
            />
            {imagePreview && (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="mb-4 h-28 w-52 rounded-lg object-cover"
                  width={208}
                  height={104}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute -top-2 -right-2 rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="numberOfParticipants">Nombre de participants</Label>
            <div className="relative">
              <Users className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="number"
                {...register("numberOfParticipants", { valueAsNumber: true })}
                placeholder="Nombre de participants"
                className="pl-10"
              />
              {errors.numberOfParticipants && (
                <p className="text-red-500">
                  {errors.numberOfParticipants.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="numberOfHours">Nombre d&apos;heures</Label>
            <div className="relative">
              <Hourglass className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="number"
                {...register("numberOfHours", { valueAsNumber: true })}
                placeholder="Nombre d'heures"
                className="pl-10"
              />
              {errors.numberOfHours && (
                <p className="text-red-500">{errors.numberOfHours.message}</p>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isCreating}>
          {isCreating ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            "Créer"
          )}
        </Button>
      </form>
    </div>
  );
}
