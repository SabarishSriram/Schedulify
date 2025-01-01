import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { requireUser } from "@/lib/hooks";

async function page() {
  const session = await auth();
  console.log(session)
  return (
    <div className="">
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  );
}

export default page;
