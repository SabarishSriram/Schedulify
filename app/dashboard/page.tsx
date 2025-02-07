"use server";

import { EmptyState } from "@/components/EmptyState";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";

async function page() {
  const session = await requireUser();
  const data = await prisma.eventType.findMany({
    where: { userId: session.user?.id },
    select: { title: true, duration: true, url: true, description: true },
  });
  console.log(data);
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          buttonText="Add Event Type"
          description="You can create your first event by clicking the button below"
          href="/dashboard/new"
        />
      ) : (
        <div>
          {data.map((item) => (
            <div>{item.description}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default page;
