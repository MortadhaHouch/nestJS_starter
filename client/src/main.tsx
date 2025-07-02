import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {CookiesProvider} from "react-cookie"
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from "react-router-dom"
import { ThemeProvider } from './providers/theme-provider.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import KanbanBoard from './components/main/KanbanBoard.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<Signup />}/>
      <Route path='kanban' element={<KanbanBoard />}/>
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
