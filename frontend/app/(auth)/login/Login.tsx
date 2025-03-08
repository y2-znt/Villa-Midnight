"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Title from "@/components/ui/title";
import { useAuthContext } from "@/context/authContext";
import { useLogin } from "@/hooks/useAuth";
import { googleAuth } from "@/lib/api/authApi";
import { SigninSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { authUser } = useAuthContext();
  const { login, isLoading } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = (data: SigninSchema) => {
    login(data);
  };

  return (
    <div>
      <Title text="Connectez" highlight="vous" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 w-11/12 space-y-4 md:w-1/3"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} disabled={isLoading} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-muted-foreground py-5 text-center text-sm font-medium">
        OU CONTINUER AVEC
      </p>

      <div className="flex justify-center">
        <Button
          onClick={googleAuth}
          size="lg"
          variant="outline"
          className="w-11/12 text-center md:w-1/3"
          disabled={isLoading}
        >
          <Image
            src="/assets/google-icon.png"
            alt="Google"
            className="size-5"
            width={20}
            height={20}
          />
          Google
        </Button>
      </div>

      <p className="mt-4 text-center">
        Vous n&apos;avez pas de compte ?{" "}
        <Link href="/register" className="text-primary">
          Créez un compte
        </Link>
      </p>
    </div>
  );
}
