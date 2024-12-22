import {
  ChevronDownIcon,
  LogOutIcon,
  PuzzleIcon,
  UserCheckIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "../api/authApi";
import { useAuthContext } from "../contexts/AuthContext";
import { Button } from "./ui/button";

export default function UserMenu() {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    {
      to: "/profile",
      label: "Profil",
      icon: <UserCheckIcon />,
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

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative lg:block" ref={menuRef}>
      <Button
        variant="outline"
        className="flex items-center justify-between text-left py-5"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserIcon className="size-4" />
        <span className="hidden sm:flex">MON COMPTE</span>
        <ChevronDownIcon className="ml-1" />
      </Button>
      {isOpen && (
        <div className="absolute right-4 w-48 z-50 border bg-black border-muted shadow-lg rounded-md">
          <ul className="">
            {links.map((link, index) => (
              <li
                key={index}
                className="hover:bg-muted cursor-pointer py-1"
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
