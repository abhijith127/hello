import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockMovies, mockCinemas, mockShowtimes } from '../data/mockData'

const MovieContext = createContext()

export const useMovie = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider')
  }
  return context
}

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [cinemas, setCinemas] = useState([])
  const [showtimes, setShowtimes] = useState([])
  const [selectedCity, setSelectedCity] = useState('Mumbai')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setMovies(mockMovies)
      setCinemas(mockCinemas)
      setShowtimes(mockShowtimes)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre)
    const matchesLanguage = !selectedLanguage || movie.language.includes(selectedLanguage)
    
    return matchesSearch && matchesGenre && matchesLanguage
  })

  const value = {
    movies,
    cinemas,
    showtimes,
    selectedCity,
    setSelectedCity,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    selectedLanguage,
    setSelectedLanguage,
    filteredMovies,
    loading,
    bookingData,
    setBookingData
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}