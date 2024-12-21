import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../api/authApi";
import LogoWithName from "../components/LogoWithName";
import { Button } from "../components/ui/button";
import { useAuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

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
    { name: "ACCUEIL", href: "/" },
    { name: "ÉNIGMES", href: "/all-enigmas" },
    { name: "CONTACT", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4">
      <LogoWithName />
      <div className="hidden lg:flex space-x-10">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="hover:text-primary text-base font-semibold"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            toggleBurger();
          }}
          className="relative flex h-20 w-20 items-center justify-center"
          aria-label="Burger menu"
        >
          <div className="relative w-full">
            <div
              className={`absolute left-1/2 h-[1px] w-[40%] -translate-x-1/2 transform bg-white transition-all duration-500 ${
                isBurgerActive ? "top-0 rotate-45" : "-top-1.5"
              }`}
            ></div>
            <div
              className={`absolute left-1/2 h-[1px] w-[40%] -translate-x-1/2 transform bg-white transition-all duration-500 ${
                isBurgerActive ? "top-0 -rotate-45" : "top-1.5"
              }`}
            ></div>
          </div>
        </button>
      </div>
      <div
        className={`fixed top-24 right-0 z-50 size-full bg-background text-xl text-foreground transition-transform duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-8 flex flex-col items-center">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  toggleBurger();
                }}
                className="block hover:text-primary font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {authUser ? (
              <Button variant="outline" size="lg" onClick={handleLogout}>
                DÉCONNEXION
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="default" size="lg">
                  RELEVER LE DÉFI
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
      {authUser ? (
        <Button
          variant="outline"
          size="lg"
          className="hidden lg:block"
          onClick={handleLogout}
        >
          DÉCONNEXION
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="default" size="lg">
            RELEVER LE DÉFI
          </Button>
        </Link>
      )}
    </nav>
  );
}
