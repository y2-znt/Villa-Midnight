"use client";

import { useAuthContext } from "@/context/authContext";
import { logoutUser } from "@/lib/api/authApi";
import {
  BookOpenIcon,
  ChevronDownIcon,
  LogOutIcon,
  PuzzleIcon,
  UserCheckIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserMenu() {
  const { authUser, setAuthUser } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      toast.success("Déconnexion réussie !");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Échec de la déconnexion.");
    }
  };

  const links = [
    {
      href: "/profile",
      label: "Profil",
      icon: <UserCheckIcon />,
    },
    {
      href: "/create-enigma",
      label: "Créer une énigme",
      icon: <BookOpenIcon />,
    },
    {
      href: "/my-enigmas",
      label: "Mes Énigmes",
      icon: <PuzzleIcon />,
    },
    {
      href: "",
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
            className="flex items-center justify-between py-5 text-left"
          >
            {authUser?.user.avatarUrl ? (
              <Image
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
                    router.push(link.href);
                  }
                }}
              >
                <Button
                  variant="link"
                  className="rounded-none text-white uppercase"
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
