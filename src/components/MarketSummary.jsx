import { useEffect, useState } from 'react';
import { getStockQuote } from '../services/stockApi';
import './MarketSummary.css';

const MARKET_INDICES = {
  'US': [
    { symbol: '^GSPC', name: 'S&P 500' },
    { symbol: '^DJI', name: 'Dow 30' },
    { symbol: '^IXIC', name: 'Nasdaq' },
    { symbol: '^RUT', name: 'Russell 2000' },
    { symbol: '^VIX', name: 'VIX' },
    { symbol: 'GC=F', name: 'Gold' },
  ],
  'Europe': [
    { symbol: '^FTSE', name: 'FTSE 100' },
    { symbol: '^GDAXI', name: 'DAX' },
    { symbol: '^FCHI', name: 'CAC 40' },
  ],
  'Asia': [
    { symbol: '^N225', name: 'Nikkei 225' },
    { symbol: '^HSI', name: 'Hang Seng' },
    { symbol: '000001.SS', name: 'Shanghai' },
  ],
};

const MarketSummary = () => {
  const [activeTab, setActiveTab] = useState('US');
  const [marketData, setMarketData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true);
      const indices = MARKET_INDICES[activeTab] || MARKET_INDICES['US'];
      const data = {};

      for (const index of indices) {
        try {
          const quote = await getStockQuote(index.symbol);
          if (quote && quote['Global Quote']) {
            data[index.symbol] = {
              ...index,
              quote: quote['Global Quote'],
            };
          }
        } catch (error) {
          console.error(`Error fetching ${index.symbol}:`, error);
        }
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setMarketData(data);
      setIsLoading(false);
    };

    fetchMarketData();
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchMarketData, 120000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const indices = MARKET_INDICES[activeTab] || MARKET_INDICES['US'];

  return (
    <div className="market-summary">
      <div className="market-summary-header">
        <h3 className="market-summary-title">Market Summary</h3>
        <div className="market-tabs">
          {Object.keys(MARKET_INDICES).map((tab) => (
            <button
              key={tab}
              className={`market-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="market-indices-grid">
        {isLoading ? (
          <div className="market-loading">Loading...</div>
        ) : (
          indices.map((index) => {
            const data = marketData[index.symbol];
            if (!data || !data.quote) return null;

            const price = parseFloat(data.quote['05. price'] || 0);
            const change = parseFloat(data.quote['09. change'] || 0);
            const changePercent = parseFloat(data.quote['10. change percent']?.replace('%', '') || 0);
            const isPositive = change >= 0;

            // Generate simple sparkline data (mock for now)
            const sparklineData = Array.from({ length: 20 }, () => 
              price + (Math.random() - 0.5) * price * 0.02
            );

            return (
              <div key={index.symbol} className="market-index-card">
                <div className="index-header">
                  <div className="index-name">{index.name}</div>
                  <div className={`index-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                  </div>
                </div>
                <div className="index-value">{price.toFixed(2)}</div>
                <div className={`index-change-amount ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? '+' : ''}{change.toFixed(2)}
                </div>
                <div className="index-sparkline">
                  <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <polyline
                      points={sparklineData.map((val, i) => `${(i / (sparklineData.length - 1)) * 100},${30 - ((val - Math.min(...sparklineData)) / (Math.max(...sparklineData) - Math.min(...sparklineData) || 1)) * 30}`).join(' ')}
                      fill="none"
                      stroke={isPositive ? '#16c784' : '#ea3943'}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MarketSummary;

