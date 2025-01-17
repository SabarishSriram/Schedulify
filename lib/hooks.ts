"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  return session;
}
export async function initialvalue(){
  const session = await auth();
  return session?.user?.name
}