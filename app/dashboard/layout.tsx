import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import logo from "../../public/logo.png";
import { Togglebutton } from "@/components/Togglebutton";
import { DashboardLinks } from "@/components/DashboardLinks";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileSidebarMenu } from "@/components/DropDownTrigger";
import ProfileIcon from "@/components/ProfileIcon";
import { requireUser } from "@/lib/hooks";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
async function layout({ children }: { children: ReactNode }) {
  const session = await requireUser();

  const onboarding = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: { userName: true, grantId: true },
  });
  if (onboarding?.userName === null) {
    return redirect("/onboarding");
  }
  if (onboarding?.grantId === null) {
    return redirect("/onboarding/grant-id");
  }
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen w-full grid md:grid-cols-[250px_1fr]">
          <div className="hidden md:block rounded-br-3xl bg-muted">
            <div className="flex justify-center border-b items-center h-20">
              <Link className="flex items-center space-x-2" href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="size-6 sm:size-8 md:size-9"
                />
                <span className="font-semibold text-lg sm:text-xl md:text-2xl">
                  <span className="font-semibold text-primary text-lg sm:text-xl md:text-2xl">
                    Sched
                  </span>
                  ulify
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-center w-full py-5">
              <DashboardLinks />
            </div>
          </div>
          <div>
            <div className="h-20 bg-muted flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <MobileSidebarMenu />
                <div className="block md:hidden rounded-br-3xl mt-1 ">
                  <div className="flex h-20">
                    <Link className="flex items-center space-x-2" href="/">
                      <Image src={logo} alt="logo" className="size-9" />
                      <span className="font-semibold text-xl ">
                        <span className="font-semibold text-primary text-xl ">
                          Sched
                        </span>
                        ulify
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProfileIcon />
                <Togglebutton />
              </div>
            </div>
            {children}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default layout;
