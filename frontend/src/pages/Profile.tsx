import Title from "../components/ui/title";
import { useAuthContext } from "../context/AuthContext";

export default function Profile() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4">
      <Title text="MON" highlight="PROFIL" />
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Nom d'utilisateur: {authUser?.user.username}
        </p>
        <p className="text-lg font-semibold">Email: {authUser?.user.email}</p>
      </div>
    </div>
  );
}
