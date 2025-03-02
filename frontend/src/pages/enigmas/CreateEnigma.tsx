import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Hourglass, LoaderCircle, Users, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createEnigma } from "../../api/enigmaApi";
import DifficultySelect from "../../components/shared/DifficultySelect";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Title from "../../components/ui/title";
import { useAuthContext } from "../../context/AuthContext";
import { EnigmaSchema, enigmaSchema } from "../../schemas/enigmaSchema";

export default function CreateEnigma() {
  const { authUser, token } = useAuthContext();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnigmaSchema>({
    resolver: zodResolver(enigmaSchema),
  });

  const onSubmit = async (data: EnigmaSchema) => {
    if (!authUser || !authUser.user || !authUser.user.id || !token) {
      toast.error("Vous devez être connecté pour créer une énigme");
      return;
    }

    try {
      console.log("Submitting data:", data);
      await createEnigma(data, token);
      toast.success("Énigme créée avec succès ! 🎉");
      navigate("/my-enigmas");
    } catch (error) {
      console.error("Erreur lors de la création de l'énigme:", error);
      toast.error("Erreur lors de la création de l'énigme.");
    }
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
      'input[type="file"]'
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
        className="mx-auto space-y-4 w-11/12 md:w-1/2 mt-10"
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
              className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-52 h-28 object-cover rounded-lg mb-4"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="numberOfParticipants">Nombre de participants</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
            <Label htmlFor="numberOfHours">Nombre d'heures</Label>
            <div className="relative">
              <Hourglass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
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
