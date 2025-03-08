import Link from "next/link";
import Logo from "./Logo";
export default function LogoWithName() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Logo />
      <div className="text-foreground text-2xl leading-tight font-semibold">
        VILLA <span className="text-primary">MIDNIGHT</span>
      </div>
    </Link>
  );
}
