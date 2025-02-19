import { Skeleton } from "../ui/skeleton";

export default function EnigmaDetailsSkeleton() {
  return (
    <div className="mx-7 mt-14 mb-36 md:mt-28 flex flex-col items-start">
      <div className="flex gap-2">
        <Skeleton className="h-20 w-64 md:w-96" />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col mt-10">
          <Skeleton className="h-14 w-52" />

          <div className="space-y-2 mt-10">
            <Skeleton className="h-8 w-72 max-w-lg" />
            <Skeleton className="h-8 w-9/10 max-w-lg" />
            <Skeleton className="h-8 w-4/5 max-w-lg" />
          </div>

          <div className="mt-6 flex gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>

          <Skeleton className="h-6 w-64 mt-6" />
        </div>
      </div>
    </div>
  );
}
