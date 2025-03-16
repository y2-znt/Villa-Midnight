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
import { useDeleteUser, useUsers } from "@/hooks/useUser";
import { UserApiResponse } from "@/types/types";
import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../../../ui/input";
import LoadingIndicator from "../../LoadingIndicator";
import AddUserDialog from "./AddUserDialog";
import DeleteUserButton from "./DeleteUser";
import SelectRole from "./SelectRole";

export function UserTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("Tous");

  const { data: usersData, isLoading, isError, error } = useUsers();
  const { deleteUser, isDeleting } = useDeleteUser();
  const users: UserApiResponse[] = usersData || [];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRole === "Tous" ||
      user.role === (selectedRole === "Administrateur" ? "ADMIN" : "USER");
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4 lg:max-w-[calc(100vw-18rem)]">
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
        <div className="mb-4 flex flex-col md:mb-0">
          <h1 className="title text-2xl font-bold">Liste des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs et leurs rôles
          </p>
        </div>
        <AddUserDialog />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="mt-0 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <SelectRole onSelectRole={setSelectedRole} />
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
                <TableHead>Énigmes</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center">
                    {isLoading ? "Chargement..." : "Aucun utilisateur trouvé"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user: UserApiResponse, index: number) => {
                  return (
                    <TableRow key={user.id || index}>
                      <TableCell className="w-12 truncate">
                        {user.id.slice(0, 12)}...
                      </TableCell>
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
                                {user.username
                                  .split(" ")
                                  .map((name) => name.charAt(0).toUpperCase())
                                  .slice(0, 2)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span>{user.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.enigmas.length || 0}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "ADMIN" ? "primary" : "outline"
                          }
                        >
                          {user.role === "ADMIN"
                            ? "Administrateur"
                            : "Utilisateur"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt &&
                          new Date(user.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Modifier l&apos;utilisateur
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="p-0"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <DeleteUserButton
                                handleDeleteUser={() => deleteUser(user.id)}
                                isDeleting={isDeleting}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
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
