import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {CookiesProvider} from "react-cookie"
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from "react-router-dom"
import { ThemeProvider } from './providers/theme-provider.tsx'
import Home from './pages/main/Home.tsx'
import About from './pages/main/About.tsx'
import Contact from './pages/main/Contact.tsx'
import Login from './pages/main/Login.tsx'
import Signup from './pages/main/Signup.tsx'
import Dashboard from './components/main/Dashboard.tsx'
import Faqs from './pages/main/Faqs.tsx'
import Pricing from './pages/main/Pricing.tsx'
import AIAssistant from './pages/dashboard/AIAssistant.tsx'
import Calendar from './pages/dashboard/Calendar.tsx'
import Friends from './pages/dashboard/Friends.tsx'
import History from './pages/dashboard/History.tsx'
import Inbox from './pages/dashboard/Inbox.tsx'
import Main from './pages/dashboard/Main.tsx'
import Notes from './pages/dashboard/Notes.tsx'
import Notifications from './pages/dashboard/Notifications.tsx'
import Search from './pages/dashboard/Search.tsx'
import Settings from './pages/dashboard/Settings.tsx'
import Tasks from './pages/dashboard/Tasks.tsx'
import Teams from './pages/dashboard/Teams.tsx'
import Workspaces from './pages/dashboard/Workspaces.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='faq' element={<Faqs />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route index element={<Main/>}/>
        <Route path='assistant' element={<AIAssistant/>}/>
        <Route path='calendar' element={<Calendar/>}/>
        <Route path='friends' element={<Friends/>}/>
        <Route path='history' element={<History/>}/>
        <Route path='inbox' element={<Inbox/>}/>
        <Route path='main' element={<Main/>}/>
        <Route path='notes' element={<Notes/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='tasks' element={<Tasks/>}/>
        <Route path='teams' element={<Teams/>}/>
        <Route path='workspaces' element={<Workspaces/>}/>        
      </Route>
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
)
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <ReactQueryDevtools initialIsOpen/>
          <RouterProvider router={router}/>
        </CookiesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
