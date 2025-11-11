import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStocks } from '../services/stockApi';
import { fuzzySearch } from '../utils/searchUtils';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchStocksAsync = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchStocks(query);
        if (data && data.bestMatches) {
          const matches = data.bestMatches.map(match => ({
            symbol: match['1. symbol'],
            name: match['2. name'],
            type: match['3. type'],
            region: match['4. region'],
            currency: match['8. currency'],
          }));
          setSuggestions(matches);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchStocksAsync, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled through suggestions dropdown
    // If user presses enter and there's a first suggestion, navigate to it
    if (query.trim() && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].symbol);
    }
  };

  const handleSuggestionClick = (symbol) => {
    navigate(`/stock/${symbol}`);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search stocks worldwide..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          />
          {isLoading && <div className="search-loader"></div>}
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown" ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion.symbol)}
            >
              <div className="suggestion-symbol">{suggestion.symbol}</div>
              <div className="suggestion-name">{suggestion.name}</div>
              <div className="suggestion-region">{suggestion.region}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

