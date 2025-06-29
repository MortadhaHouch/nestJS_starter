import './App.css'
import { Outlet } from "react-router-dom"
import Header from './components/main/Header'
import Footer from './components/main/Footer'
function App() {

  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
