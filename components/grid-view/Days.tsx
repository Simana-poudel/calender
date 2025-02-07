import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { dateData } from "@/data/datesData"; // Assuming Nepali dates are here
import { useMonthStore } from "@/services/zustand/useMonthStore"; // Zustand store
import { FestivalData } from "@/data/festivalData"; // Festival data import
import { daysData } from "@/data/daysData"; // Import the Nepali days data

const Days = () => {
  const today = new Date().toISOString().split("T")[0];
  const { currentMonthIndex } = useMonthStore((state) => state); // Zustand store for current month

  const activeMonthData = dateData[currentMonthIndex]; // Get the current month data

  if (!activeMonthData) {
    return <div>No data available for the current date.</div>;
  }

  const { startEnglishDate, endEnglishDate, month } = activeMonthData;

  const startDate = new Date(startEnglishDate);
  const endDate = new Date(endEnglishDate);

  const startDayOfWeek = startDate.getDay();

  const days = [];
  let nepaliDate = 1; // Nepali date starts from 1

  // Add empty slots for days before the start of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // Loop through the days of the month
  while (startDate <= endDate) {
    days.push({ date: new Date(startDate), nepaliDate });
    startDate.setDate(startDate.getDate() + 1);
    nepaliDate++; // Increment Nepali date
  }

  // Function to check if a festival falls on the given date
  const getFestival = (date) => {
    const dateStr = date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    const festival = FestivalData.find((festival) => festival.date === dateStr);
    return festival;
  };

  // Function to get Nepali day based on english date
  const getNepaliDay = (englishDay) => {
    const day = daysData.find((item) => item.english === String(englishDay));
    return day ? day.nepali : englishDay; // Return Nepali day, or fallback to English day if not found
  };

  return (
    <div className="grid grid-cols-7 gap-4 h-full my-8">
      {days.map((dayObj, index) => {
        if (!dayObj) {
          return <div key={index} className="border border-transparent" />;
        }

        const { date, nepaliDate } = dayObj;
        const day = date.getDate();
        const isToday =
          date.toISOString().split("T")[0] === today ? "bg-green-200" : "";

        // Check if a festival is present on the current date
        const festival = getFestival(date);

        const isFestival = festival ? "text-primary bg-red-100" : "";

        return (
          <div
            key={index}
            className={`text-[#707070] relative text-base justify-center items-center flex border border-red-100 rounded-sm ${isToday} ${isFestival}`}
          >
            {getNepaliDay(nepaliDate)} {/* Show the Nepali day here */}
            {/* Show festival name if there is a festival */}
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
