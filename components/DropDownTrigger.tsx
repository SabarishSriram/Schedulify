"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
} from "lucide-react";
import { DashboardLinks } from "./DashboardLinks";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

export function MobileSidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? setIsOpen(false) : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="dark:hover:bg-gray-900 block md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Open sidebar menu</span>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className=""
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close sidebar menu</span>
        </Button>

        <div className="flex flex-col w-full py-5">
          <div className="hidden md:block rounded-br-3xl mt-1 ">
            <div className="flex justify-center border-b items-center h-20">
              <Link className="flex items-center space-x-2" href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="size-6 sm:size-8 md:size-9"
                />
                <span className="font-semibold text-lg sm:text-xl md:text-2xl">
                  <span className="font-semibold text-primary text-lg sm:text-xl md:text-2xl">
                    Sched
                  </span>
                  ulify
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <DashboardLinks />
          </div>
        </div>
      </div>
    </>
  );
}
