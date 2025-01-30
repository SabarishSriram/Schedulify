import Availability from "@/components/Availability";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";

async function page() {
  await requireUser();
  const data = await prisma.availability.findMany({
    select: { day: true, isactive: true, fromtime: true, totime: true },
  });
  
  return (
    <>
    <Availability data={data} />
    </>
    
  );
}

export default page;
