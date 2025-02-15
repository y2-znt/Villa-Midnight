interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div>
      <img
        src="/assets/villa-midnight-logo-white.png"
        alt="logo"
        className={`size-14 ${className}`}
      />
    </div>
  );
}
