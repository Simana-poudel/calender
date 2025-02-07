import { dateData } from "@/data/datesData";

export const getNepaliDate = () => {
  const englishDate = new Date(); // Today's English date
  const englishDateString = englishDate.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Loop through dateData to find the Nepali month that matches today's English date
  const monthData = dateData.find(
    (month) =>
      englishDateString >= month.startEnglishDate &&
      englishDateString <= month.endEnglishDate
  );

  if (monthData) {
    const monthIndex = dateData.indexOf(monthData); // Get the index of the month in dateData array
    return {
      nepaliMonth: monthData.month,
      nepaliYear:
        2081 + (parseInt(monthData.startEnglishDate.split("-")[0]) - 2025), // Adjust Nepali year
      nepaliMonthIndex: monthIndex, // Return the month index
    };
  }

  // Default if no match (error handling)
  return {
    nepaliMonth: "Invalid Month",
    nepaliYear: "Invalid Year",
    nepaliMonthIndex: -1, // Invalid index if no data found
  };
};
