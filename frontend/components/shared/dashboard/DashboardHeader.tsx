"use client";

import { ChevronRight, LogOut, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../../../components/ui/button";
import { useLogout } from "../../../hooks/useAuth";

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
  const pathname = usePathname();

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (
      segments.length === 1 ||
      (segments.length === 2 && segments[1] === "")
    ) {
      return "Vue d'ensemble";
    }

    if (lastSegment) {
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }

    return "Vue d'ensemble";
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map(
      (segment) => segment.charAt(0).toUpperCase() + segment.slice(1),
    );
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className={`sticky top-0 z-30 mx-2 flex items-center gap-4 px-4 py-3 backdrop-blur-sm ${className || ""}`}
    >
      {children}

      <div className="flex flex-1 items-center justify-between">
        <div className="text-muted-foreground flex flex-col items-start gap-2 text-sm">
          <div className="flex items-center">
            {breadcrumbs.length > 0 && (
              <>
                {breadcrumbs.map((crumb, index) => (
                  <span
                    key={index}
                    className={`flex items-center ${index === breadcrumbs.length - 1 ? "" : ""}`}
                  >
                    {crumb}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="mx-2 h-4 w-4" />
                    )}
                  </span>
                ))}
              </>
            )}
          </div>
          <h1 className="title text-2xl font-bold text-white lg:text-3xl">
            {getPageTitle()}
          </h1>
        </div>

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
