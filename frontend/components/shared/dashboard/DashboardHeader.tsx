"use client";

import { LogOut, Menu, X } from "lucide-react";
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

  return (
    <header
      className={`sticky top-0 z-30 mx-2 flex items-center gap-4 px-4 py-3 backdrop-blur-sm ${className || ""}`}
    >
      {children}

      <div className="flex flex-1 items-center justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          {setIsOpen && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="size-10" />
              ) : (
                <Menu className="size-10" />
              )}
            </Button>
          )}
          <Button
            onClick={() => logout()}
            variant="outline"
            size="icon"
            className="rounded-full hover:text-white"
          >
            <LogOut className="size-10" />
          </Button>
        </div>
      </div>
    </header>
  );
}
