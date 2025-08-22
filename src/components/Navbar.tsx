import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'

interface NavbarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const { config } = useConfig()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Collections', id: 'collections' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
    { name: 'Admin', id: 'admin' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-serif font-bold text-primary hover:text-primary-light transition-colors"
            >
              {config.websiteName}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-primary bg-primary-light/10'
                      : 'text-gray-700 hover:text-primary hover:bg-primary-light/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentPage === item.id
                    ? 'text-primary bg-primary-light/10'
                    : 'text-gray-700 hover:text-primary hover:bg-primary-light/5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
