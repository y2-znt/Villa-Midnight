"use client";

import { useAuthContext } from "@/context/authContext";
import { useLogout } from "@/hooks/useAuth";
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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserMenu() {
  const { authUser } = useAuthContext();
  const { logout, isLoading } = useLogout();
  const router = useRouter();

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
      onClick: () => logout(),
      icon: <LogOutIcon />,
      disabled: isLoading,
    },
  ];

  return (
    <div className="relative lg:block">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between py-5 text-left"
            disabled={isLoading}
          >
            {authUser?.user?.avatarUrl ? (
              <Image
                src={authUser.user.avatarUrl}
                alt="Profile"
                className="size-5 rounded-full"
                width={20}
                height={20}
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
                disabled={link.disabled}
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
                  disabled={link.disabled}
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
