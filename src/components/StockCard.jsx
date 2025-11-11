import { Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton';
import './StockCard.css';

const StockCard = ({ stock, symbol }) => {
  if (!stock || !stock['Global Quote']) {
    return null;
  }

  const quote = stock['Global Quote'];
  const price = parseFloat(quote['05. price'] || 0);
  const change = parseFloat(quote['09. change'] || 0);
  const changePercent = parseFloat(quote['10. change percent']?.replace('%', '') || 0);
  const isPositive = change >= 0;
  
  // Determine currency symbol based on stock symbol
  const isIndianStock = symbol.includes('.NS') || symbol.includes('.BO');
  const currencySymbol = isIndianStock ? '₹' : '$';
  const displaySymbol = symbol.replace('.NS', '').replace('.BO', '');

  return (
    <div className="stock-card-wrapper">
      <Link to={`/stock/${symbol}`} className="stock-card">
        <div className="stock-card-header">
          <div className="stock-symbol">{displaySymbol}</div>
          <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </div>
        </div>
      <div className="stock-name">{quote['01. symbol'] || symbol}</div>
      <div className="stock-price">{currencySymbol}{price.toFixed(2)}</div>
      <div className="stock-details">
        <div className="stock-detail-item">
          <span className="detail-label">Change:</span>
          <span className={`detail-value ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{currencySymbol}{change.toFixed(2)}
          </span>
        </div>
        <div className="stock-detail-item">
          <span className="detail-label">Volume:</span>
          <span className="detail-value">{quote['06. volume'] || 'N/A'}</span>
        </div>
      </div>
      <div className="stock-card-glow"></div>
      </Link>
      <div className="stock-card-actions">
        <WatchlistButton symbol={symbol} />
      </div>
    </div>
  );
};

export default StockCard;

