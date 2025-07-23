import { Outlet } from "react-router";

export default function Workspaces() {
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen pt-20">
      <Outlet/>
    </main>
  )
}
