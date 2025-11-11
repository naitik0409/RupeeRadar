import { useEffect, useState } from 'react';
import { getMultipleStockQuotes, INDIAN_STOCKS, INTERNATIONAL_STOCKS } from '../services/stockApi';
import StockCard from '../components/StockCard';
import './MarketOverview.css';

const MarketOverview = () => {
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchAllStocks = async () => {
      setIsLoading(true);
      
      // Get all stocks from different markets
      const allSymbols = [
        ...INDIAN_STOCKS,
        ...INTERNATIONAL_STOCKS.USA,
        ...INTERNATIONAL_STOCKS.UK,
        ...INTERNATIONAL_STOCKS.Japan,
        ...INTERNATIONAL_STOCKS.China,
        ...INTERNATIONAL_STOCKS.Germany,
      ];
      
      const data = await getMultipleStockQuotes(allSymbols);
      
      // Map stocks with their symbols
      const stocksWithSymbols = data
        .map((stock, index) => ({
          stock,
          symbol: allSymbols[index],
        }))
        .filter(item => item.stock && item.stock['Global Quote']);
      
      // Sort by change percentage (trending = biggest movers)
      const sorted = stocksWithSymbols.sort((a, b) => {
        const changeA = parseFloat(a.stock['Global Quote']['10. change percent']?.replace('%', '') || 0);
        const changeB = parseFloat(b.stock['Global Quote']['10. change percent']?.replace('%', '') || 0);
        return Math.abs(changeB) - Math.abs(changeA);
      });
      
      setTrendingStocks(sorted);
      
      // Organize by market
      const organized = {
        indian: stocksWithSymbols.filter(item => INDIAN_STOCKS.includes(item.symbol)),
        usa: stocksWithSymbols.filter(item => INTERNATIONAL_STOCKS.USA.includes(item.symbol)),
        uk: stocksWithSymbols.filter(item => INTERNATIONAL_STOCKS.UK.includes(item.symbol)),
      };
      
      setMarketData(organized);
      setIsLoading(false);
    };

    fetchAllStocks();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchAllStocks, 300000);
    return () => clearInterval(interval);
  }, []);

  const getDisplayStocks = () => {
    switch (activeTab) {
      case 'trending':
        return trendingStocks.slice(0, 20);
      case 'indian':
        return marketData.indian || [];
      case 'usa':
        return marketData.usa || [];
      case 'uk':
        return marketData.uk || [];
      default:
        return trendingStocks;
    }
  };

  return (
    <div className="market-overview-container">
      <div className="market-header">
        <h1>Market Overview</h1>
        <p className="market-subtitle">
          Track trending stocks and market movements across global exchanges. 
          Discover the biggest movers, top performers, and market trends in real-time. 
          Analyze market sentiment and identify investment opportunities.
        </p>
      </div>

      <div className="market-hero">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" 
          alt="Market Overview" 
          loading="lazy"
        />
        <div className="hero-stats-overlay">
          <div className="stat-box">
            <div className="stat-value">{trendingStocks.length}</div>
            <div className="stat-label">Stocks Tracked</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">6</div>
            <div className="stat-label">Markets</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Live Updates</div>
          </div>
        </div>
      </div>

      <div className="market-tabs">
        <button
          className={`market-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Markets
        </button>
        <button
          className={`market-tab ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => setActiveTab('trending')}
        >
          🔥 Trending
        </button>
        <button
          className={`market-tab ${activeTab === 'indian' ? 'active' : ''}`}
          onClick={() => setActiveTab('indian')}
        >
          🇮🇳 Indian
        </button>
        <button
          className={`market-tab ${activeTab === 'usa' ? 'active' : ''}`}
          onClick={() => setActiveTab('usa')}
        >
          🇺🇸 USA
        </button>
        <button
          className={`market-tab ${activeTab === 'uk' ? 'active' : ''}`}
          onClick={() => setActiveTab('uk')}
        >
          🇬🇧 UK
        </button>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading market data...</p>
        </div>
      ) : (
        <>
          <div className="market-info">
            <p>
              {activeTab === 'trending' 
                ? 'Showing the biggest market movers based on percentage change. These stocks are experiencing significant price movements today.'
                : activeTab === 'all'
                ? 'Browse all stocks from major global markets. Click on any stock to view detailed information and charts.'
                : `Showing stocks from the ${activeTab.toUpperCase()} market. Track performance and analyze trends.`
              }
            </p>
          </div>
          <div className="market-grid">
            {getDisplayStocks().map((item, index) => (
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

export default MarketOverview;
