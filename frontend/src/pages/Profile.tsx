import { useNavigate } from "react-router";
import { deleteUser } from "../api/userApi";
import { Button } from "../components/ui/button";
import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

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
      await deleteUser(userId);
      setAuthUser(null);
      navigate("/");
    }
  };

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-4">
        <p className="text-lg font-medium">
          Nom d'utilisateur: {authUser?.user.username}
        </p>
        <p className="text-lg font-medium">Email: {authUser?.user.email}</p>
      </div>
      <div className="mt-4">
        <Button onClick={handleDeleteUser} variant="destructive">
          Supprimer mon compte
        </Button>
      </div>
    </div>
  );
}
