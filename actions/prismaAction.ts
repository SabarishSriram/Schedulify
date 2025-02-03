"use server";

import prisma from "@/lib/db";
import { onboardingSchema, settingsSchema } from "./zodSchema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";
import { object } from "zod";
import { revalidatePath } from "next/cache";

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
    return { error: ["Username is already taken"] };
  }

  const data = await prisma.user.update({
    where: { id: session?.user?.id },
    data: {
      name,
      userName,
      availabilities: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Tuesday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Wednesday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Thursday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Friday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Saturday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
            {
              day: "Sunday",
              fromtime: "8:00",
              totime: "18:00",
              isactive: true,
            },
          ],
        },
      },
    },
  });
  console.log(data);
  return redirect("/onboarding/grant-id");
}

export async function settingsForm(prevstate: any, formdata: FormData) {
  const session = await requireUser();
  const validatedFields = settingsSchema.safeParse({
    name: formdata.get("name"),
  });
  if (validatedFields.success) {
    const data = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        name: validatedFields.data.name,
      },
    });
    console.log(data);
  }
  return redirect("/dashboard/settings");
}

export async function updateAvailabiltyAction(formdata: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formdata.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: { id: item.id },
          data: {
            isactive: item.isActive,
            fromtime: item.fromTime,
            totime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
    return { status: "success", message: "Availability updated successfully" };
  } catch (error) {
    console.error("Error updating availability:", error);
    return { status: "error", message: "Failed to update availability" };
  }
}
