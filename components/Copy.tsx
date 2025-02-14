"use client";
import { CopyIcon } from "lucide-react";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface data {
  url: string;
}
function Copy(data: data) {
  const handlecopy = () => {
    navigator.clipboard.writeText(data.url);
    
  };

  return (
    <DropdownMenuItem onClick={() => handlecopy()}>
      <CopyIcon className="mr-2 h-4 w-4" />
      <span>Copy</span>
    </DropdownMenuItem>
  );
}

export default Copy;
