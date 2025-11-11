import { useEffect, useState } from 'react';
import { getMultipleStockQuotes, INDIAN_STOCKS, INTERNATIONAL_STOCKS } from '../services/stockApi';
import StockCard from '../components/StockCard';
import MarketSummary from '../components/MarketSummary';
import './Home.css';

const Home = () => {
  const [indianStocks, setIndianStocks] = useState([]);
  const [internationalStocks, setInternationalStocks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      
      // Fetch Indian stocks
      const indianData = await getMultipleStockQuotes(INDIAN_STOCKS);
      setIndianStocks(indianData);

      // Fetch international stocks by country
      const internationalData = {};
      for (const [country, symbols] of Object.entries(INTERNATIONAL_STOCKS)) {
        const countryData = await getMultipleStockQuotes(symbols);
        internationalData[country] = countryData;
      }
      setInternationalStocks(internationalData);
      
      setIsLoading(false);
    };

    fetchStocks();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStocks, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="home-title">Track Stocks Worldwide</h1>
            <p className="home-subtitle">
              Real-time market data, interactive charts, and comprehensive insights for stocks from India and around the globe. 
              Make informed investment decisions with our powerful stock tracking platform.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Stocks Tracked</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Global Markets</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Real-time Data</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop" 
              alt="Stock Market Analytics" 
              loading="lazy"
            />
          </div>
        </div>
        <div className="home-features">
          <div className="feature-badge">
            <span className="badge-icon">⚡</span>
            <span>Real-time Updates</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">🌍</span>
            <span>Global Markets</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">📊</span>
            <span>Advanced Charts</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">🔍</span>
            <span>Smart Search</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">⭐</span>
            <span>Watchlist</span>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Popular Indian Stocks</h2>
        <p className="section-subtitle">Top performing stocks from NSE and BSE exchanges. Track the most traded and valuable companies in India.</p>
      </div>

      <div className="home-content">
        <main className="home-main">
          {isLoading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading stock data...</p>
            </div>
          ) : (
            <div className="stocks-grid">
              {indianStocks.map((stock, index) => (
                <StockCard
                  key={index}
                  stock={stock}
                  symbol={INDIAN_STOCKS[index]}
                />
              ))}
            </div>
          )}
        </main>

        <aside className="home-sidebar">
          <MarketSummary />
          <div className="international-section">
            <h2 className="sidebar-title">International Markets</h2>
            <p className="sidebar-description">Track popular stocks from major global exchanges including USA, UK, Japan, China, and Germany.</p>
            {Object.entries(internationalStocks).map(([country, stocks]) => (
              <div key={country} className="country-section">
                <h3 className="country-title">{country}</h3>
                <div className="sidebar-stocks">
                  {stocks.map((stock, index) => (
                    <StockCard
                      key={index}
                      stock={stock}
                      symbol={INTERNATIONAL_STOCKS[country][index]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="info-section">
        <div className="info-card">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
            alt="Market Analysis" 
            loading="lazy"
          />
          <div className="info-content">
            <h3>Comprehensive Market Analysis</h3>
            <p>Get detailed insights into stock performance with our advanced analytics. View historical data, trends, and key financial metrics all in one place.</p>
          </div>
        </div>
        <div className="info-card">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
            alt="Global Markets" 
            loading="lazy"
          />
          <div className="info-content">
            <h3>Global Market Coverage</h3>
            <p>Access stocks from over 50 countries and major exchanges worldwide. From Indian NSE/BSE to NYSE, NASDAQ, and international markets.</p>
          </div>
        </div>
        <div className="info-card">
          <img 
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop" 
            alt="Real-time Data" 
            loading="lazy"
          />
          <div className="info-content">
            <h3>Real-time Data Updates</h3>
            <p>Stay ahead with live stock prices, market movements, and instant notifications. Our platform updates every minute to keep you informed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
