"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const nepaliMonths = [
  `वैशाख`,
  `जेठ`,
  `असार`,
  `श्रावण`,
  `भाद्र`,
  `असोज`,
  `कार्तिक`,
  `मङ्सिर`,
  `पुष`,
  `माघ`,
  `फाल्गुण`,
  `चैत`,
];

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMonth = searchParams.get("month") || "";
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  useEffect(() => {
    setSelectedMonth(initialMonth);
  }, [initialMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const params = new URLSearchParams(window.location.search);
    if (month) {
      params.set("month", month);
    } else {
      params.delete("month");
    }
    router.push(`?${params.toString()}`);
  };

  const handleRemoveFilter = () => {
    setSelectedMonth("");
    const params = new URLSearchParams(window.location.search);
    params.delete("month");
    params.delete("name");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-4 flex gap-2">
      <Select value={selectedMonth} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={`Month`} />
        </SelectTrigger>
        <SelectContent>
          {nepaliMonths.map((month, index) => (
            <SelectItem key={index} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedMonth && (
        <Button variant={"outline"} onClick={handleRemoveFilter}>
          Remove Filter
          <Trash2 />
        </Button>
      )}
    </div>
  );
};

export default Filter;
