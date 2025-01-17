import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import Nylas from "nylas";

export async function GET() {
  const authurl = nylas.auth.urlForOAuth2({
    redirectUri: nylasConfig.redirectUri,
    clientId: nylasConfig.clientId,
  });
  console.log("nylas: ", );
  console.log("nylasConfig: ", nylasConfig);
  
  console.log("authurl: ", authurl);
  

  return redirect(authurl);
}