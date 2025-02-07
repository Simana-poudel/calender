import { create } from "zustand";
import { dateData } from "@/data/datesData"; // Import the month data to get the month name dynamically

export const useMonthStore = create((set) => ({
  currentMonthIndex: 0,
  nepaliYear: 2081,
  trackerButton: "null",

  setMonthIndex: (index) => set({ currentMonthIndex: index }),

  incrementMonth: () =>
    set((state) => {
      const nextIndex = (state.currentMonthIndex + 1) % 12;
      let newYear = state.nepaliYear;

      if (dateData[state.currentMonthIndex].month === "चैत") {
        newYear += 1; // Increment year when moving from Chaitra to Baisakh
      }

      return { currentMonthIndex: nextIndex, nepaliYear: newYear };
    }),

  decrementMonth: () =>
    set((state) => {
      const prevIndex = (state.currentMonthIndex - 1 + 12) % 12;
      let newYear = state.nepaliYear;

      if (dateData[state.currentMonthIndex].month === "वैशाख") {
        newYear -= 1; // Decrement year when moving from Baisakh to Chaitra
      }

      return { currentMonthIndex: prevIndex, nepaliYear: newYear };
    }),

  setYear: (newYear) => set({ nepaliYear: newYear }),
  incrementYear: () => set((state) => ({ nepaliYear: state.nepaliYear + 1 })),
  decrementYear: () => set((state) => ({ nepaliYear: state.nepaliYear - 1 })),
}));
