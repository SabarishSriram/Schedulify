import { EditEventTypeForm } from "@/components/EditEventType";
import prisma from "@/lib/db";
import React from "react";

async function getData(id: string) {
  const data = await prisma.eventType.findUnique({
    where: { id: id },
    select: {
      id: true,
      description: true,
      duration: true,
      title: true,
      url: true,
      videocallsoftware: true,
    },
  });
  return data;
}

async function page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  return (
    <div>
      <EditEventTypeForm
        description={data?.description ?? ""}
        callProvider={data?.videocallsoftware ?? ""}
        id={data?.id ?? ""}
        duration={data?.duration ?? 0}
        title={data?.title ?? ""}
        url={data?.url ?? ""}
        key={data?.id ?? ""}
      />
    </div>
  );
}

export default page;
