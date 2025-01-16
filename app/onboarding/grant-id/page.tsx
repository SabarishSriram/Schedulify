import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import emailImg from "@/public/Email API.png";
import { auth } from "@/lib/auth";
import Link from "next/link";

async function page() {
  const session = await auth();
  const name = session?.user?.name;

  return (
    <div className="min-h-screen px-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-violet-500 to-purple-700 max-w-screen flex items-center justify-center">
      <Card className="w-[500px] mx-auto my-auto shadow-xl">
        <CardHeader>
          <CardTitle>{name}, you are almost done!</CardTitle>
          <CardDescription>
            We have to connect now your calendar to your account.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="w-full flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              {" "}
              {/* Container for layout */}
              <div className="relative w-full h-48">
                {" "}
                {/* Wrapper with fixed height */}
                <Image
                  src="https://www.nylas.com/wp-content/uploads/nylas-contacts-api-solution.png"
                  className="object-cover rounded-lg" // Tailwind utility for fit
                  alt="Nylas Contacts API"
                  fill // Use `fill` layout
                />
              </div>
              <div className="relative w-full h-48">
                {" "}
                {/* Wrapper with fixed height */}
                <Image
                  src="https://www.nylas.com/wp-content/uploads/nylas-calendar-api-solution.png"
                  className="object-cover rounded-lg" // Tailwind utility for fit
                  alt="Nylas Calendar API"
                  fill // Use `fill` layout
                />
              </div>
            </div>
            <Button className="mt-6">
              <Link className="w-full flex items-center gap-3" href="/api/auth">
                <CalendarIcon /> Connect Calendar to your Account
              </Link>
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default page;
