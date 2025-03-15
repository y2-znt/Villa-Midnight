import LogoWithName from "@/components/shared/LogoWithName";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="p-4">
        <LogoWithName />
      </div>
      <div className="my-16 md:my-28">{children}</div>
    </div>
  );
}
