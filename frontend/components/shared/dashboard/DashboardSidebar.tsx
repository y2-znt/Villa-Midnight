"use client";

import { useAuthContext } from "@/context/authContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import { mainNavItems, supportNavItems } from "@/data/data";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function DashboardSidebar({
  className,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`bg-background fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`bg-background sticky top-0 h-screen w-72 overflow-hidden border-r ${className}`}
      >
        <SidebarContent />
      </div>

      {/* Backdrop - visible when mobile sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
    </>
  );
}

function SidebarContent() {
  const { authUser } = useAuthContext();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <div className="flex h-full flex-col text-white">
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-white/10 p-5"
      >
        <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md">
          <Logo className="size-8" />
        </div>
        <div>
          <h1 className="logo text-xl">
            Villa <span className="text-primary">Midnight</span>
          </h1>
          <div className="text-muted-foreground text-xs tracking-wider uppercase">
            ADMIN
          </div>
        </div>
      </Link>

      <div className="flex-1 overflow-auto px-3 py-6">
        <motion.nav
          className="grid items-start gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div>
            <h2 className="text-muted-foreground title mb-2 px-2 text-xs tracking-wider">
              PRINCIPAL
            </h2>
            <motion.div className="grid gap-1" variants={containerVariants}>
              {mainNavItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                      activeLink === item.href
                        ? "bg-accent text-secondary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-4 w-4 ${activeLink === item.href ? "" : "group-hover:text-foreground"}`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h2 className="text-muted-foreground title mb-2 px-2 text-xs tracking-wider">
              SUPPORT
            </h2>
            <motion.div className="grid gap-1" variants={containerVariants}>
              {supportNavItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                      activeLink === item.href
                        ? "bg-accent text-secondary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-4 w-4 ${activeLink === item.href ? "" : "group-hover:text-foreground"}`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md bg-white/5 p-3">
          <div className="bg-primary/20 relative h-10 w-10 overflow-hidden rounded-full">
            {authUser?.user?.avatarUrl ? (
              <Image
                src={authUser.user.avatarUrl}
                alt="Profile"
                className="object-cover"
                fill
              />
            ) : (
              <div className="text-primary flex h-full w-full items-center justify-center text-sm font-medium">
                {authUser?.user?.username?.slice(0, 2).toUpperCase() || "VM"}
              </div>
            )}
          </div>
          <div className="flex-1 truncate">
            <div className="text-sm font-medium">
              {authUser?.user?.username || "Admin"}
            </div>
            <div className="text-muted-foreground truncate text-xs">
              {authUser?.user?.email || "admin@villamidnight.com"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
