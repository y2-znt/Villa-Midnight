import Logo from "./Logo";

export default function LogoWithName() {
  return (
    <a href="/" className="flex items-center gap-2">
      <Logo />
      <div className="text-2xl font-semibold text-foreground leading-tight">
        VILLA <span className="text-primary">MIDNIGHT</span>
      </div>
    </a>
  );
}
