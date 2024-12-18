import { useState } from "react";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  const links = [
    { name: "ACCUEIL", href: "/" },
    { name: "ÉNIGMES", href: "/all-enigmas" },
    { name: "CONTACT", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4">
      <a href="/" className="flex items-center gap-2">
        <Logo />
        <div className="text-2xl font-semibold text-foreground leading-tight">
          VILLA <span className="text-primary">MIDNIGHT</span>
        </div>
      </a>
      <div className="hidden lg:flex space-x-10">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-primary text-base font-semibold"
          >
            {link.name}
          </a>
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
              <a
                href={link.href}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  toggleBurger();
                }}
                className="block hover:text-primary font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <Button variant="default" size="lg">
              RELEVEZ LE DÉFI
            </Button>
          </li>
        </ul>
      </div>
      <Button variant="default" size="lg" className="hidden lg:block">
        RELEVEZ LE DÉFI
      </Button>
    </nav>
  );
}
