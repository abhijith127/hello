# MovieBox - Movie Booking App

A modern movie ticket booking application similar to BookMyShow, built with React, Vite, and Tailwind CSS.

## Features

### 🎬 Movie Discovery
- Browse latest movies with beautiful card layouts
- Search movies by title, genre, or language
- Filter movies by genre, language, and other criteria
- View detailed movie information including cast, crew, and ratings
- Grid and list view options for movie browsing

### 🎯 Advanced Filtering
- Filter by genre (Action, Drama, Comedy, etc.)
- Filter by language (Hindi, English, Tamil, etc.)
- Price range filters
- Cinema type filters (IMAX, 4DX, Dolby Atmos)

### 🏢 Cinema Selection
- Browse movies across multiple cities
- View cinema details including location, facilities, and ratings
- Real-time seat availability
- Multiple showtime options

### 🎫 Booking System
- Multi-step booking process
- Date selection for next 7 days
- Cinema and showtime selection
- Interactive seat selection
- Booking confirmation

### 📱 Responsive Design
- Mobile-first responsive design
- Modern UI with smooth animations
- Optimized for all screen sizes
- Touch-friendly interface

### ⚡ Performance
- Fast loading with Vite
- Optimized images and assets
- Smooth transitions and animations
- Efficient state management

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Alias for dev server

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx     # Navigation bar
│   ├── MovieCard.jsx  # Movie display card
│   └── FilterSidebar.jsx # Filter controls
├── pages/             # Page components
│   ├── Home.jsx       # Homepage with featured movies
│   ├── Movies.jsx     # Movie listing page
│   ├── MovieDetails.jsx # Individual movie details
│   └── BookingPage.jsx # Movie booking flow
├── context/           # State management
│   └── MovieContext.jsx # Global movie state
├── data/              # Mock data
│   └── mockData.js    # Sample movies and cinemas
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Key Features Explained

### Movie Context
The app uses React Context for state management, providing:
- Movie data and loading states
- Search and filter functionality
- City selection
- Booking state management

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Mobile-optimized navigation
- Touch-friendly booking interface

### Filter System
- Real-time filtering of movies
- Multiple filter criteria
- Filter persistence across navigation
- Clear filter options

### Booking Flow
1. **Select Show**: Choose date, cinema, and showtime
2. **Select Seats**: Interactive seat map with availability
3. **Confirmation**: Review and confirm booking

## Customization

### Adding New Movies
Edit `src/data/mockData.js` to add new movies, cinemas, or showtimes.

### Styling
The app uses Tailwind CSS with a custom color palette. Modify `tailwind.config.js` to change colors and styling.

### Features
Add new features by:
1. Creating components in `src/components/`
2. Adding routes in `App.jsx`
3. Updating context for state management

## API Integration

Currently uses mock data. To integrate with a real API:

1. Replace mock data calls in `MovieContext.jsx`
2. Add API endpoints for:
   - Movies listing
   - Cinema data
   - Showtimes
   - Booking confirmation
3. Add error handling and loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please create an issue in the repository or contact the development team.

---

Built with ❤️ using React and modern web technologies.