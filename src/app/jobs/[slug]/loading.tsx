import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <CardContent className="space-y-4 p-6 sm:p-8">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-11 w-full rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}