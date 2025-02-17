import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="">
     <Navbar />
      <Hero/>
    </div>
  );
}

export default page;
