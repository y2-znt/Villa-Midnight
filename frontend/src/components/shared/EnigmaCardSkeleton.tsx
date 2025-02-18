import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function EnigmaCardSkeleton() {
  return (
    <Card className="relative">
      <Skeleton className="w-full h-56 md:h-96 rounded-t-xl" />
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-24" />
        <CardContent className="mt-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}
