"use client";
import React, { useEffect, useState, useRef } from "react";
import CustomPageHeader from "./reusable/custom-page-header";
import CustomSearch from "./reusable/custom-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Week from "./grid-view/Week";
import Days from "./grid-view/Days";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMonthStore } from "@/services/zustand/useMonthStore"; // Import the Zustand store
import { dateData } from "@/data/datesData"; // Import the month data to get the month name dynamically

const TopHeading = () => {
  const { currentMonthIndex, incrementMonth, decrementMonth } = useMonthStore(
    (state) => state
  );

  const currentMonthData = dateData[currentMonthIndex];
  const nepaliMonth = currentMonthData
    ? currentMonthData.month
    : "Invalid Month";

  const nepaliYear =
    currentMonthData && currentMonthData.startEnglishDate
      ? 2081 +
        (parseInt(currentMonthData.startEnglishDate.split("-")[0]) - 2025)
      : "Invalid Year";

  // Using useRef to keep track of previous month index
  const prevMonthIndexRef = useRef(null);

  useEffect(() => {
    prevMonthIndexRef.current = currentMonthIndex;
  }, [currentMonthIndex]);

  // Function to handle year change based on month index
  const handleYearChange = (newIndex) => {
    const prevIndex = prevMonthIndexRef.current;
    const isCrossingYear = prevIndex === 0 && newIndex === 11;
    const isNewYear = newIndex > 2 && !isCrossingYear;
    // Update previous month index
    prevMonthIndexRef.current = newIndex;

    console.log("prevIndex", prevIndex, newIndex);
    return isNewYear ? Number(nepaliYear) + 1 : nepaliYear;
  };

  return (
    <Tabs defaultValue="grid">
      <TabsList>
        <TabsTrigger value="grid">Grid</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={decrementMonth}>
            <ChevronLeft />
          </Button>
          <Button variant="ghost" onClick={incrementMonth}>
            <ChevronRight />
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <CustomPageHeader title={nepaliMonth} />
          <span className="text-gray-300 font-light text-2xl">
            {handleYearChange(currentMonthIndex)}
          </span>
        </div>
        <CustomSearch placeholder="Search" />
      </div>
      <TabsContent
        className="justify-center items-center mb-10 h-[900px]"
        value="grid"
      >
        <Week />
        <Days />
      </TabsContent>
    </Tabs>
  );
};

export default TopHeading;
