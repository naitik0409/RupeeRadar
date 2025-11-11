import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStockQuote, getIntradayData } from '../services/stockApi';
import StockChart from '../components/StockChart';
import WatchlistButton from '../components/WatchlistButton';
import './StockDetail.css';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      const data = await getStockQuote(symbol);
      setStockData(data);
      setIsLoading(false);
    };

    if (symbol) {
      fetchStockData();
      // Refresh every minute
      const interval = setInterval(fetchStockData, 60000);
      return () => clearInterval(interval);
    }
  }, [symbol]);

  if (isLoading) {
    return (
      <div className="stock-detail-container">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading stock information...</p>
        </div>
      </div>
    );
  }

  if (!stockData || !stockData['Global Quote']) {
    return (
      <div className="stock-detail-container">
        <div className="error-container">
          <h2>Stock not found</h2>
          <p>Unable to fetch data for {symbol}</p>
        </div>
      </div>
    );
  }

  const quote = stockData['Global Quote'];
  const price = parseFloat(quote['05. price'] || 0);
  const change = parseFloat(quote['09. change'] || 0);
  const changePercent = parseFloat(quote['10. change percent']?.replace('%', '') || 0);
  const isPositive = change >= 0;
  
  // Determine currency symbol based on stock symbol
  const isIndianStock = symbol.includes('.NS') || symbol.includes('.BO');
  const currencySymbol = isIndianStock ? '₹' : '$';
  const displaySymbol = symbol.replace('.NS', '').replace('.BO', '');

  const meta = stockData.meta || {};
  const formatMarketCap = (cap) => {
    if (!cap || cap === 0) return 'N/A';
    if (cap >= 1e12) return `${(cap / 1e12).toFixed(3)}T`;
    if (cap >= 1e9) return `${(cap / 1e9).toFixed(3)}B`;
    if (cap >= 1e6) return `${(cap / 1e6).toFixed(3)}M`;
    return cap.toLocaleString();
  };

  const stockInfo = [
    { label: 'Previous Close', value: `${currencySymbol}${parseFloat(quote['08. previous close'] || 0).toFixed(2)}` },
    { label: 'Open', value: `${currencySymbol}${parseFloat(quote['02. open'] || 0).toFixed(2)}` },
    { label: 'Bid', value: meta.bid ? `${currencySymbol}${meta.bid.toFixed(2)}` : '—' },
    { label: 'Ask', value: meta.ask ? `${currencySymbol}${meta.ask.toFixed(2)}` : '—' },
    { label: 'Market Cap (intraday)', value: formatMarketCap(meta.marketCap) },
    { label: 'Beta (5Y Monthly)', value: meta.beta ? meta.beta.toFixed(2) : 'N/A' },
    { label: 'PE Ratio (TTM)', value: meta.trailingPE ? meta.trailingPE.toFixed(2) : 'N/A' },
    { label: 'EPS (TTM)', value: meta.trailingEPS ? meta.trailingEPS.toFixed(2) : 'N/A' },
  ];

  return (
    <div className="stock-detail-container">
      <div className="stock-detail-header">
        <div className="stock-detail-title">
          <h1>{displaySymbol}</h1>
          <p className="stock-detail-name">{quote['01. symbol'] || symbol}</p>
        </div>
        <div className="stock-detail-header-right">
          <div className="stock-detail-price">
            <div className="price-value">{currencySymbol}{price.toFixed(2)}</div>
            <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '+' : ''}{currencySymbol}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </div>
          </div>
          <WatchlistButton symbol={symbol} />
        </div>
      </div>

      <div className="stock-detail-content">
        <div className="stock-detail-main">
          <div className="stock-detail-chart">
            <StockChart symbol={symbol} />
          </div>
          
          <div className="stock-detail-info">
            <h2 className="info-title">Statistics</h2>
            <div className="info-grid">
              {stockInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <span className="info-label">{info.label}</span>
                  <span className="info-value">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;

