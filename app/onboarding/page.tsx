import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitForm } from "@/actions/prismaAction";

export default function CardWithForm() {
  return (
    <div className="min-h-screen max-w-screen flex items-center justify-center">
      <Card className="w-[400px] mx-auto my-auto shadow-xl">
        <CardHeader>
          <CardTitle>
            Welcome To <span className="text-primary">Sched</span>ulify
          </CardTitle>
          <CardDescription>
            We need the following information to setup your profile.
          </CardDescription>
        </CardHeader>
        <form >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label> Full Name</Label>
                <Input name="fullname" className="" placeholder="Full Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Username</Label>
                <div className="flex rounded-md">
                  <span className="flex-inline bg-muted  px-3 text-sm border-r-0 text-muted-foreground py-2 rounded-l-lg border border-muted">
                    Schedulify.com/
                  </span>
                  <Input
                    name="username"
                    className="rounded-l-none border-l-0 border focus:ring-0"
                    placeholder="test"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full mt-6" type="submit">
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
