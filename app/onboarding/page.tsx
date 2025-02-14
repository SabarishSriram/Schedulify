"use client";
import React, { useActionState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitForm } from "@/actions/prismaAction";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/actions/zodSchema";
import { SubmitButton } from "@/components/FormButton";
import { useState } from "react";
import { DotPattern } from "@/components/ui/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function CardWithForm() {
  const [state, action] = useActionState(submitForm, null);
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [initialName, setInitialName] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/session");
      const { data } = await res.json();
      setInitialName(data.user.name);
    };
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen px-6 bg-black dark:bg-white max-w-screen flex items-center justify-center">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent)] fill-neutral-300/100 dark:[mask-image:linear-gradient(to_bottom,white,transparent)] fill-neutral-600/50"
        )}
      />
      <Card className="w-[500px] mx-auto my-auto shadow-xl z-30">
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
                  defaultValue={initialName}
                  id={fields.name.key}
                  className=""
                  placeholder="Full Name"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Username</Label>
                <div className="flex rounded-md">
                  <span className="flex-inline bg-muted   px-3 text-sm border-r-0 text-muted-foreground py-2 rounded-l-lg border border-muted">
                  schedulify.vercel.app/
                  </span>
                  <Input
                    name={fields.userName.name}
                    defaultValue={fields.userName.initialValue}
                    id={fields.userName.key}
                    className="rounded-l-none border-l-0 border focus:ring-0"
                    placeholder="username"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.userName.errors}</p>
                <p className="text-red-500 text-sm">
                  {state?.error.toString()}
                </p>
              </div>
            </div>

            <SubmitButton className="w-full mt-5" text="Submit" />
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
