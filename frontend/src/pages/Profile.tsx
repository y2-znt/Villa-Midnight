import { CheckIcon, PencilIcon, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { deleteUser, updateUser } from "../api/userApi";
import DeleteAccount from "../components/shared/DeleteAccount";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { UserUpdateType } from "../types/types";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<UserUpdateType>();
  const { token } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      setValue("username", authUser.user.username);
    }
  }, [authUser, setValue]);

  const onSubmit = async (data: UserUpdateType) => {
    if (!authUser?.user?.id) {
      console.error("User is not authenticated.");
      return;
    }

    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      console.log("Saving user data:", data);
      await updateUser(authUser.user.id, { username: data.username }, token);
      setAuthUser((prev) => ({
        ...prev,
        user: {
          ...prev!.user,
          username: data.username || "",
        },
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async () => {
    const userId = authUser?.user?.id;
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    if (!token) {
      console.error("Token is not available");
      return;
    }

    try {
      await deleteUser(userId, token);
      localStorage.removeItem("token");
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-16 md:mt-4 flex flex-col items-center">
        <div className="mb-8">
          {authUser?.user.avatarUrl ? (
            <img
              src={authUser.user.avatarUrl}
              alt="Profile"
              className="border-muted-foreground w-32 h-32 rounded-full overflow-hidden border-4 transition-transform duration-300 transform hover:scale-105 hover:border-primary"
            />
          ) : (
            <UserCircle2 className="size-32 text-muted-foreground" />
          )}
        </div>
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md w-full space-y-4"
          >
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Nom d'utilisateur
              </Label>
              <Input
                type="text"
                className="border border-primary"
                {...register("username")}
              />
            </div>
            <Button type="submit" variant="outline" className="w-full">
              <CheckIcon className="h-5 w-5 mr-2" />
              Sauvegarder
            </Button>
          </form>
        ) : (
          <div className="space-y-4 w-full max-w-md">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label className="text-sm text-muted-foreground">
                  Nom d'utilisateur
                </Label>
                <p className="text-lg font-medium">{authUser?.user.username}</p>
              </div>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="icon"
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="text-lg font-medium">{authUser?.user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <DeleteAccount handleDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
}
