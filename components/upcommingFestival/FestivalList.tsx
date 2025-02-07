import React from "react";
import CustomPageHeader from "../reusable/custom-page-header";

const FestivalList = () => {
  return (
    <div>
      <CustomPageHeader title="Upcoming Festivals" />
      <div className="grid gap-4">
        {[...Array(10).keys()].map((index) => (
          <div key={index} className=" text-white bg-gray-300 py-2 ">
            <h1>Chaat</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalList;
