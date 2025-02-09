"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface iAppProps {
    text: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
  
    className?: string;
  }

export function SubmitButton({ text, variant, className }: iAppProps) {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button disabled variant="outline" className={cn("w-fit", className)}>
            <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            variant={variant}
            type="submit"
            className={cn("w-fit", className)}
          >
            {text}
          </Button>
        )}
      </>
    );
  }