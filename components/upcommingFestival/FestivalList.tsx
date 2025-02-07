import React from "react";
import CustomPageHeader from "../reusable/custom-page-header";

const FestivalList = () => {
  return (
    <div>
      <CustomPageHeader title="Upcoming Festivals" />
      <div className="grid gap-4">
        {[...Array(10).keys()].map((index) => (
          <div
            key={index}
            className=" text-gray-400s border border-red-100 py-2 flex justify-between items-center p-4 gap-6"
          >
            <div>
              <h1 className="text-primary">Chaat</h1>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                velit dolores rerum sint quod. Dolor optio veniam rem earum
                quasi nobis beatae, hic libero, sapiente eaque harum numquam
                iste tenetur!
              </p>
            </div>
            <h3>
              Magh 1 <span>Tuesday</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalList;
