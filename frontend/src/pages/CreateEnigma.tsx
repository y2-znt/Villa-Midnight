import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { createEnigma } from "../api/enigmaApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { EnigmaSchema, enigmaSchema } from "../schemas/enigmaSchema";

export default function CreateEnigma() {
  const { authUser, token } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof enigmaSchema>>({
    resolver: zodResolver(enigmaSchema),
  });

  const onSubmit = async (data: EnigmaSchema) => {
    if (!authUser || !authUser.user || !authUser.user.id || !token) {
      console.error("User not authenticated or invalid userId/token");
      return;
    }

    const enigmaData = {
      ...data,
      userId: authUser.user.id,
    };

    console.log("Enigma Data:", enigmaData);

    try {
      await createEnigma(enigmaData, token);
      navigate("/my-enigmas");
    } catch (error) {
      console.error("Erreur lors de la création de l'énigme:", error);
    }
  };

  return (
    <div>
      <Title text="Créez votre" highlight="énigme" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-4 w-11/12 md:w-1/3 mt-10"
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
          <Select
            onValueChange={(value) =>
              setValue("difficulty", value as EnigmaSchema["difficulty"])
            }
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Sélectionner une difficulté" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONE">1</SelectItem>
              <SelectItem value="TWO">2</SelectItem>
              <SelectItem value="THREE">3</SelectItem>
            </SelectContent>
          </Select>
          {errors.difficulty && (
            <p className="text-red-500">{errors.difficulty.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            type="text"
            {...register("image")}
            placeholder="URL de l'image"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="numberOfParticipants">Nombre de participants</Label>
          <Input
            type="number"
            {...register("numberOfParticipants", { valueAsNumber: true })}
            placeholder="Nombre de participants"
          />
          {errors.numberOfParticipants && (
            <p className="text-red-500">
              {errors.numberOfParticipants.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="numberOfHours">Nombre d'heures</Label>
          <Input
            type="number"
            {...register("numberOfHours", { valueAsNumber: true })}
            placeholder="Nombre d'heures"
          />
          {errors.numberOfHours && (
            <p className="text-red-500">{errors.numberOfHours.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Créer"}
        </Button>
      </form>
    </div>
  );
}
