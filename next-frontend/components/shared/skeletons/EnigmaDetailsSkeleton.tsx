import { Skeleton } from "../../ui/skeleton";

export default function EnigmaDetailsSkeleton() {
  return (
    <div className="mx-7 mt-14 mb-36 flex flex-col items-start md:mt-28">
      <div className="flex gap-2">
        <Skeleton className="h-20 w-64 md:w-96" />
      </div>

      <div className="flex w-full justify-between">
        <div className="mt-10 flex flex-col">
          <Skeleton className="h-14 w-52" />

          <div className="mt-10 space-y-2">
            <Skeleton className="h-8 w-72 max-w-lg" />
            <Skeleton className="h-8 w-9/10 max-w-lg" />
            <Skeleton className="h-8 w-4/5 max-w-lg" />
          </div>

          <div className="mt-6 flex gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>

          <Skeleton className="mt-6 h-6 w-64" />
        </div>
      </div>
    </div>
  );
}
