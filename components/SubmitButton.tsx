"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import google from "../public/google.svg";
import github from "../public/github.svg";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

function SubmitButton() {
  const [googlePending, setGooglePending] = useState(false);
  const [githubPending, setGithubPending] = useState(false);

  const logIn = async (provider: string) => {
    if (provider === "google") {
      setGooglePending(true);
      console.log(provider);
      await signIn(provider, { callbackUrl: "/dashboard" });
      setGooglePending(false);
    } else {
      setGithubPending(true);
      console.log(provider);
      await signIn(provider, { callbackUrl: "/dashboard" });
      setGithubPending(false);
    }
  };

  return (
    <div className="space-y-3">
      {googlePending ? (
        <Button variant="outline" className="text-base w-full cursor-not-allowed">
          <Loader2 strokeWidth={3} className="text-primary animate-spin  " />
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => logIn("google")}
          className="text-base w-full flex justify-center items-center"
        >
          <Image src={google} alt="google icon" className="size-5" />
          Sign in with Google
        </Button>
      )}

      {githubPending ? (
        <Button variant="outline" className="text-base w-full cursor-not-allowed ">
          <Loader2
            strokeWidth={3}
            className="size-7 animate-spin text-primary "
          />
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => {
            logIn("github");
          }}
          className="text-base w-full flex justify-center items-center"
        >
          <Image src={github} alt="google icon" className="size-5" />
          Sign in with Github
        </Button>
      )}
    </div>
  );
}

export default SubmitButton;
