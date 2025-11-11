import Fuse from 'fuse.js';

// Enhanced search with fuzzy matching
export const fuzzySearch = (query, stockList) => {
  if (!query || !stockList || stockList.length === 0) {
    return [];
  }

  const fuse = new Fuse(stockList, {
    keys: ['symbol', 'name', 'description'],
    threshold: 0.4, // Lower threshold = more strict matching
    includeScore: true,
    minMatchCharLength: 2,
  });

  const results = fuse.search(query);
  return results.map(result => ({
    ...result.item,
    score: result.score,
  }));
};

// Normalize search query
export const normalizeQuery = (query) => {
  return query.trim().toUpperCase();
};

// Generate search suggestions based on partial matches
export const generateSuggestions = (query, stockList) => {
  if (!query || query.length < 2) {
    return [];
  }

  const normalizedQuery = normalizeQuery(query);
  const suggestions = stockList.filter(stock => {
    const symbol = stock.symbol?.toUpperCase() || '';
    const name = stock.name?.toUpperCase() || '';
    return symbol.includes(normalizedQuery) || name.includes(normalizedQuery);
  });

  return suggestions.slice(0, 10); // Return top 10 suggestions
};

