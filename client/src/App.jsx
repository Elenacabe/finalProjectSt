import './App.css'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import AppRoutes from './routes/appRoutes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <>
      <Navigation></Navigation>
      <h1>HOLA</h1>
      <AppRoutes></AppRoutes>
      <Footer></Footer>

    </>
  )
}

export default App
