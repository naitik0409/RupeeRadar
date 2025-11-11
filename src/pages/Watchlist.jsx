import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWatchlist } from '../utils/watchlist';
import { getMultipleStockQuotes } from '../services/stockApi';
import StockCard from '../components/StockCard';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setIsLoading(true);
      const symbols = getWatchlist();
      
      if (symbols.length === 0) {
        setIsLoading(false);
        return;
      }

      const data = await getMultipleStockQuotes(symbols);
      const stocksWithSymbols = data
        .map((stock, index) => ({
          stock,
          symbol: symbols[index],
        }))
        .filter(item => item.stock && item.stock['Global Quote']);
      
      setWatchlistStocks(stocksWithSymbols);
      setIsLoading(false);
    };

    fetchWatchlist();
    
    // Refresh every minute
    const interval = setInterval(fetchWatchlist, 60000);
    return () => clearInterval(interval);
  }, []);

  const symbols = getWatchlist();

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
        <p className="watchlist-subtitle">
          Monitor your favorite stocks in one place. Track performance, view charts, and stay updated with real-time data.
        </p>
      </div>

      {symbols.length === 0 ? (
        <div className="empty-watchlist">
          <div className="empty-icon">⭐</div>
          <h2>Your Watchlist is Empty</h2>
          <p>
            Start building your watchlist by adding stocks you want to track. 
            Click the watchlist button on any stock card or detail page to add it here.
          </p>
          <div className="empty-actions">
            <Link to="/" className="browse-link">
              Browse Stocks
            </Link>
            <Link to="/market" className="browse-link secondary">
              Explore Markets
            </Link>
          </div>
          <div className="empty-info">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
              alt="Watchlist" 
              loading="lazy"
            />
            <div className="info-text">
              <h3>Why Use a Watchlist?</h3>
              <p>
                A watchlist helps you monitor multiple stocks simultaneously without having to search for them each time. 
                Track your portfolio, compare performance, and get quick access to detailed information and charts.
              </p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your watchlist...</p>
        </div>
      ) : (
        <>
          <div className="watchlist-stats">
            <div className="stat-card">
              <div className="stat-value">{watchlistStocks.length}</div>
              <div className="stat-label">Stocks in Watchlist</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {watchlistStocks.filter(item => {
                  const change = parseFloat(item.stock['Global Quote']['10. change percent']?.replace('%', '') || 0);
                  return change > 0;
                }).length}
              </div>
              <div className="stat-label">Gaining</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {watchlistStocks.filter(item => {
                  const change = parseFloat(item.stock['Global Quote']['10. change percent']?.replace('%', '') || 0);
                  return change < 0;
                }).length}
              </div>
              <div className="stat-label">Declining</div>
            </div>
          </div>
          <div className="watchlist-grid">
            {watchlistStocks.map((item, index) => (
              <StockCard
                key={index}
                stock={item.stock}
                symbol={item.symbol}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
