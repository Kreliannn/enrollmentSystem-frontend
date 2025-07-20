"use client"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Home,
  GraduationCap,
  UserPlus2,
  ClipboardList,
  FolderPlus,
  LogOut,
  Printer
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/pages/registar/home",
    icon: Home, // Home dashboard
  },
  {
    title: "Create Student Account",
    url: "/pages/registar/createAccount",
    icon: UserPlus2, // Add user
  },
  {
    title: "Enroll Regular Student",
    url: "/pages/registar/enrollRegular",
    icon: GraduationCap, // Academic-related
  },
  {
    title: "Enroll Irregular Student ",
    url: "/pages/registar/enrollIrreg",
    icon: FolderPlus, // Folder for custom enrollments
  },
  {
    title: "Print Student Form",
    url: "/pages/registar/printForm",
    icon:   Printer
  },
];

const accountItems = [
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];


interface AppSidebarProps {
  className?: string
}

export function RegistarSideBar({ className }: AppSidebarProps) {
  return (
    <Sidebar className={className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="font-semibold flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={"/ncstLogo.png"} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="grid text-left text-sm leading-tight">
                  <span className="truncate font-bold">NCST</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">Registar</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Section</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {accountItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
