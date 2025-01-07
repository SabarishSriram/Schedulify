"use server";
import { requireUser } from "@/lib/hooks";

async function page() {
  // const session = await requireUser();
  // console.log(session);

  return (
    <div className="">
      Welcome to dashboard
      <form action="">
      </form>
    </div>
  );
}

export default page;
