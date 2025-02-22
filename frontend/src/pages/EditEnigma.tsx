import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Hourglass, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { fetchEnigmaById, updateEnigma } from "../api/enigmaApi";
import DifficultySelect from "../components/shared/DifficultySelect";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { EnigmaSchema, enigmaSchema } from "../schemas/enigmaSchema";

export default function EditEnigma() {
  const { id } = useParams();
  const { authUser, token } = useAuthContext();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof enigmaSchema>>({
    resolver: zodResolver(enigmaSchema),
  });

  useEffect(() => {
    const fetchEnigma = async () => {
      if (id && token) {
        try {
          const data = await fetchEnigmaById(id, token);
          reset(data);
          setDifficulty(data.difficulty);
        } catch (error) {
          console.error("Erreur lors de la récupération de l'énigme:", error);
        }
      } else {
        console.error("Token is undefined or ID is missing");
      }
    };

    fetchEnigma();
  }, [id, reset, token]);

  const onSubmit = async (data: EnigmaSchema) => {
    if (!authUser?.user?.id || !token || !id) {
      console.error(
        "User not authenticated or invalid userId/token or enigma ID"
      );
      return;
    }

    const enigmaData = { ...data, userId: authUser.user.id };

    try {
      await updateEnigma(id, enigmaData, token);
      navigate("/my-enigmas");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'énigme:", error);
    }
  };

  return (
    <div>
      <Title text="Modifiez votre" highlight="énigme" />
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
          <Textarea
            {...register("description")}
            placeholder="Description"
            className="h-36"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulté</Label>
          <DifficultySelect
            value={difficulty}
            onChange={(value) => {
              setValue("difficulty", value as EnigmaSchema["difficulty"]);
              setDifficulty(value);
            }}
          />
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
          {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </form>
    </div>
  );
}
