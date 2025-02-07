"use client";
import React, { Suspense, useEffect, useRef } from "react";
import CustomPageHeader from "./reusable/custom-page-header";
import CustomSearch from "./reusable/custom-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Week from "./grid-view/Week";
import Days from "./grid-view/Days";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMonthStore } from "@/services/zustand/useMonthStore"; // Zustand store
import { dateData } from "@/data/datesData"; // Month data
import { useSearchParams } from "next/navigation";

const TopHeading = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopHeadingContent />
    </Suspense>
  );
};

const TopHeadingContent = () => {
  const { currentMonthIndex, incrementMonth, decrementMonth, nepaliYear } =
    useMonthStore((state) => state);
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name")?.toLowerCase();
  const currentMonthData = dateData[currentMonthIndex];
  const nepaliMonth = currentMonthData
    ? currentMonthData.month
    : "Invalid Month";

  const prevMonthIndexRef = useRef<number | null>(null);

  useEffect(() => {
    prevMonthIndexRef.current = currentMonthIndex;
  }, [currentMonthIndex]);

  return (
    <Tabs defaultValue="grid max-h-[700px]">
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
            {nepaliYear}
          </span>
        </div>
        <CustomSearch placeholder="Search" />
      </div>
      {!nameParam && (
        <TabsContent
          className="justify-center items-center mt-4 mb-10 h-[700px]"
          value="grid"
        >
          <Week />
          <Days />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TopHeading;
