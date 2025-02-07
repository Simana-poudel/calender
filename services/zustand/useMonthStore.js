import { create } from "zustand";

export const useMonthStore = create((set) => ({
  currentMonthIndex: 0, // Initial index for the starting month
  nepaliYear: 0, // Initialize nepaliYear in the state
  setMonthIndex: (index) => set({ currentMonthIndex: index }), // Action to set the month index
  incrementMonth: () =>
    set((state) => {
      const nextIndex = (state.currentMonthIndex + 1) % 12; // Move to the next month, looping after 12 months
      return { currentMonthIndex: nextIndex };
    }),
  decrementMonth: () =>
    set((state) => {
      const prevIndex = (state.currentMonthIndex - 1 + 12) % 12; // Move to the previous month, looping before 0
      return { currentMonthIndex: prevIndex };
    }),
  setYear: (newYear) => set({ nepaliYear: newYear }), // Setter to update Nepali year
  incrementYear: () => set((state) => ({ nepaliYear: state.nepaliYear + 1 })), // Increment Nepali year by 1
  decrementYear: () => set((state) => ({ nepaliYear: state.nepaliYear - 1 })), // Decrement Nepali year by 1
}));
