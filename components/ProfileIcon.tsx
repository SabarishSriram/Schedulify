
import { auth, signOut } from "@/lib/auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";

async function ProfileIcon() {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full h-full rounded-full overflow-hidden">
          <Image
            src={session?.user?.image as string}
            alt="profile image"
            width={20}
            height={20}
            className="rounded-full size-10"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 px-3 py-2 ">
            <div className=" h-full rounded-full overflow-hidden">
              <Image
                src={session?.user?.image as string}
                alt="profile image"
                width={20}
                height={20}
                className="rounded-full size-8"
              />
            </div>
            <div className="font-bold">
              {session?.user?.name}
              <p className="font-normal dark:text-slate-300 text-gray-600">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="w-full flex items-center gap-3"
            href="/dashboard/settings"
          >
            <Settings className="ml-3 size-15" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form
            action={async () => {
                "use server"
                await signOut();

            }}
            className="w-full cursor-pointer flex items-center gap-3"
          >
            <button className="flex w-full items-center gap-3">
              <LogOut className="ml-3 size-15" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileIcon;
