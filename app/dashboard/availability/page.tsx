import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import React from "react";

async function page() {
  const session = await requireUser();
  const data = await prisma.availability.findMany({
    select: { day: true },
  });
  console.log(data);
  return <div>
    {data.map((day) => (<>
      <h1>{day.day}</h1>
    </>))}
  </div>;
}

export default page;
