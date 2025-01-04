import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { requireUser } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { Dock, DockIcon } from "@/components/ui/dock";

async function page() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="">
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  );
}

export default page;
