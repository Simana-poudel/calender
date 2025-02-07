import React from "react";
import CustomPageHeader from "./reusable/custom-page-header";
import CustomSearch from "./reusable/custom-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Week from "./grid-view/Week";
import Days from "./grid-view/Days";

const TopHeading = () => {
  return (
    <div>
      <Tabs defaultValue="grid" className=" h-[800px] bg-red-200">
        <TabsList>
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost">{`<`}</Button>
            <Button variant="ghost">{`>`}</Button>
          </div>
          <CustomPageHeader title="February 2025" />

          <CustomSearch placeholder="Search" />
        </div>
        <TabsContent
          className="justify-center items-center bg-gray-400 h-[700px]"
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
