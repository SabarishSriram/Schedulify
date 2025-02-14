import { EmptyState } from "@/components/EmptyState";
import { SubmitButton } from "@/components/FormButton";
import { auth } from "@/lib/auth";
import { nylas } from "@/lib/nylas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

import React from "react";
import { cancelMeetingAction } from "@/actions/prismaAction";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
      eventType: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
      busy: true,
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);
  console.log(data.data);
  return (
    <div className="p-5">
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />{" "}
                      <Link
                        className="text-xs text-primary underline underline-offset-4"
                        target="_blank"
                        href={item.conferencing.details.url}
                      >
                        Join Meeting
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <div className="flex ml-auto items-center">
                    <Link
                      className="mr-5"
                      target="_blank"
                      href={item.conferencing.details.url}
                    >
                      <Button className="dark:text-white">Join Meeting</Button>
                    </Link>
                    <SubmitButton
                      text="Cancel Event"
                      variant="destructive"
                      className="w-fit flex"
                    />
                  </div>
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MeetingsPage;
