import axios from 'axios';

// Using Yahoo Finance API - 100% FREE, NO API KEY REQUIRED!
// Works great for both Indian stocks (NSE/BSE) and international stocks
// This is an unofficial API but widely used and reliable

// Indian stock symbols (NSE format for Yahoo Finance)
export const INDIAN_STOCKS = [
  'RELIANCE.NS',  // NSE format
  'TCS.NS',
  'HDFCBANK.NS',
  'INFY.NS',
  'HINDUNILVR.NS',
  'ICICIBANK.NS',
  'SBIN.NS',
  'BHARTIARTL.NS',
  'KOTAKBANK.NS',
  'ITC.NS',
];

// International popular stocks
export const INTERNATIONAL_STOCKS = {
  'USA': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM'],
  'UK': ['BP.L', 'GSK.L', 'HSBA.L', 'VOD.L'],
  'Japan': ['7203.T', '6758.T', '9984.T'],
  'China': ['0700.HK', '0941.HK', '1299.HK'],
  'Germany': ['SAP.DE', 'SIE.DE', 'VOW3.DE'],
};

// Helper function to format symbol for Yahoo Finance
const formatSymbol = (symbol) => {
  // If already has exchange suffix, return as is
  if (symbol.includes('.NS') || symbol.includes('.BO') || symbol.includes('.')) {
    return symbol;
  }
  // Default to US market if no suffix
  return symbol;
};

// Get stock quote from Yahoo Finance
export const getStockQuote = async (symbol) => {
  try {
    const formattedSymbol = formatSymbol(symbol);
    // Use Vite proxy in development, CORS proxy in production
    let url;
    if (import.meta.env.DEV) {
      // Development: Use Vite proxy
      url = `/api/yahoo/v8/finance/chart/${formattedSymbol}?interval=1d&range=1d&includePrePost=true`;
    } else {
      // Production: Use CORS proxy
      const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${formattedSymbol}?interval=1d&range=1d&includePrePost=true`;
      url = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    }
    const response = await axios.get(url);

    if (response.data && response.data.chart && response.data.chart.result) {
      const result = response.data.chart.result[0];
      const meta = result.meta;
      const quote = result.indicators.quote[0];
      
      // Format data to match expected structure
      const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
      const previousClose = meta.previousClose || 0;
      const change = currentPrice - previousClose;
      const changePercent = previousClose ? ((change / previousClose) * 100) : 0;
      const open = quote.open[quote.open.length - 1] || meta.regularMarketPrice || 0;
      const high = Math.max(...quote.high.filter(h => h !== null)) || meta.regularMarketPrice || 0;
      const low = Math.min(...quote.low.filter(l => l !== null)) || meta.regularMarketPrice || 0;
      const volume = meta.regularMarketVolume || 0;
      
      // Additional financial metrics from meta
      const marketCap = meta.marketCap || 0;
      const beta = meta.beta || null;
      const trailingPE = meta.trailingPE || null;
      const trailingEPS = meta.trailingEPS || null;
      const bid = meta.bid || null;
      const ask = meta.ask || null;

      return {
        'Global Quote': {
          '01. symbol': formattedSymbol,
          '02. open': open.toString(),
          '03. high': high.toString(),
          '04. low': low.toString(),
          '05. price': currentPrice.toString(),
          '06. volume': volume.toString(),
          '07. latest trading day': new Date(meta.regularMarketTime * 1000).toISOString().split('T')[0],
          '08. previous close': previousClose.toString(),
          '09. change': change.toString(),
          '10. change percent': `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        },
        meta: {
          ...meta,
          marketCap,
          beta,
          trailingPE,
          trailingEPS,
          bid,
          ask,
        },
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
};

// Get intraday data for charts
export const getIntradayData = async (symbol) => {
  try {
    const formattedSymbol = formatSymbol(symbol);
    // Use Vite proxy in development, CORS proxy in production
    let url;
    if (import.meta.env.DEV) {
      // Development: Use Vite proxy
      url = `/api/yahoo/v8/finance/chart/${formattedSymbol}?interval=5m&range=1d`;
    } else {
      // Production: Use CORS proxy
      const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${formattedSymbol}?interval=5m&range=1d`;
      url = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    }
    const response = await axios.get(url);

    if (response.data && response.data.chart && response.data.chart.result) {
      const result = response.data.chart.result[0];
      const timestamps = result.timestamp;
      const quote = result.indicators.quote[0];
      
      const timeSeries = {};
      timestamps.forEach((timestamp, index) => {
        const date = new Date(timestamp * 1000).toISOString();
        timeSeries[date] = {
          '1. open': quote.open[index]?.toString() || '0',
          '2. high': quote.high[index]?.toString() || '0',
          '3. low': quote.low[index]?.toString() || '0',
          '4. close': quote.close[index]?.toString() || '0',
          '5. volume': quote.volume[index]?.toString() || '0',
        };
      });

      return {
        'Time Series (5min)': timeSeries,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    return null;
  }
};

// Search stocks using Yahoo Finance
export const searchStocks = async (keywords) => {
  try {
    // Use Vite proxy in development, CORS proxy in production
    let url;
    if (import.meta.env.DEV) {
      // Development: Use Vite proxy
      url = `/api/yahoo/v1/finance/search?q=${encodeURIComponent(keywords)}&quotesCount=10&newsCount=0`;
    } else {
      // Production: Use CORS proxy
      const targetUrl = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(keywords)}&quotesCount=10&newsCount=0`;
      url = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    }
    const response = await axios.get(url);

    if (response.data && response.data.quotes) {
      return {
        bestMatches: response.data.quotes.map(quote => ({
          '1. symbol': quote.symbol,
          '2. name': quote.longname || quote.shortname || quote.symbol,
          '3. type': quote.quoteType || 'EQUITY',
          '4. region': quote.exchange || 'Unknown',
          '8. currency': quote.currency || 'USD',
        })),
      };
    }
    return { bestMatches: [] };
  } catch (error) {
    console.error('Error searching stocks:', error);
    return { bestMatches: [] };
  }
};

// Get multiple stock quotes at once
export const getMultipleStockQuotes = async (symbols) => {
  // Add delay between requests to avoid rate limiting
  const results = [];
  for (let i = 0; i < symbols.length; i++) {
    const result = await getStockQuote(symbols[i]);
    if (result && result['Global Quote']) {
      results.push(result);
    }
    // Small delay to avoid rate limiting
    if (i < symbols.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  return results;
};
