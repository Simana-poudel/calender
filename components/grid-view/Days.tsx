import React from "react";

const Days = () => {
  return (
    <div className="grid grid-cols-7 gap-4 h-full">
      {[...Array(30).keys()].map((index) => (
        <div key={index} className="text-center text-white">
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Days;
