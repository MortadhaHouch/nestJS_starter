import React from 'react'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '../ui/sidebar'

export default function Sidebar() {
  return (
    <SidebarMenuItem>
        <SidebarMenuButton />
        <SidebarMenuSub>
            <SidebarMenuSubItem>
                <SidebarMenuSubButton />
            </SidebarMenuSubItem>
                <SidebarMenuSubItem>
            <SidebarMenuSubButton />
            </SidebarMenuSubItem>
        </SidebarMenuSub>
    </SidebarMenuItem>
  )
}
