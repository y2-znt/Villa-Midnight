import { Skeleton } from "@/components/ui/skeleton";

export default function AvatarSectionSkeleton() {
  return (
    <div className="group relative mb-8">
      <Skeleton className="h-32 w-32 rounded-full" />
      <Skeleton className="absolute -right-0 -bottom-0 h-10 w-10 rounded-full" />
    </div>
  );
}
