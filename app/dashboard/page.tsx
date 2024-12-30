import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  console.log(session);
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default page;
