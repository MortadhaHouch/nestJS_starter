import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router'

export default function Dashboard() {
  return (
    <main className='flex flex-col justify-start items-center w-full min-h-screen overflow-x-hidden'>
      <SidebarProvider>
        <Sidebar/>
        <Outlet/>
      </SidebarProvider>
    </main>
  )
}
