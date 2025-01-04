"use client";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  HomeIcon,
  LucideProps,
  Settings,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface DashboardLinksProps {
  id: number;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
export const links: DashboardLinksProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
  },
  {
    id: 3,
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 4,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col space-y-2 px-4">
      {links.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-forground hover:bg-"," flex gap-3 h-10 items-center justify-start rounded-lg transition-all px-6"
          )}
          key={link.id}
          href={link.href}
        >
          <link.icon className="size-4" />
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
