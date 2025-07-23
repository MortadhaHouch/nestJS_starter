import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { Sidebar } from './Sidebar'
import { Outlet,Navigate } from 'react-router'
import { useCookies } from 'react-cookie'

export default function Dashboard() {
  const [cookie,] = useCookies(['auth_token'])
  return (
    <main className='flex overflow-x-hidden flex-col justify-start items-center w-full min-h-screen'>
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
