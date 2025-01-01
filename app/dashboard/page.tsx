"use client";
import { requireUser } from "@/lib/hooks";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

function page() {
  const signout = async () => {
    const session = await requireUser();
    await signOut();
  };
  return (
    <div className="">
      Welcomet o dashboard
      <button className="text-black" onClick={() => signout()}>
        Signout
      </button>
    </div>
  );
}

export default page;
