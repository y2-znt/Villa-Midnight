import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div>
      <Image
        src="/assets/villa-midnight-logo-white.png"
        alt="logo"
        className={`size-14 ${className}`}
        width={56}
        height={56}
      />
    </div>
  );
}
