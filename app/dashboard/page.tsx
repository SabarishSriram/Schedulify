"use server";
import { requireUser } from "@/lib/hooks";

async function page() {
  return (
    <div className="">
      Welcome to dashboard
      <form action="">
      </form>
    </div>
  );
}

export default page;
