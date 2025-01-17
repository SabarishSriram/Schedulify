import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import Link from "next/link";
import AuthDialog from "./AuthDialog";

function Navbar() {
  return (
    <div className="max-w-8xl mx-auto flex py-5 px-4 sm:px-6 lg:px-8 justify-between items-center">
      <div>
        <Link className="flex items-center space-x-2" href="/">
          <Image
            src={logo}
            alt="logo"
            className="size-6 sm:size-8 md:size-10"
          />
          <span className="font-semibold text-lg sm:text-xl md:text-2xl">
            <span
              className="font-semi
          bold text-primary text-lg sm:text-xl md:text-2xl"
            >
              Sched
            </span>
            ulify
          </span>
        </Link>
      </div>
      <div>
        <AuthDialog />
      </div>
    </div>
  );
}

export default Navbar;
