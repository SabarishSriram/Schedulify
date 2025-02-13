"use server";

import prisma from "@/lib/db";
import { eventTypeSchema, onboardingSchema, settingsSchema } from "./zodSchema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";
import { revalidatePath } from "next/cache";
import { title } from "process";
import { parseWithZod } from "@conform-to/zod";
import { nylas } from "@/lib/nylas";

export async function checkUsernameUnique(username: string) {
  const existingUser = await prisma.user.findUnique({
    where: { userName: username },
  });
  console.log(!existingUser);
  return !existingUser;
}

export async function submitForm(prevstate: any, formData: FormData) {
  const session = await requireUser();

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
  const no=await prisma.availability.findMany({
    where:{userId: session.user?.id}
  })
  console.log(no,"hi this is the problem")
  if(no.length>0){
    return redirect("/onboarding/grant-id")
  }
  else{
    const res = await prisma.availability.createMany({
      data: [
        {
          day: "Monday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
        {
          day: "Tuesday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
  
        },
        {
          day: "Wednesday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
        {
          day: "Thursday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
        {
          day: "Friday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
        {
          day: "Saturday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
        {
          day: "Sunday",
          fromtime: "08:00",
          totime: "18:00",
          isactive: true,
          userId:session.user?.id
        },
      ],
    });

  }
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
          where: { id: item.id , userId: session.user?.id},
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

export async function createEvent(prevstate: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videocallsoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });
  console.log(data);

  return redirect("/dashboard");
}

export async function updateEvent(prevstate: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.eventType.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videocallsoftware: submission.value.videoCallSoftware,
    },
  });
  console.log(data);

  return redirect("/dashboard");
}

export async function deleteEvent(formdata: FormData) {
  const session = requireUser();
  const data = await prisma.eventType.delete({
    where: {
      id: formdata.get("id") as string,
    },
  });
  return redirect("/dashboard");
}

export async function createMeeting(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      userName: formData.get("username") as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!getUserData) {
    throw new Error("User not found");
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get("eventTypeId") as string,
    },
    select: {
      title: true,
      description: true,
    },
  });

  const formTime = formData.get("fromTime") as string;
  const meetingLength = Number(formData.get("meetingLength"));
  const eventDate = formData.get("eventDate") as string;

  const startDateTime = new Date(`${eventDate}T${formTime}:00`);

  // Calculate the end time by adding the meeting length (in minutes) to the start time
  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  const res=await nylas.events.create({
    identifier: getUserData?.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: "Google Meet",
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: getUserData?.grantEmail as string,
      notifyParticipants: true,
    },
  });
  console.log(res)

  return redirect(`/success`);
}
