import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, MapPin, ChevronDown, Menu, X } from 'lucide-react'
import { useMovie } from '../context/MovieContext'
import { cities } from '../data/mockData'

const Navbar = () => {
  const location = useLocation()
  const { selectedCity, setSelectedCity, searchTerm, setSearchTerm } = useMovie()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MovieBox</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for movies, events, plays, sports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city)
                        setIsCityDropdownOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        selectedCity === city ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/movies"
                className={`text-sm font-medium transition-colors ${
                  isActive('/movies') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Movies
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive('/') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive('/movies') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Movies
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar