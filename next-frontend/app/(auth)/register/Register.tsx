"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/title";
import { googleAuth, registerUser } from "@/lib/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/context/authContext";
import { SignupSchema } from "@/schemas/authSchema";
import Image from "next/image";
import { useEffect } from "react";

export default function Register() {
  const { authUser, setAuthUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

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
      const response = await registerUser(
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
      );
      setAuthUser({ user: response.user });
      router.push("/");
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
        className="mx-auto mt-10 w-11/12 space-y-4 md:w-1/3"
      >
        <div>
          <Label htmlFor="username">Nom d&apos;utilisateur</Label>
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

      <p className="text-muted-foreground py-5 text-center text-sm font-medium">
        OU CONTINUER AVEC
      </p>

      <div className="flex justify-center">
        <Button
          onClick={googleAuth}
          size="lg"
          variant="outline"
          className="w-11/12 text-center md:w-1/3"
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
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="text-primary">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
