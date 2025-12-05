"use client"

import * as React from "react"
import Image from "next/image"
import {
  Calendar,
  PillBottle,
  Workflow,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Usuario",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg", 
  },
  navMain: [
    {
      title: "Agendamentos",
      url: "#",
      icon: Calendar,
      isActive: true,
    },
    {
      title: "Serviços",
      url: "#",
      icon: Workflow,
    },
    {
      title: "Produtos",
      url: "#",
      icon: PillBottle,
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <div className="flex flex-row gap-2 items-center">
        <div className="relative flex aspect-square size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
           <Image
            src="/logo.png" 
            alt="Logo All4Pets"
            width={40} 
            height={40}
            className="object-contain"
          />
        </div>

        <div className="flex items-center leading-none">
          <span className="font-bold text-lg text-[#00897B] group-data-[collapsible=icon]:hidden">All4 Pets</span>
        </div>
      </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} /> {/* Pessoal */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
