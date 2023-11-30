import './App.css'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import AppRoutes from './routes/appRoutes'
// TODO: REVISAR CIERRES IMPLÍCITOS DE COMPONENTES

function App() {


  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer />

    </>
  )
}

export default App
