import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { googleAuth, loginUser } from "../../api/authApi";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Title from "../../components/ui/title";
import { useAuthContext } from "../../context/AuthContext";
import { SigninSchema } from "../../schemas/authSchema";

export default function Login() {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninSchema) => {
    try {
      const response = await loginUser(data.email, data.password);
      setAuthUser({ user: response.user });
      toast.success("Connexion réussie ! 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Email ou mot de passe incorrect");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div>
      <Title text="Connectez" highlight="vous" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto space-y-4 w-11/12 md:w-1/3 mt-10"
      >
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Chargement..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-center text-sm font-medium py-5 text-muted-foreground">
        OU CONTINUER AVEC
      </p>

      <div className="flex justify-center ">
        <Button
          onClick={googleAuth}
          size="lg"
          variant="outline"
          className="w-11/12 md:w-1/3 text-center"
        >
          <img src="assets/google-icon.png" alt="Google" className="size-5" />
          Google
        </Button>
      </div>

      <p className="text-center mt-4">
        Vous n'avez pas de compte ?{" "}
        <Link to="/register" className="text-primary">
          Créez un compte
        </Link>
      </p>
    </div>
  );
}
