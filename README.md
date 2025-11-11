# StockTracker - Real-time Stock Tracking App

A modern, futuristic stock tracking application built with React, featuring real-time stock data, advanced search, and beautiful charts.

## Features

- 📈 **Real-time Stock Data** - Get up-to-date information on stocks worldwide
- 🇮🇳 **Indian Stocks Focus** - Popular Indian stocks prominently displayed
- 🌍 **International Markets** - Sidebar showing popular stocks from different countries
- 🔍 **Advanced Search** - Intelligent search with fuzzy matching and suggestions
- 📊 **Interactive Charts** - Beautiful charts powered by Recharts
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Futuristic UI** - Modern design with glassmorphism and smooth animations

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Charting library
- **Axios** - HTTP client
- **Fuse.js** - Fuzzy search

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. **No API key needed!** The app uses Yahoo Finance API which is completely free and requires no setup.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

**That's it!** The app is ready to use. 🚀

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── StockCard.jsx
│   └── StockChart.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── StockDetail.jsx
│   └── SearchResults.jsx
├── services/         # API services
│   └── stockApi.js
├── utils/            # Utility functions
│   └── searchUtils.js
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## API Configuration

The app uses **Yahoo Finance API** which is:
- ✅ **100% Free** - No cost, no credit card needed
- ✅ **No API Key Required** - Works immediately
- ✅ **Works for Indian Stocks** - Supports NSE (.NS) and BSE (.BO) symbols
- ✅ **Works for International Stocks** - USA, UK, Japan, China, Germany, etc.
- ✅ **Real-time Data** - Live stock prices and charts

No configuration needed! The app is ready to use right away.

For more details, see [API_SETUP.md](./API_SETUP.md)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Home Page
- Displays popular Indian stocks in a grid layout
- Right sidebar shows international stocks grouped by country
- Auto-refreshes every 5 minutes

### Stock Detail Page
- Comprehensive stock information
- Interactive price chart
- Real-time price updates

### Search
- Advanced search with autocomplete
- Fuzzy matching for typos
- Search results with stock details

## Customization

### Adding More Stocks

Edit `src/services/stockApi.js`:
- Update `INDIAN_STOCKS` array with NSE/BSE symbols
- Add more countries to `INTERNATIONAL_STOCKS` object

### Styling

The app uses CSS modules. Main styles are in:
- `src/index.css` - Global styles
- `src/App.css` - App-level styles
- Component-specific CSS files in respective component folders

## Future Enhancements

- User portfolios and watchlists
- Price alerts
- News integration
- Historical data analysis
- Dark/light theme toggle
- More chart types and timeframes

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
