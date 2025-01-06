
import { signIn, signOut } from "next-auth/react";
export const logIn = async (provider:String) => {
  await signIn(provider as string);
};
