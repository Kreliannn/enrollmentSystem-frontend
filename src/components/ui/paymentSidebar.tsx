"use client"
import Link from "next/link"
import {
  Home,
  BookOpen,
  PlusCircle,
  Layers3,
  UserPlus2,
  LogOut,
  Building2,
} from "lucide-react"
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
    LayoutDashboard,
    ListOrdered,
    CreditCard,
    FileBarChart2,
  } from "lucide-react";
  
  const navigationItems = [
    {
      title: "Dashboard",
      url: "/pages/payment/home",
      icon: LayoutDashboard, // better for "Dashboard"
    },
    {
      title: "Queue",
      url: "/pages/payment/queue",
      icon: ListOrdered, // represents a queue or ordered list
    },
    {
      title: "Payment",
      url: "/pages/payment/tuitionPayment",
      icon: CreditCard, // clearly represents payment
    },
    {
      title: "Transaction",
      url: "/pages/payment/transaction",
      icon: FileBarChart2, // suitable for transaction records
    },
  ];
  
const accountItems = [
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
]

interface AppSidebarProps {
  className?: string
}

export function PaymentSideBar({ className }: AppSidebarProps) {
  return (
    <Sidebar className={className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="font-semibold">
                <div className=" w-10 h-10   rounded-full">
                  <img src={"/ncstLogo.png"} className="w-10 h-10 rounded-full" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">NCST</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">Payment</span>
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
                    <Link href={item.url}>
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
                <Link href={item.url}>
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
