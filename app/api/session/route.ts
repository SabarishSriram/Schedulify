import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth(); // Fetch the session
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  return NextResponse.json({data: session });
}
