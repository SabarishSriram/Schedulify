"use server";

import prisma from "@/lib/db";
import { onboardingSchema } from "./zodSchema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";

export async function checkUsernameUnique(username: string) {
  const existingUser = await prisma.user.findUnique({
    where: { userName: username },
  });
  console.log(!existingUser);
  return !existingUser;
}

export async function submitForm(prevstate: any, formData: FormData) {
  const session = await auth();

  const validatedFields = onboardingSchema.safeParse({
    name: formData.get("name"),
    userName: formData.get("userName"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten() };
  }

  const { name, userName } = validatedFields.data;

  const isUnique = await checkUsernameUnique(userName);
  if (!isUnique) {
    return { error:  ["Username is already taken"]};
  }

  const data = await prisma.user.update({
    where: { id: session?.user?.id },
    data: {
      name,
      userName,
    },
  });
  console.log(data);
  return redirect("/onboarding/grant-id");
}

export async function settingsForm(prevstate:any,formdata:FormData) {
  const session = await requireUser();
  const validatedFields = onboardingSchema.safeParse({
    name: formdata.get("name"),
  });
  console.log("validated fields",validatedFields)
  if (validatedFields){
    console.log("lexgoo its WORKING!!!💦💦💦💦")
    // const data = await prisma.user.update({
    //   where:{id:session?.user?.id},
    //   data:{
        
    //   }
    // })
  }

}