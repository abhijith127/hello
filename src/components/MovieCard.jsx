import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock } from 'lucide-react'

const MovieCard = ({ movie, showBookButton = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 fade-in">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm flex items-center">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {movie.rating}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {movie.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{movie.duration}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie.genre.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {movie.language.slice(0, 2).map((lang, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
            >
              {lang}
            </span>
          ))}
          {movie.language.length > 2 && (
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
              +{movie.language.length - 2}
            </span>
          )}
        </div>
        
        {showBookButton && (
          <Link
            to={`/book/${movie.id}`}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center block font-medium"
          >
            Book Tickets
          </Link>
        )}
      </div>
    </div>
  )
}

export default MovieCard