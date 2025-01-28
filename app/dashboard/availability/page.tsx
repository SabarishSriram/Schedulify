import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { times } from "@/lib/times";
async function page() {
  await requireUser();
  const data = await prisma.availability.findMany({
    select: { day: true, isactive: true, fromtime: true, totime: true },
  });
  
  return (
    <div className="max-w-screen justify-center items-center p-5 ">
      <Card className=" min-w-full shadow-xl">
        <CardHeader>
          <CardTitle>Settings </CardTitle>
          <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justift-center gap-y-4">
          {data.map((item) => (
            <div key={item.day} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-5">
              <div  className="flex items-center gap-4">
                <Switch checked={item.isactive} />
                <p>{item.day}</p>
                <p>{item.fromtime}</p>
              </div>

              <Select defaultValue={item.fromtime}>
                <SelectTrigger>
                  <SelectValue placeholder="From time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map(time=>(
                    <SelectItem key={time.id} value={time.time}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={item.totime}>
                <SelectTrigger>
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
