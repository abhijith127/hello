import React, { useState } from 'react'
import { Filter, Grid, List } from 'lucide-react'
import { useMovie } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
import FilterSidebar from '../components/FilterSidebar'
import { Link } from 'react-router-dom'

const Movies = () => {
  const { filteredMovies, loading, selectedCity, searchTerm } = useMovie()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Movies in {selectedCity}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredMovies.length} movies found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms to find more movies.
                </p>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} showBookButton={true} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredMovies.map((movie) => (
                      <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden fade-in">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-48 md:h-auto">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                  {movie.title}
                                </h3>
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                  <span>{movie.duration}</span>
                                  <span className="mx-2">•</span>
                                  <span>{movie.genre.join(', ')}</span>
                                  <span className="mx-2">•</span>
                                  <span>{movie.language.join(', ')}</span>
                                </div>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                  {movie.description}
                                </p>
                                <div className="flex items-center">
                                  <div className="flex items-center text-yellow-500 mr-4">
                                    <span className="text-lg font-semibold">{movie.rating}</span>
                                    <span className="text-sm text-gray-600 ml-1">/10</span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Director:</span> {movie.director}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0 md:ml-6">
                                <Link
                                  to={`/book/${movie.id}`}
                                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies