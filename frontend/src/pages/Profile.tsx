import { CheckIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { deleteUser, updateUser } from "../api/userApi";
import DeleteAccount from "../components/shared/DeleteAccount";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
      setValue("email", authUser.user.email);
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
      await updateUser(authUser.user.id, data, token);
      setAuthUser((prev) => ({
        ...prev,
        user: {
          id: authUser.user.id,
          username: data.username || "",
          email: data.email || "",
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
    await deleteUser(userId, token);
    setAuthUser(null);
    navigate("/");
  };

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-16 md:mt-4">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <Input type="text" {...register("username")} />
            <Input type="email" {...register("email")} />
            <Button type="submit" variant="outline" className="mt-2">
              <CheckIcon className="h-5 w-5" />
            </Button>
          </form>
        ) : (
          <>
            <p className="text-lg font-medium">
              Nom d'utilisateur: {authUser?.user.username}
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="ml-2"
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
            </p>
            <p className="text-lg font-medium">Email: {authUser?.user.email}</p>
          </>
        )}
      </div>
      <DeleteAccount handleDeleteUser={handleDeleteUser} />
    </div>
  );
}
