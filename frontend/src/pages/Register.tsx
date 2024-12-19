import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Title from "../components/ui/title";
import { SignupSchema } from "../schemas/authSchema";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      await registerUser(
        data.username,
        data.email,
        data.password,
        data.confirmPassword
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Title text="Inscrivez" highlight="vous" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-4 w-11/12 md:w-1/3 mt-10"
      >
        <div>
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input id="username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Chargement..." : "S'inscrire"}
        </Button>
      </form>
    </div>
  );
}
