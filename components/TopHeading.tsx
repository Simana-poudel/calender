import React from "react";
import CustomPageHeader from "./reusable/custom-page-header";
import CustomSearch from "./reusable/custom-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Week from "./grid-view/Week";
import Days from "./grid-view/Days";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopHeading = () => {
  return (
    <div>
      <Tabs defaultValue="grid" className=" h-[900px]">
        <TabsList>
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost">
              <ChevronLeft />
            </Button>
            <Button variant="ghost">
              <ChevronRight />
            </Button>
          </div>
          <div className=" flex items-center justify-center">
            <CustomPageHeader title="February" />
            <span className="text-gray-300 font-light text-2xl">2017</span>
          </div>

          <CustomSearch placeholder="Search" />
        </div>
        <TabsContent
          className="justify-center items-center h-[700px]"
          value="grid"
        >
          <Week />
          <Days />
        </TabsContent>
        <TabsContent value="list">list</TabsContent>
      </Tabs>
    </div>
  );
};

export default TopHeading;
