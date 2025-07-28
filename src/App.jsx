import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import BookingPage from './pages/BookingPage'
import { MovieProvider } from './context/MovieContext'

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/book/:movieId" element={<BookingPage />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App