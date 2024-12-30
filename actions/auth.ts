import { signIn } from "next-auth/react";

export const signin = async (provider:string) => {
  const res = await signIn(provider, { callbackUrl: "/" });
  console.log(res);
}