import { useState, useEffect } from 'react';
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from '../utils/watchlist';
import './WatchlistButton.css';

const WatchlistButton = ({ symbol, onToggle }) => {
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    setIsWatched(isInWatchlist(symbol));
  }, [symbol]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWatched) {
      removeFromWatchlist(symbol);
      setIsWatched(false);
    } else {
      addToWatchlist(symbol);
      setIsWatched(true);
    }
    
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      className={`watchlist-btn ${isWatched ? 'active' : ''}`}
      onClick={handleToggle}
      title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isWatched ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      {isWatched ? 'Watching' : 'Watch'}
    </button>
  );
};

export default WatchlistButton;

