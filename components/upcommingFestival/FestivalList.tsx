"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CustomPageHeader from "../reusable/custom-page-header";
import { FestivalData } from "@/data/festivalData";
import { Suspense } from "react";

const FestivalList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FestivalListContent />
    </Suspense>
  );
};

const FestivalListContent = () => {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name")?.toLowerCase();

  console.log("Search Param - name:", nameParam);

  const filteredFestivals = FestivalData.filter(
    (festival) => !nameParam || festival.title.toLowerCase().includes(nameParam)
  );

  return (
    <div className="py-6 mt-4">
      <CustomPageHeader title="Upcoming Festivals" />
      <div className="grid gap-4">
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival, index) => (
            <div
              key={index}
              className="text-gray-400 border border-red-100 py-2 flex justify-between items-center p-4 gap-6"
            >
              <div>
                <h1 className="text-primary">{festival.name}</h1>
                <p className="text-muted-foreground">{festival.description}</p>
              </div>
              <h3>
                {festival.date},{" "}
                <span>
                  {new Date(festival.date).toLocaleString("en-US", {
                    weekday: "long",
                  })}
                </span>
              </h3>
            </div>
          ))
        ) : (
          <p>No festivals found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FestivalList;
