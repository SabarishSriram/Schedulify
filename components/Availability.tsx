"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { times } from "@/lib/times";
import { Switch } from "./ui/switch";
import { SubmitButton } from "./FormButton";
interface data {
  day: string;
  isactive: boolean;
  fromtime: string;
  totime: string;
}
function Availability({ data }: { data: data[] }) {
  console.log("From Time:"); // Debugging
  console.log("Available Times:", times);
  return (
    <div className="max-w-screen justify-center items-center p-5 ">
      <Card className=" min-w-full shadow-xl">
        <CardHeader>
          <CardTitle>Settings </CardTitle>
          <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justift-center gap-y-4">
          {data.map((item) => (
            <div
              key={item.day}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-5"
            >
              <div className="flex items-center gap-4">
                <Switch checked={item.isactive} />
                <p>{item.day}</p>
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="8:00" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
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
          <SubmitButton text="Save Changes"/>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default Availability;
