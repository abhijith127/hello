import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Clock, Calendar, ChevronLeft, Users } from 'lucide-react'
import { useMovie } from '../context/MovieContext'
import { format, addDays } from 'date-fns'

const BookingPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const { movies, cinemas, showtimes, selectedCity } = useMovie()
  
  const movie = movies.find(m => m.id === parseInt(movieId))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedCinema, setSelectedCinema] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [step, setStep] = useState(1) // 1: Cinema & Time, 2: Seats, 3: Payment

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  // Get showtimes for selected movie, cinema, and date
  const getShowtimes = (cinemaId) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    return showtimes.find(s => 
      s.movieId === parseInt(movieId) && 
      s.cinemaId === cinemaId && 
      s.date === dateStr
    )?.times || []
  }

  // Generate seat layout (simplified)
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 12
    const seats = []
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`
        const isBooked = Math.random() < 0.3 // 30% seats randomly booked
        seats.push({
          id: seatId,
          row,
          number: i,
          isBooked,
          isSelected: selectedSeats.includes(seatId)
        })
      }
    })
    
    return seats
  }

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
    } else if (selectedSeats.length < 6) { // Max 6 seats
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleBooking = () => {
    if (!selectedCinema || !selectedTime || selectedSeats.length === 0) {
      alert('Please select cinema, time, and seats')
      return
    }
    
    // Simulate booking
    alert(`Booking confirmed for ${selectedSeats.length} seats!`)
    navigate('/')
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movie not found</h2>
          <button onClick={() => navigate('/movies')} className="text-primary-600 hover:text-primary-700">
            Back to Movies
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/movie/${movieId}`)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{movie.title}</h1>
                <p className="text-gray-600">{movie.genre.join(', ')} • {movie.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Select Shows</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Select Seats</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 p-3 rounded-lg border text-center min-w-[80px] ${
                      format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {format(date, 'EEE')}
                    </div>
                    <div className="text-lg font-semibold">
                      {format(date, 'd')}
                    </div>
                    <div className="text-xs text-gray-600">
                      {format(date, 'MMM')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cinema Selection */}
            <div className="space-y-4">
              {cinemas.map((cinema) => {
                const cinemaTimes = getShowtimes(cinema.id)
                
                return (
                  <div key={cinema.id} className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cinema.name}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{cinema.location} • {cinema.distance}</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">{cinema.rating}/5</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {cinema.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {cinemaTimes.length > 0 && (
                      <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {cinemaTimes.map((timeSlot, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedCinema(cinema)
                                setSelectedTime(timeSlot)
                              }}
                              className={`p-3 border rounded-lg text-center transition-colors ${
                                selectedCinema?.id === cinema.id && selectedTime?.time === timeSlot.time
                                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-medium">{timeSlot.time}</div>
                              <div className="text-sm text-gray-600">₹{timeSlot.price}</div>
                              <div className="text-xs text-green-600">
                                {timeSlot.seats.available} seats
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {selectedCinema && selectedTime && (
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Select Seats
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Seat Map */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Seats</h2>
              
              {/* Screen */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-200 text-gray-600 px-8 py-2 rounded-t-lg text-sm">
                  SCREEN THIS WAY
                </div>
              </div>

              {/* Seat Legend */}
              <div className="flex justify-center space-x-6 mb-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-600 rounded mr-2"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>Booked</span>
                </div>
              </div>

              {/* Seats */}
              <div className="max-w-2xl mx-auto">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
                  <div key={row} className="flex items-center justify-center mb-2">
                    <div className="w-6 text-center text-gray-600 text-sm font-medium mr-4">
                      {row}
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: 12 }, (_, i) => {
                        const seatId = `${row}${i + 1}`
                        const isBooked = Math.random() < 0.3
                        const isSelected = selectedSeats.includes(seatId)
                        
                        return (
                          <button
                            key={seatId}
                            onClick={() => !isBooked && handleSeatClick(seatId)}
                            disabled={isBooked}
                            className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                              isBooked
                                ? 'bg-red-500 text-white cursor-not-allowed'
                                : isSelected
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            {i + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Seats Summary */}
            {selectedSeats.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Selected Seats</h3>
                    <p className="text-gray-600">
                      {selectedSeats.join(', ')} • ₹{selectedTime.price * selectedSeats.length}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBooking}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPage