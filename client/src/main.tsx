import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {CookiesProvider} from "react-cookie"
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from "react-router-dom"
import { ThemeProvider } from './providers/theme-provider.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route/>
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
