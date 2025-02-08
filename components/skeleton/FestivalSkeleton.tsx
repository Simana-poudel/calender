import React from "react";
import { Skeleton } from "../ui/skeleton";

const FestivalListSkeleton = () => {
  return (
    <div className="py-6 mt-4">
      <div className="grid gap-4">
        <Skeleton className="h-16 w-3/4 rounded-md" />
        <Skeleton className="h-12 w-1/2 rounded-md" />
        <Skeleton className="h-16 w-3/4 rounded-md" />
        <Skeleton className="h-12 w-1/2 rounded-md" />
      </div>
    </div>
  );
};

export default FestivalListSkeleton;
