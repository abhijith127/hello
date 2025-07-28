import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Clock, Calendar, Play, Share, Heart } from 'lucide-react'
import { useMovie } from '../context/MovieContext'

const MovieDetails = () => {
  const { id } = useParams()
  const { movies, loading } = useMovie()
  
  const movie = movies.find(m => m.id === parseInt(id))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movie not found</h2>
          <Link to="/movies" className="text-primary-600 hover:text-primary-700">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="w-48 h-72 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-white flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold">{movie.rating}</span>
                    <span className="text-sm opacity-80 ml-1">/10</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/book/${movie.id}`}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Book Tickets
                  </Link>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-colors flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Trailer
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg backdrop-blur-sm transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg backdrop-blur-sm transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the movie</h2>
              <p className="text-gray-700 leading-relaxed">{movie.description}</p>
            </div>

            {/* Cast & Crew */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast & Crew</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Director</h3>
                  <p className="text-gray-700">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section (Placeholder) */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium text-gray-900">John Doe</span>
                    <span className="ml-2 text-sm text-gray-600">2 days ago</span>
                  </div>
                  <p className="text-gray-700">
                    Amazing movie! Great visuals and storyline. Definitely worth watching in theatres.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium text-gray-900">Jane Smith</span>
                    <span className="ml-2 text-sm text-gray-600">1 week ago</span>
                  </div>
                  <p className="text-gray-700">
                    Excellent cinematography and performances. Highly recommended!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Movie Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration</span>
                  <p className="text-gray-900">{movie.duration}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Genre</span>
                  <p className="text-gray-900">{movie.genre.join(', ')}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Language</span>
                  <p className="text-gray-900">{movie.language.join(', ')}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Release Date</span>
                  <p className="text-gray-900">
                    {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Book */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Now</h3>
              <p className="text-gray-600 mb-4">
                Don't miss out! Book your tickets now and enjoy this amazing movie.
              </p>
              <Link
                to={`/book/${movie.id}`}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center block"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails