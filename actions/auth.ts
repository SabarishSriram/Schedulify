import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
export const logIn = async (provider: string) => {
  console.log(provider);
  

  // await signOut();
};
