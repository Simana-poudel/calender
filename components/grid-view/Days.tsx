import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { dateData } from "@/data/datesData";
import { useMonthStore } from "@/services/zustand/useMonthStore";
import { FestivalData } from "@/data/festivalData";
import { daysData } from "@/data/daysData";
import Note from "../modals/AddNotes";
import { cn } from "@/lib/utils";
import AddNote from "../modals/NotesData";

const Days = () => {
  const today = new Date().toISOString().split("T")[0];
  const { currentMonthIndex } = useMonthStore((state) => state);
  const [notes, setNotes] = useState<
    { date: { date: string }; note: string }[]
  >([]);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [selectedDayObj, setSelectedDayObj] = useState<{
    date: Date;
    nepaliDate: number;
  } | null>(null);

  const [selectedNotes, setSelectedNotes] = useState<string>("");
  useEffect(() => {
    const storedNotes = JSON.parse(
      (window && window.localStorage.getItem("notes")) || "[]"
    );
    setNotes(storedNotes);
  }, []);

  const activeMonthData = dateData[currentMonthIndex];

  if (!activeMonthData) {
    return <div>No data available for the current date.</div>;
  }

  const { startEnglishDate, endEnglishDate } = activeMonthData;
  const startDate = new Date(startEnglishDate);
  const endDate = new Date(endEnglishDate);
  const startDayOfWeek = startDate.getDay();
  const days = [];
  let nepaliDate = 1;

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  while (startDate <= endDate) {
    days.push({ date: new Date(startDate), nepaliDate });
    startDate.setDate(startDate.getDate() + 1);
    nepaliDate++;
  }

  const getFestival = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return FestivalData.find((festival) => festival.date === dateStr);
  };

  const getNepaliDay = (englishDay: number) => {
    const day = daysData.find((item) => item.english === String(englishDay));
    return day ? day.nepali : englishDay;
  };

  const openNoteModal = (
    dayObj: {
      date: Date;
      nepaliDate: number;
    } | null
  ) => {
    setSelectedDayObj(dayObj);
    setOpenAddNoteModal(true);
  };

  return (
    <div className="grid grid-cols-7 gap-4 h-full my-8">
      {days.map((dayObj, index) => {
        if (!dayObj) {
          return <div key={index} className="border border-transparent" />;
        }

        const { date, nepaliDate } = dayObj;
        const isToday =
          date.toISOString().split("T")[0] === today ? "bg-green-200" : "";
        const festival = getFestival(date);
        const isFestival = festival ? "text-primary bg-red-100" : "";
        const hasNoteForDate = (date: Date) => {
          return notes.some((note) => note.date.date === date.toISOString());
        };
        const hasNote = hasNoteForDate(date)
          ? "border-b border-gray-500 w-[40px] flex justify-center "
          : "";

        const handleNoteOpen = (date: Date) => {
          const filteredNotes = notes.filter(
            (note) => note.date.date === date.toISOString()
          );
          if (filteredNotes.length > 0) {
            setSelectedNotes(filteredNotes[0].note);
            setOpenNotes(true);
          }
        };
        return (
          <div
            key={index}
            className={cn(
              `text-[#707070] relative text-base justify-center items-center flex border border-red-100 rounded-sm ${isToday} ${isFestival}`,
              hasNoteForDate(date) && "cursor-pointer hover:bg-red-100"
            )}
            onClick={() => handleNoteOpen(date)}
          >
            <span
              className={`nepali-date ${hasNote} cursor-pointer`}
              onMouseEnter={(e) => {
                const target = e.target as HTMLSpanElement;
                target.style.transform = "translateY(-5px)";
                target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLSpanElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "none";
              }}
            >
              {getNepaliDay(nepaliDate)}
            </span>

            {festival && (
              <div className="absolute hidden md:flex bottom-1 left-2 text-xs text-primary bg-red-200 p-1 rounded-sm">
                {festival.name}
              </div>
            )}
            <Button
              variant={"outline"}
              className="absolute bottom-0 right-0 px-2 rounded-sm md:w-8 md:h-6 w-2 h-2"
              onClick={() => openNoteModal(dayObj)}
            >
              +
            </Button>
            {openAddNoteModal && (
              <Note
                onClose={() => setOpenAddNoteModal(false)}
                isOpen={openAddNoteModal}
                dayObj={selectedDayObj}
              />
            )}
            {openNotes && (
              <AddNote
                notes={selectedNotes}
                isOpen={openNotes}
                onClose={() => setOpenNotes(false)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Days;
