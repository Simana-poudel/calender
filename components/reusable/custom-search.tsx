"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";

interface CustomSearchProps {
  placeholder?: string;
}

const CustomSearch = ({ placeholder }: CustomSearchProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const currentSearch = searchParams.get("name") || "";

    if (debouncedInputValue !== currentSearch) {
      if (debouncedInputValue) {
        router.push(
          `${currentUrl.origin}${currentUrl.pathname}?name=${debouncedInputValue}`
        );
      } else {
        router.push(`${currentUrl.origin}${currentUrl.pathname}`);
      }
    }
  }, [debouncedInputValue, router]);

  return (
    <Input
      placeholder={placeholder}
      ref={searchInputRef}
      onChange={handleInputChange}
      className="h-9 max-w-sm"
    />
  );
};

export default CustomSearch;
