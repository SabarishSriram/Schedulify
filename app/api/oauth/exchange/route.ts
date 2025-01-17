import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  console.log("code: ", code);

  if (!code) {
    return NextResponse.json({
      message: "No authorization code returned from Nylas",
      status: 400,
    });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });
    const { grantId, email } = response;
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { grantId: grantId, grantEmail: email },
    });

    console.log({ grantId });
  } catch (error) {
    console.error("something went wrong",error);
  }

  return redirect("/dashboard");
}
