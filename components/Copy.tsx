"use client";
import { CopyIcon } from "lucide-react";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface data {
  url: string;
}
function Copy(data: data) {
  const {toast} = useToast()
  const handlecopy = () => {
    navigator.clipboard.writeText(data.url);
    toast({
        title: "Copied to Clipboard!",
        description: data.url,
        className:"bg-primary/80 dark:text-white"
      })
    }

  return (
    <DropdownMenuItem onClick={() => handlecopy()}>
      <CopyIcon className="mr-2 h-4 w-4" />
      <span>Copy</span>
    </DropdownMenuItem>
  );
}

export default Copy;
