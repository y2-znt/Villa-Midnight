import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../api/authApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Title from "../components/ui/title";
import { useAuthContext } from "../contexts/AuthContext";
import { SigninSchema } from "../schemas/authSchema";

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
      const { user, token } = await loginUser(data.email, data.password);
      setAuthUser({ ...user, token });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Email ou mot de passe incorrect");
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
        <p className="text-center">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="text-primary">
            Créez un compte
          </Link>
        </p>
      </form>
    </div>
  );
}
