"use client";
import React, { useActionState } from "react";

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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { zodSchema } from "@/actions/zodSchema";
import { Loader2 } from "lucide-react";

export default function CardWithForm() {
  const [state, action, ispending] = useActionState(submitForm, undefined);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: zodSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  console.log(ispending);
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
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label> Full Name</Label>
                <Input
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue}
                  id={fields.name.key}
                  className=""
                  placeholder="Full Name"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Username</Label>
                <div className="flex rounded-md">
                  <span className="flex-inline bg-muted  px-3 text-sm border-r-0 text-muted-foreground py-2 rounded-l-lg border border-muted">
                    Schedulify.com/
                  </span>
                  <Input
                    name={fields.userName.name}
                    defaultValue={fields.userName.initialValue}
                    id={fields.userName.key}
                    className="rounded-l-none border-l-0 border focus:ring-0"
                    placeholder="test"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.userName.errors}</p>
              </div>
            </div>

            <Button className="w-full mt-6" type="submit">
              {ispending ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
