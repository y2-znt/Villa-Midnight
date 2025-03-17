import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useState } from "react";

interface SelectRoleProps {
  onSelectRole: (value: string) => void;
}

export default function SelectRole({ onSelectRole }: SelectRoleProps) {
  const [role, setRole] = useState("Rôle");

  const handleRoleChange = (value: string) => {
    setRole(value);
    onSelectRole(value);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
            {role}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleRoleChange("Tous")}>
            Tous
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("Administrateur")}>
            Administrateur
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("Utilisateur")}>
            Utilisateur
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
