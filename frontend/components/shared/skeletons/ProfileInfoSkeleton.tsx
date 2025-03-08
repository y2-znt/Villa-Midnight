import { Skeleton } from "../../ui/skeleton";

export default function ProfileInfoSkeleton() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-7 w-56" />

        <div className="mt-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-7 w-64" />
        </div>
      </div>
    </div>
  );
}
