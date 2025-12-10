"use client"

import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.url === '/' 
            ? pathname === '/' 
            : pathname.startsWith(item.url);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive} 
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <Link href={item.url} className="w-full">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </Link>
              </SidebarMenuItem>
            </Collapsible>
          )})}
      </SidebarMenu>
    </SidebarGroup>
  )
}