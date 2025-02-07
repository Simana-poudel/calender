import { cn } from "@/lib/utils";
import React from "react";

const days = [
  {
    index: 1,
    name: "Sun",
  },
  {
    index: 2,
    name: "Mon",
  },
  {
    index: 3,
    name: "Tue",
  },
  {
    index: 4,
    name: "Wed",
  },
  {
    index: 5,
    name: "Thu",
  },
  {
    index: 6,
    name: "Fri",
  },
  {
    index: 7,
    name: "Sat",
  },
];

const Week = () => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => (
        <div
          key={day.index}
          className={cn(
            "text-center text-base uppercase text-[#707070]",
            day.name === "Mon" &&
              "text-[#707070] underline underline-offset-[18px] decoration-primary"
          )}
        >
          {day.name}
        </div>
      ))}
    </div>
  );
};

export default Week;
