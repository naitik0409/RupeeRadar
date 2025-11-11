// Watchlist utility functions using localStorage

const WATCHLIST_KEY = 'stockTracker_watchlist';

// Get watchlist from localStorage
export const getWatchlist = () => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error('Error reading watchlist:', error);
    return [];
  }
};

// Add stock to watchlist
export const addToWatchlist = (symbol) => {
  try {
    const watchlist = getWatchlist();
    if (!watchlist.includes(symbol)) {
      watchlist.push(symbol);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

// Remove stock from watchlist
export const removeFromWatchlist = (symbol) => {
  try {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter(s => s !== symbol);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

// Check if stock is in watchlist
export const isInWatchlist = (symbol) => {
  const watchlist = getWatchlist();
  return watchlist.includes(symbol);
};

// Clear entire watchlist
export const clearWatchlist = () => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing watchlist:', error);
    return false;
  }
};

