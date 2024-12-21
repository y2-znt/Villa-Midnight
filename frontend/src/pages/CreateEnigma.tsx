import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createEnigma } from "../api/enigmaApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Title from "../components/ui/title";
import { useAuthContext } from "../contexts/AuthContext";
import { EnigmaSchema } from "../schemas/enigmaSchema";

// TODO: add zodresolver to the form, (bug with the id of the enigma)

export default function CreateEnigma() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnigmaSchema>();

  const onSubmit = async (data: EnigmaSchema) => {
    try {
      if (!authUser || !authUser.user?.id) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      const enigmaData: EnigmaSchema = {
        ...data,
        userId: authUser.user.id,
      };

      await createEnigma(enigmaData);
      navigate("/all-enigmas");
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
          <Input
            type="text"
            placeholder="Titre"
            {...register("title", { required: "Le titre est requis" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            placeholder="Description"
            {...register("description", {
              required: "La description est requise",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulté</Label>
          <Input
            type="number"
            placeholder="Difficulté"
            {...register("difficulty", {
              valueAsNumber: true,
              required: "La difficulté est requise",
              min: {
                value: 1,
                message: "La difficulté doit être d'au moins 1",
              },
            })}
          />
          {errors.difficulty && (
            <p className="text-red-500">{errors.difficulty.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            type="text"
            placeholder="Image"
            {...register("image", {
              required: "L'image est requise",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "L'image doit être une URL valide",
              },
            })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="numberOfParticipants">Nombre de participants</Label>
          <Input
            type="number"
            placeholder="Nombre de participants"
            {...register("numberOfParticipants", {
              valueAsNumber: true,
              required: "Le nombre de participants est requis",
              min: {
                value: 2,
                message: "Le nombre de participants doit être d'au moins 2",
              },
            })}
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
            placeholder="Nombre d'heures"
            {...register("numberOfHours", {
              valueAsNumber: true,
              required: "Le nombre d'heures est requis",
              min: {
                value: 1,
                message: "Le nombre d'heures doit être d'au moins 1",
              },
            })}
          />
          {errors.numberOfHours && (
            <p className="text-red-500">{errors.numberOfHours.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Créer
        </Button>
      </form>
    </div>
  );
}
