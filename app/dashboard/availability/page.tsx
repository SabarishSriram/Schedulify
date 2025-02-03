import Availability from "@/components/Availability";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";

async function page() {
  await requireUser();
  const data = await prisma.availability.findMany({
    select: {
      day: true,
      isactive: true,
      fromtime: true,
      totime: true,
      id: true,
    },
  });

  return (
    <div className="p-4">
      <Availability data={data} />
    </div>
  );
}

export default page;
