import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authurl = nylas.auth.urlForOAuth2({
    redirectUri: nylasConfig.redirectUri,
    clientId: nylasConfig.clientId,
  });

  return redirect(authurl);
}
