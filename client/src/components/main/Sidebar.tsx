import { Calendar, ChevronUp, Home, Inbox, LogOut, Search, Settings, User, User2,Bell,Users, Briefcase, ListChecks, TimerIcon, NotebookIcon, Users2 } from "lucide-react"
 
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { FaMoneyBill, FaRobot } from "react-icons/fa"
import { Badge } from "../ui/badge"
import { NavLink } from "react-router-dom"
// Menu items.
const items = [
  {
    title: "Home",
    url: "",
    icon: Home,
  },{
    title:"teams",
    url: "teams",
    icon: Users
  },{
    title:"Friends",
    url: "friends",
    icon: Users2
  },{
    title:"Workspaces",
    url: "workspaces",
    icon: Briefcase
  },{
    title:"Tasks",
    url: "tasks",
    icon: ListChecks
  },{
    title:"AI Assistant",
    url: "assistant",
    icon: FaRobot
  },{
    title: "Search",
    url: "search",
    icon: Search,
  },{
    title: "Notes",
    url: "notes",
    icon: NotebookIcon,
  },{
    title:"History",
    url: "history",
    icon: TimerIcon
  },{
    title: "Inbox",
    url: "inbox",
    icon: Inbox,
  },{
    title: "Calendar",
    url: "calendar",
    icon: Calendar,
  },{
    title: "Notifications",
    url: "notifications",
    icon: Bell,
    extra:"10"
  },{
    title: "Settings",
    url: "settings",
    icon: Settings,
  }
]

export function Sidebar() {
  return (
    <SidebarRoot className="fixed top-0 left-0 z-40 h-screen bg-gray-900">
      <SidebarTrigger className="absolute -right-5 top-20 z-10 p-2 rounded-md shadow-md border-1"/>
      <SidebarContent className="flex flex-col justify-center items-center p-2">
        <SidebarHeader className="flex flex-col gap-2 justify-center items-center">
          <div className="p-2 text-xl font-bold text-white bg-purple-800 rounded-full">
            MH
          </div>
          <h2>Mortadha Houch</h2>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="relative">
                      <item.icon />
                      <span>{item.title}</span>
                      {
                        item.extra && <Badge className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full">{isNaN(parseInt(item.extra))?item.extra:parseInt(item.extra)>9?"+9":item.extra}</Badge>
                      }
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row gap-2 items-center w-full">
              <User2 /> Account info
              <ChevronUp className="ml-auto" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <User/> <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaMoneyBill/> <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut/> <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarContent>
    </SidebarRoot>
  )
}