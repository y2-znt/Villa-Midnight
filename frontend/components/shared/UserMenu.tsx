"use client";

import { useAuthContext } from "@/context/authContext";
import { useLogout } from "@/hooks/useAuth";
import {
  BookOpenIcon,
  ChartArea,
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
      href: "/admin",
      label: "Admin",
      icon: <ChartArea className="size-4" />,
      visible: authUser?.user?.role === "ADMIN",
    },
    {
      href: "/profile",
      label: "Profil",
      icon: <UserCheckIcon className="size-4" />,
    },
    {
      href: "/create-enigma",
      label: "Créer une énigme",
      icon: <BookOpenIcon className="size-4" />,
    },
    {
      href: "/my-enigmas",
      label: "Mes Énigmes",
      icon: <PuzzleIcon className="size-4" />,
    },
    {
      label: "Déconnexion",
      onClick: logout,
      icon: <LogOutIcon className="size-4" />,
      disabled: isLoading,
    },
  ];

  return (
    <div className="relative lg:block">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between text-left"
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
              <UserIcon className="size-5" />
            )}
            <span className="hidden sm:flex">MON COMPTE</span>
            <ChevronDownIcon className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map(
            (link, index) =>
              link.visible !== false && (
                <DropdownMenuItem
                  key={index}
                  disabled={link.disabled}
                  onClick={() =>
                    link.onClick ? link.onClick() : router.push(link.href)
                  }
                  className="cursor-pointer p-2.5"
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="ml-2 font-medium uppercase">
                      {link.label}
                    </span>
                  </div>
                </DropdownMenuItem>
              ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
