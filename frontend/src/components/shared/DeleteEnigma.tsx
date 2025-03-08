"use client";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface DeleteEnigmaProps {
  enigmaId: string;
  onDelete: (id: string) => void;
}

export default function DeleteEnigma({
  enigmaId,
  onDelete,
}: DeleteEnigmaProps) {
  const handleDelete = () => {
    onDelete(enigmaId);
    toast.success("Énigme supprimée avec succès !");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <TrashIcon className="size-7 text-primary cursor-pointer" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Êtes-vous sûr ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
