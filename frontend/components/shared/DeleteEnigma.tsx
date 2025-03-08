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
          <TrashIcon className="text-primary size-7 cursor-pointer" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer cette énigme ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. L&apos;énigme sera définitivement
            supprimée.
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
