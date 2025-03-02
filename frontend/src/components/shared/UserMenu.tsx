import {
  BookOpenIcon,
  ChevronDownIcon,
  LogOutIcon,
  PuzzleIcon,
  UserCheckIcon,
  UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutUser } from "../../api/authApi";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserMenu() {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      toast.success("Déconnexion réussie !");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Échec de la déconnexion.");
    }
  };

  const links = [
    {
      to: "/profile",
      label: "Profil",
      icon: <UserCheckIcon />,
    },
    {
      to: "/create-enigma",
      label: "Créer une énigme",
      icon: <BookOpenIcon />,
    },
    {
      to: "/my-enigmas",
      label: "Mes Énigmes",
      icon: <PuzzleIcon />,
    },
    {
      to: "",
      label: "Déconnexion",
      onClick: handleLogout,
      icon: <LogOutIcon />,
    },
  ];

  return (
    <div className="relative lg:block">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between text-left py-5"
          >
            {authUser?.user.avatarUrl ? (
              <img
                src={authUser.user.avatarUrl}
                alt="Profile"
                className="size-5 rounded-full"
              />
            ) : (
              <UserIcon className="size-4" />
            )}
            <span className="hidden sm:flex">MON COMPTE</span>
            <ChevronDownIcon className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul>
            {links.map((link, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else {
                    navigate(link.to);
                  }
                }}
              >
                <Button
                  variant="link"
                  className="uppercase text-white rounded-none"
                >
                  {link.icon}
                  {link.label}
                </Button>
              </DropdownMenuItem>
            ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
