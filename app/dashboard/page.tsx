"use server";
import { Dock, DockIcon } from "@/components/ui/dock";
import { requireUser } from "@/lib/hooks";

async function page() {
  const session = await requireUser();
  console.log(session);

  return (
    <div className="">
      Welcome to dashboard
      <form action="">
        <button className="primary" type="submit">
          Signout
        </button>
      </form>
    </div>
  );
}

export default page;
