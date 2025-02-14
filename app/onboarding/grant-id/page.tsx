import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { DotPattern } from "@/components/ui/magicui/dot-pattern";
import { cn } from "@/lib/utils";

async function page() {
  const session = await auth();
  const name = session?.user?.name;

  return (
    <div className="min-h-screen bg-black dark:bg-white px-6  max-w-screen flex items-center justify-center">
      <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className={cn(
                "[mask-image:radial-gradient(600px,white,transparent)] fill-neutral-600/50 dark:[mask-image:radial-gradient(600px,white,transparent)]  fill-neutral-400/80"
              )}
            />
      <Card className="w-[500px] mx-auto my-auto shadow-xl z-30">
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
