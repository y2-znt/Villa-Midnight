import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center md:w-1/3 text-center mx-auto py-10">
      <span className="mt-6 text-4xl font-extrabold">
        Oups ! Page introuvable
      </span>
      <p className="text-center mt-8 px-4">
        Cette page semble avoir disparu dans le néant. Peut-être qu'elle a été
        dérobée par un mystère.
      </p>
      <Link to="/">
        <Button className="mt-8 font-bold">Fuir en courant !</Button>
      </Link>
    </div>
  );
}
