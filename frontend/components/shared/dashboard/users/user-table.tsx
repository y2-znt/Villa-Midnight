"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/useUser";
import { Filter, MoreHorizontal, PlusCircleIcon, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../../../ui/input";
import LoadingIndicator from "../../LoadingIndicator";

type UserApiResponse = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  googleId?: string | null;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "USER";
};

export function UserTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: usersData, isLoading, isError, error } = useUsers();

  const users: UserApiResponse[] = Array.isArray(usersData)
    ? usersData
    : usersData?.users || [];

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end md:justify-between">
        <h1 className="title hidden text-2xl font-bold md:block">
          Liste des utilisateurs
        </h1>
        <Button className="flex items-center gap-2">
          <PlusCircleIcon className="h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="mt-0 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Rôle
        </Button>
      </div>

      <div className="rounded-xl border">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <LoadingIndicator text="Chargement des utilisateurs..." />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-red-500">
              Erreur lors du chargement des utilisateurs:{" "}
              {(error as Error).message}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    {isLoading ? "Chargement..." : "Aucun utilisateur trouvé"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user: UserApiResponse, index: number) => (
                  <TableRow key={user.id || index}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {user.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt={user.username}
                              width={32}
                              height={32}
                            />
                          ) : (
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span>{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "ADMIN" ? "success" : "default"}
                      >
                        {user.role === "ADMIN"
                          ? "Administrateur"
                          : "Utilisateur"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ouvrir le menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem>
                            Modifier l&apos;utilisateur
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Supprimer l&apos;utilisateur
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
        <div className="flex items-center justify-between border-t p-4">
          <div className="text-muted-foreground text-sm">
            {filteredUsers.length} de {users.length} ligne(s) sélectionnée(s).
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Précédent
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
