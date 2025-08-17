import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { Sidebar } from './Sidebar'
import { Outlet,Navigate } from 'react-router'
import { useCookies } from 'react-cookie'

export default function Dashboard() {
  const [cookie,] = useCookies(['auth_token'])
  return (
    <main className='flex flex-col items-center justify-start w-full min-h-screen overflow-x-hidden'>
      {
        cookie.auth_token ? (
          <SidebarProvider>
            <Sidebar/>
            <Outlet/>
          </SidebarProvider>
        ):(
          <Navigate to='/login'/>
        )
      }
    </main>
  )
}
