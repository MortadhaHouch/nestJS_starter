import { IoMdLogIn } from "react-icons/io";
import { FaInfo, FaMagic, FaUsers, FaTrello, FaUsersCog, FaRobot, FaBell, FaChartBar, FaCalendarAlt, FaEdit } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import ModeToggle from "./mode-toggle";
import { Home, LogInIcon, BookOpen, MessageCircle, LucideLayoutDashboard } from "lucide-react";
import { useCookies } from "react-cookie";

const features = [
  {
    title: "Kanban Boards",
    to: "/kanban",
    description: "Visualize and manage tasks with drag-and-drop Kanban boards.",
    icon: FaTrello,
  },
  {
    title: "Team Collaboration",
    to: "/teams",
    description: "Assign roles, manage team workflows, and boost collaboration.",
    icon: FaUsersCog,
  },
  {
    title: "AI Assistant",
    to: "/ai",
    description: "Leverage AI to summarize tasks, auto-prioritize and more.",
    icon: FaRobot,
  },
  {
    title: "Notifications",
    to: "/notifications",
    description: "Real-time updates for task mentions, deadlines, and activities.",
    icon: FaBell,
  },
  {
    title: "Analytics",
    to: "/analytics",
    description: "Track productivity, velocity, and team performance over time.",
    icon: FaChartBar,
  },
  {
    title: "Task Scheduler",
    to: "/tasks",
    description: "Efficiently manage tasks with a task scheduler.",
    icon: FaCalendarAlt,
  },
  {
    title: "MDX Editor",
    to: "/mdx",
    description: "Create and edit MDX files for advanced formatting and styling.",
    icon: FaEdit,
  }
];

export default function Header() {
  const [cookies,,] = useCookies(["auth_token"]);
  return (
    <header className="flex fixed top-0 left-0 z-50 flex-row justify-between items-center px-2 py-1 w-full backdrop-blur-3xl backdrop-opacity-60 sm:px-4 lg:px-6 lg:py-2">
      <h1>
        <NavLink to="/" className="text-lg font-bold leading-none transition-colors duration-300 md:text-1xl lg:text-2xl text-primary hover:text-primary/80">
          TaskVortex
        </NavLink>
      </h1>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="flex justify-between items-center px-4 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex gap-2 items-center p-3 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
              <Home className="w-4 h-4" /> <span>Home</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <NavLink
                      className="flex flex-col justify-end p-6 w-full h-full no-underline rounded-xl transition-all duration-300 select-none group glass hover:scale-105 hover:shadow-lg outline-hidden focus:shadow-md"
                      to="/"
                    >
                      <div className="flex gap-3 items-center mb-4">
                        <div className="p-3 rounded-xl transition-colors duration-300 bg-primary/10 group-hover:bg-primary/20">
                          <Home className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-lg font-medium transition-colors duration-300 group-hover:text-primary">TaskVortex</div>
                      </div>
                      <p className="text-sm leading-tight transition-colors duration-300 text-muted-foreground group-hover:text-muted-foreground/80">
                        Collaborate, track, and ship work faster — your team's all-in-one productivity platform.
                      </p>
                    </NavLink>
                  </NavigationMenuLink>
                </li>
                <ListItem to="/getting-started" title="Getting Started" icon={FaMagic}>
                  Learn how to set up your workspace and onboard your team.
                </ListItem>
                <ListItem to="/pricing" title="Pricing" icon={FaChartBar}>
                  Explore flexible plans for individuals, startups, and teams.
                </ListItem>
                <ListItem to="/faq" title="FAQ" icon={FaInfo}>
                  Answers to the most common questions about TaskVortex.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex gap-2 items-center p-3 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
              <FaMagic className="w-4 h-4" /> <span>Features</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {features.map((feature) => (
                  <ListItem key={feature.title} title={feature.title} to={feature.to} icon={feature.icon}>
                    {feature.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink to="/about" className="flex flex-row gap-2 items-center p-2 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
                <FaInfo className="w-4 h-4" /> <span>About</span>
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex gap-2 items-center p-3 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
              <FaUsers className="w-4 h-4" /> <span>Resources</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <ListItem to="/blog" title="Blog" icon={BookOpen}>Interact with the TaskVortex communities and get the latest updates.</ListItem>
                <ListItem to="/docs" title="Documentation" icon={MessageCircle}>Developer docs and integration guides.</ListItem>
                <ListItem to="/community" title="Community" icon={FaUsers}>Join our forum, Discord, or events.</ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {
            cookies.auth_token && (
              <NavigationMenuItem>
                <NavigationMenuLink href="/dashboard" className="flex flex-row gap-2 items-center p-2 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
                  <LucideLayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          {
            !cookies.auth_token ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login" className="flex flex-row gap-2 items-center p-2 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
                    <IoMdLogIn className="w-4 h-4" /> <span>Login</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/signup" className="flex flex-row gap-2 items-center p-2 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
                      <LogInIcon className="w-4 h-4" /> <span>Signup</span>
                    </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink href="/login" className="flex flex-row gap-2 items-center p-2 font-medium rounded-xl transition-all duration-300 glass hover:scale-105 hover:shadow-lg">
                  <IoMdLogIn className="w-4 h-4" /> <span>Login</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </header>
  );
}

function ListItem({
  title,
  children,
  to,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { 
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <NavLink to={to} className="block p-4 rounded-xl transition-all duration-300 group glass hover:scale-105 hover:shadow-lg hover:bg-white/20 dark:hover:bg-black/20">
          <div className="flex gap-3 items-start">
            {Icon && (
              <div className="flex-shrink-0 p-2 rounded-lg transition-colors duration-300 bg-primary/10 group-hover:bg-primary/20">
                <Icon className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-2 text-sm font-medium leading-none transition-colors duration-300 group-hover:text-primary">{title}</div>
              <p className="text-sm leading-snug transition-colors duration-300 text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80">{children}</p>
            </div>
          </div>
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
}
