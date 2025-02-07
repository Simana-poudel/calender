import React from "react";
import { Button } from "../ui/button";
import { dateData } from "@/data/datesData";
import { useMonthStore } from "@/services/zustand/useMonthStore";
import { FestivalData } from "@/data/festivalData";
import { daysData } from "@/data/daysData";

const Days = () => {
  const today = new Date().toISOString().split("T")[0];
  const { currentMonthIndex } = useMonthStore((state) => state);

  const activeMonthData = dateData[currentMonthIndex];

  if (!activeMonthData) {
    return <div>No data available for the current date.</div>;
  }

  const { startEnglishDate, endEnglishDate } = activeMonthData;
  const startDate = new Date(startEnglishDate);
  const endDate = new Date(endEnglishDate);
  const startDayOfWeek = startDate.getDay();
  const days = [];
  let nepaliDate = 1;

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  while (startDate <= endDate) {
    days.push({ date: new Date(startDate), nepaliDate });
    startDate.setDate(startDate.getDate() + 1);
    nepaliDate++;
  }

  const getFestival = (date: any) => {
    const dateStr = date.toISOString().split("T")[0];
    return FestivalData.find((festival) => festival.date === dateStr);
  };

  const getNepaliDay = (englishDay: any) => {
    const day = daysData.find((item) => item.english === String(englishDay));
    return day ? day.nepali : englishDay;
  };

  return (
    <div className="grid grid-cols-7 gap-4 h-full my-8">
      {days.map((dayObj, index) => {
        if (!dayObj) {
          return <div key={index} className="border border-transparent" />;
        }

        const { date, nepaliDate } = dayObj;
        const isToday =
          date.toISOString().split("T")[0] === today ? "bg-green-200" : "";
        const festival = getFestival(date);
        const isFestival = festival ? "text-primary bg-red-100" : "";

        return (
          <div
            key={index}
            className={`text-[#707070] relative text-base justify-center items-center flex border border-red-100 rounded-sm ${isToday} ${isFestival}`}
          >
            {getNepaliDay(nepaliDate)}
            {festival && (
              <div className="absolute bottom-1 left-2 text-xs text-primary bg-red-200 p-1 rounded-sm">
                {festival.name}
              </div>
            )}
            <Button
              variant={"outline"}
              className="absolute bottom-0 right-0 px-2 rounded-sm"
            >
              +
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Days;
