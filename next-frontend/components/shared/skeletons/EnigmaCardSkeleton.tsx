import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EnigmaCardSkeleton() {
  return (
    <Card className="relative">
      <Skeleton className="h-56 w-full rounded-t-xl md:h-96" />
      <CardHeader>
        <Skeleton className="mb-2 h-8 w-3/4" />
        <Skeleton className="h-4 w-24" />
        <CardContent className="mt-4">
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}
