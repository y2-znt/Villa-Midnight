import { Skeleton } from "../../ui/skeleton";

export default function AvatarSectionSkeleton() {
  return (
    <div className="mb-8 relative group">
      <Skeleton className="w-32 h-32 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full absolute -bottom-0 -right-0" />
    </div>
  );
}
