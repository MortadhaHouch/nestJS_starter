import './App.css'
import { Outlet } from "react-router-dom"
import Header from './components/main/Header'
import Footer from './components/main/Footer'
import 'lenis/dist/lenis.css'
import Lenis from "lenis"
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Example easing function
        smoothWheel:true,
        autoResize:true,
        gestureOrientation:"both",
    })
    function raf(time:number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
        lenis.destroy()
    }
}, [])
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
