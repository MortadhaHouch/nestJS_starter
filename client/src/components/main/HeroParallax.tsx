import { HeroParallax as HeroParallaxRoot } from "../ui/hero-parallax";

export function HeroParallax() {
  return <HeroParallaxRoot products={products} />;
}
export const products = [
  {
    title: "Kanban Board",
    link: "/kanban",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/10010/10010378.png", // placeholder
  },
  {
    title: "Task Scheduler",
    link: "/tasks",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/4320/4320337.png", // placeholder
  },
  {
    title: "Team Collaboration",
    link: "/teams",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/11898/11898101.png", // placeholder
  },
  {
    title: "AI Assistant",
    link: "/ai",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/7630/7630501.png", // placeholder
  },
  {
    title: "Analytics Dashboard",
    link: "/analytics",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/893/893257.png", // placeholder
  },
  {
    title: "Notifications Center",
    link: "/notifications",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/1827/1827392.png", // placeholder
  },
  {
    title: "Documentation",
    link: "/docs",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/5352/5352390.png", // placeholder
  },
  {
    title: "Project Templates",
    link: "/templates",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/9131/9131562.png", // placeholder
  },
  {
    title: "Time Tracking",
    link: "/time-tracking",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/1055/1055646.png", // placeholder
  },
  {
    title: "File Manager",
    link: "/files",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/4222/4222615.png", // placeholder
  },
  {
    title: "Blog / Updates",
    link: "/blog",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/10613/10613083.png", // placeholder
  },
  {
    title: "Settings",
    link: "/settings",
    thumbnail:
      "https://cdn-icons-png.flaticon.com/512/2099/2099058.png", // placeholder
  },
];
