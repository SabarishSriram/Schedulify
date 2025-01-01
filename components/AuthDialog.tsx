import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../public/logo.png";
import SubmitButton from "./SubmitButton";

function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary">Try for Free</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogTitle className="flex items-center py-3 space-x-2 justify-center">
          <Image src={logo} alt="logo" className="size-9" />
          <span className="font-semibold text-xl sm:text-xl md:text-2xl text-black">
            <span
              className="font-semi
          bold text-primary text-lg sm:text-xl md:text-2xl"
            >
              Sched
            </span>
            ulify
          </span>
        </DialogTitle>
        <DialogDescription asChild>
          <SubmitButton />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
