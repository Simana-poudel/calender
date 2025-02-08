import { Skeleton } from "../ui/skeleton";

const TopHeadingSkeleton = () => {
  return (
    <div className="py-6 mt-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Skeleton for the buttons */}
        <div className="flex gap-2">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
        </div>

        {/* Skeleton for the title and year */}
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        {/* Skeleton for the search bar */}
        <Skeleton className="h-10 w-1/2 md:w-1/4 mt-4 md:mt-0" />
      </div>

      {/* Skeleton for the tabs */}
      <div className="mt-4">
        <Skeleton className="h-10 w-24 mb-4 rounded-md" />
      </div>

      {/* Skeleton for the grid view */}
      <div className="justify-center items-center mt-4 mb-10 h-[400px] md:h-[700px]">
        <Skeleton className="h-40 w-full rounded-md mb-4" />
        <Skeleton className="h-40 w-full rounded-md mb-4" />
      </div>
    </div>
  );
};

export default TopHeadingSkeleton;
