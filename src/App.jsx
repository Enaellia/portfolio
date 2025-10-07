import { Outlet } from 'react-router-dom'
import './styles/global.css'
import Header from './components/Header'
import Footer from './components/Footer' // si tu en as déjà un; sinon on le crée après

export default function App() {
  return (
    <div className="wrapper">
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
