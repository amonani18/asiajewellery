import { useState } from 'react'
import { ConfigProvider } from './context/ConfigContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'shop':
        return <Shop />
      case 'collections':
        return <Collections />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      case 'admin':
        return <Admin />
      default:
        return <Home />
    }
  }

  return (
    <ConfigProvider>
      <div className="min-h-screen bg-white">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  )
}

export default App
