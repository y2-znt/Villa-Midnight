"use client";

import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/shared/dashboard/DashboardSidebar";
import { useState } from "react";

export default function DashboardContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      <DashboardSidebar
        className="hidden lg:block"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex w-full flex-col">
        <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="p-4 md:p-6">{children}</div>
          </div>
        </main>
        <footer className="text-muted-foreground border-t p-8 text-sm">
          {new Date().getFullYear()} © Villa Midnight - Tous droits réservés
        </footer>
      </div>
    </div>
  );
}
