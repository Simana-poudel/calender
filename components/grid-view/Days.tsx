import React from "react";
import { Button } from "../ui/button";

const Days = () => {
  return (
    <div className="grid grid-cols-7 gap-4 h-full my-8">
      {[...Array(30).keys()].map((index) => (
        <div
          key={index}
          className=" text-[#707070] relative text-base justify-center items-center flex border border-red-100 rounded-sm"
        >
          {index + 1}
          <Button
            variant={"outline"}
            className="absolute bottom-0 right-0 px-2 rounded-sm"
          >
            +
          </Button>
          <p className="absolute bottom-3 right-8 left-2 text-sm">
            magh sukla purnima
          </p>
        </div>
      ))}
    </div>
  );
};

export default Days;
