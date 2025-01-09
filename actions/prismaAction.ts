"use server";
import { requireUser } from "@/lib/hooks";
import { zodSchema } from "./zodSchema";
import { parseWithZod } from "@conform-to/zod";
import prisma from "@/lib/db";
export async function submitForm(prevstate: any, formdata: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formdata, {
    schema: zodSchema,
  });

  if (submission.status !== "success") {
    return submission.reply;
  }

  // const data = await prisma.user.update({
  //   where: { id: session.user?.id },
  //   data: {
  //     name: submission.value.name,
  //     userName: submission.value.userName,
  //   },
  // });
}
