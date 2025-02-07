import React from "react";
import CustomPageHeader from "../reusable/custom-page-header";

import { FestivalData } from "@/data/festivalData";

const FestivalList = () => {
  const today = new Date().toISOString().split("T")[0];

  const upcomingFestivals = FestivalData.filter(
    (festival) => festival.date >= today
  );

  return (
    <div className="py-6">
      <CustomPageHeader title="Upcoming Festivals" />
      <div className="grid gap-4">
        {upcomingFestivals.map((festival, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default FestivalList;
