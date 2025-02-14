"use server";

import { EmptyState } from "@/components/EmptyState";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";
import Link from "next/link";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Copy from "@/components/Copy";

export default async function Page() {
  const session = await requireUser();
  const data = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: {
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
          description: true,
        },
      },
      userName: true,
    },
  });

  console.log(data);

  return (
    <div className="p-5">
      {data?.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          buttonText="Add Event Type"
          description="You can create your first event by clicking the button below"
          href="/dashboard/new"
        />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="sm:grid gap-1 hidden ">
              <CardTitle className="">Event Types</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create and manage your event types.
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create New Event</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-3 lg:grid-cols-3">
            {data?.eventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20" align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Copy url={`${process.env.NEXT_URL}/${data?.userName}/${item.url}`}/>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data?.userName}/${item.url}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pen className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/delete/${item.id}`}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={`/dashboard/event/${item.id}`}>
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users2 className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium truncate ">
                            {item.duration} Minutes Meeting
                          </dt>
                          <dd>
                            <div className="text-lg font-medium ">
                              {item.title}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="bg-muted dark:bg-gray-900 px-5 py-3 flex justify-between items-center">
                  <Switch defaultChecked={item.active}></Switch>
                  <Link href={`/dashboard/event/${item.id}`}>
                    <Button className="">Edit Event</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
