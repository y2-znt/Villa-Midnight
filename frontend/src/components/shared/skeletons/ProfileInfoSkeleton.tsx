import { Skeleton } from "../../ui/skeleton";

export default function ProfileInfoSkeleton() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="flex justify-between items-center">
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
          <Skeleton className="h-7 w-64 mt-2" />
        </div>
      </div>
    </div>
  );
}
