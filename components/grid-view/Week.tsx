import { cn } from "@/lib/utils";
import React from "react";
import { weekData } from "@/data/weekData";
const Week = () => {
  const now = new Date();
  const WeekNum = now.getDay();
  return (
    <div className="grid grid-cols-7 gap-2 md:gap-4">
      {weekData.map((day, index) => (
        <div
          key={index}
          className={cn(
            "text-center text-xs uppercase text-[#707070] md:text-base",
            index === WeekNum &&
              "text-[#707070] underline underline-offset-[18px] decoration-primary"
          )}
        >
          {day.nepali}
        </div>
      ))}
    </div>
  );
};

export default Week;
