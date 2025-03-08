"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import { useState } from "react";

import FadeIn from "@/components/animations/FadeIn";
import LogoWithName from "@/components/shared/LogoWithName";
import UserMenu from "@/components/shared/UserMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const { authUser } = useAuthContext();
  const toggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  const links = [
    { name: "ACCUEIL", href: "/" },
    { name: "ÉNIGMES", href: "/enigmas" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <FadeIn delay={1}>
      <nav className="relative flex items-center justify-between p-4">
        <LogoWithName />
        <div className="hidden space-x-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
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
          className={`bg-background text-foreground fixed top-24 right-0 z-50 size-full text-xl transition-transform duration-500 ease-in-out lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="mt-16 flex flex-col items-center space-y-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    toggleBurger();
                  }}
                  className="hover:text-primary block font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              {!authUser && (
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    RELEVER LE DÉFI
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        {authUser ? (
          <UserMenu />
        ) : (
          <Link href="/login" className="hidden lg:block">
            <Button variant="outline" size="lg">
              RELEVER LE DÉFI
            </Button>
          </Link>
        )}
      </nav>
    </FadeIn>
  );
}
