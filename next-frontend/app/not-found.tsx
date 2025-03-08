import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center py-10 text-center md:w-1/3">
      <span className="mt-6 text-4xl font-extrabold">
        Oups ! Page introuvable
      </span>
      <p className="mt-8 px-4 text-center">
        Cette page semble avoir disparu dans le néant. Peut-être qu&apos;elle a
        été dérobée par un mystère.
      </p>
      <Link href="/">
        <Button className="mt-8 font-bold">Fuir en courant !</Button>
      </Link>
    </div>
  );
}
