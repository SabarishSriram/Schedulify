"use client";
import React, { useActionState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SubmitButton } from "./FormButton";
import Image from "next/image";
import { settingsForm, submitForm } from "@/actions/prismaAction";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema, settingsSchema } from "@/actions/zodSchema";
interface SettingsFormProps {
  name: string;
  email: string;
  image: string;
}

function SettingsForm({ email, name, image }: SettingsFormProps) {
     const [state, action] = useActionState(settingsForm, null)
     const [form, fields] = useForm({
         onValidate({ formData }) {
           return parseWithZod(formData, {
             schema: settingsSchema,
           });
         },
         shouldValidate: "onBlur",
         shouldRevalidate: "onInput",
       });
  return (
    <>
      <Card className="mx-5 my-5 shadow-xl">
        <CardHeader>
          <CardTitle>Settings </CardTitle>
          <CardDescription>Manage your account settings!</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent>
          <div className="grid w-full items-center gap-6">
            <div>
              <Label className="">Profile Picture</Label>
              <Image width={100} src={image} className="mt-3 rounded-sm" height={100} alt="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label> Full Name</Label>
              <Input
                id={fields.name.key}
                className=""
                defaultValue={name}
                placeholder="Full Name"
              />
              <p className="text-red-500 text-sm">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Email</Label>
              <div className="flex rounded-md">
                <Input
                disabled
                defaultValue={email}
                />
              </div>
            </div>
          </div>

          <SubmitButton className="px-10 mt-5" text="Save Changes" />
        </CardContent>
        </form>
      </Card>
    </>
  );
}

export default SettingsForm;
