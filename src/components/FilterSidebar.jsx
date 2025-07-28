import React from 'react'
import { X } from 'lucide-react'
import { useMovie } from '../context/MovieContext'
import { genres, languages } from '../data/mockData'

const FilterSidebar = ({ isOpen, onClose }) => {
  const {
    selectedGenre,
    setSelectedGenre,
    selectedLanguage,
    setSelectedLanguage,
  } = useMovie()

  const clearFilters = () => {
    setSelectedGenre('')
    setSelectedLanguage('')
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 lg:w-64 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-md lg:hidden"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Genre</h4>
            <div className="space-y-2">
              {genres.map((genre) => (
                <label key={genre} className="flex items-center">
                  <input
                    type="radio"
                    name="genre"
                    value={genre}
                    checked={selectedGenre === genre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{genre}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="genre"
                  value=""
                  checked={selectedGenre === ''}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">All Genres</span>
              </label>
            </div>
          </div>

          {/* Language Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Language</h4>
            <div className="space-y-2">
              {languages.map((language) => (
                <label key={language} className="flex items-center">
                  <input
                    type="radio"
                    name="language"
                    value={language}
                    checked={selectedLanguage === language}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{language}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value=""
                  checked={selectedLanguage === ''}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">All Languages</span>
              </label>
            </div>
          </div>

          {/* Price Range (Static for demo) */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">₹0 - ₹200</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">₹201 - ₹400</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">₹401+</span>
              </label>
            </div>
          </div>

          {/* Cinema Type (Static for demo) */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Cinema Type</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">IMAX</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">4DX</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Dolby Atmos</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar