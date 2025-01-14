import { CheckIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteUser, updateUser } from "../api/userApi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";
import { UserUpdateType } from "../types/types";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [user, setUser] = useState<UserUpdateType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setUser(authUser.user);
    }
  }, [authUser]);

  const handleUpdateUser = async () => {
    if (!authUser?.user?.id) {
      console.error("User is not authenticated.");
      return;
    }
    if (!user) {
      console.error("User data is not available.");
      return;
    }
    try {
      console.log("Saving user data:", user);
      await updateUser(authUser?.user?.id, user);
      setAuthUser((prev) => ({
        ...prev,
        user: {
          id: authUser.user.id,
          username: user.username || "",
          email: user.email || "",
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

    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );
    if (confirmDelete) {
      try {
        await deleteUser(userId);
        setAuthUser(null);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-4">
        {isEditing ? (
          <>
            <Input
              type="text"
              value={user?.username || ""}
              onChange={(e) => {
                if (user) {
                  console.log("Username input value:", e.target.value);
                  setUser((prevUser) => ({
                    ...prevUser,
                    username: e.target.value,
                  }));
                }
              }}
              className="text-lg font-medium"
            />
            <Input
              type="email"
              value={user?.email || ""}
              onChange={(e) => {
                if (user) {
                  console.log("Email input value:", e.target.value);
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }));
                }
              }}
              className="text-lg font-medium"
            />
            <Button onClick={handleUpdateUser} variant="outline">
              <CheckIcon className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg font-medium">
              Nom d'utilisateur: {authUser?.user.username}
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <PencilIcon className="h-5 w-5" />
              </Button>
            </p>
            <p className="text-lg font-medium">Email: {authUser?.user.email}</p>
          </>
        )}
      </div>
      <div className="mt-4">
        <Button onClick={handleDeleteUser} variant="destructive">
          Supprimer mon compte
        </Button>
      </div>
    </div>
  );
}
