"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const monthParam = searchParams.get("month")?.toLowerCase();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const filteredFestivals = FestivalData.filter((festival) => {
    const festivalDate = new Date(festival.date);
    festivalDate.setUTCHours(0, 0, 0, 0);
    const isUpcoming = festivalDate >= today;

    const matchesName =
      !nameParam || festival.title.toLowerCase().includes(nameParam);

    const matchesMonth = !monthParam || festival.month.includes(monthParam);

    return isUpcoming && matchesName && matchesMonth;
  });

  return (
    <div className="py-6 mt-4">
      <CustomPageHeader title={`आगामी चाडपर्वहरू`} />
      <div className="grid gap-4">
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival, index) => (
            <FestivalItem key={index} festival={festival} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <p>{`खोजका मापदण्ड अनुरूप कुनै चाडपर्व फेला परेन।`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface Festival {
  name: string;
  description: string;
  date: string;
}

const FestivalItem = ({ festival }: { festival: Festival }) => {
  const [isInView, setIsInView] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false); // Reset the animation when it leaves the viewport
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is in view
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`text-gray-400 border border-red-100 py-2 flex justify-between items-center p-4 gap-6 transform transition-opacity duration-1000 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div>
        <h1 className="text-primary">{festival.name}</h1>
        <p className="text-muted-foreground">{festival.description}</p>
      </div>
      <h3>
        {festival.date},{" "}
        <span>
          {new Date(festival.date).toLocaleString("ne-NP", {
            weekday: "long",
          })}
        </span>
      </h3>
    </div>
  );
};

export default FestivalList;
