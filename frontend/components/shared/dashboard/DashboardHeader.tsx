"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/authContext";
import { LogOut, Menu, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../../../components/ui/button";
import { useLogout } from "../../../hooks/useAuth";
import { SearchBar } from "./SearchBar";

interface DashboardHeaderProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function DashboardHeader({
  children,
  className,
  isOpen,
  setIsOpen,
}: DashboardHeaderProps) {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  const router = useRouter();
  return (
    <header
      className={`sticky top-2 z-30 mx-2 flex items-center gap-4 px-4 py-3 backdrop-blur-sm sm:top-0 ${className || ""}`}
    >
      {children}

      <div className="flex flex-1 items-center justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          {setIsOpen && (
            <Button
              variant="outline"
              size="icon"
              className="size-12 rounded-full hover:text-white md:size-10 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          )}

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-full p-px hover:text-white md:size-10"
              >
                <Avatar className="size-full">
                  {authUser?.user?.avatarUrl ? (
                    <AvatarImage src={authUser.user.avatarUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {authUser?.user?.username?.slice(0, 2).toUpperCase() ||
                        "VM"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-sm font-medium">
                  {authUser?.user?.username}
                </span>
                <span className="text-muted-foreground text-xs">
                  {authUser?.user?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                <User className="size-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => logout()}
                className="cursor-pointer"
              >
                <LogOut className="size-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
