# API Setup Guide - ✅ NO API KEY REQUIRED!

## 🎉 Great News!

**Your app is already configured to use Yahoo Finance API - which is 100% FREE and requires NO API KEY!**

The app is ready to use right away. Just run `npm run dev` and start tracking stocks!

---

## Current Setup: Yahoo Finance API

### ✅ Advantages:
- **100% Free** - No cost, no credit card needed
- **No API Key Required** - Works immediately
- **Works for Indian Stocks** - Supports NSE (.NS) and BSE (.BO) symbols
- **Works for International Stocks** - USA, UK, Japan, China, Germany, etc.
- **Real-time Data** - Live stock prices and charts
- **No Rate Limits** - (Unofficial API, but widely used and reliable)

### 📊 Supported Stock Exchanges:
- **Indian:** NSE (National Stock Exchange) and BSE (Bombay Stock Exchange)
- **USA:** NYSE, NASDAQ
- **UK:** London Stock Exchange
- **Japan:** Tokyo Stock Exchange
- **China:** Hong Kong Stock Exchange
- **Germany:** Frankfurt Stock Exchange
- And many more!

---

## How It Works

The app uses Yahoo Finance's public API endpoints:
- Stock quotes: `https://query1.finance.yahoo.com/v8/finance/chart/`
- Stock search: `https://query1.finance.yahoo.com/v1/finance/search`

All configured in `src/services/stockApi.js` - no changes needed!

---

## Stock Symbol Formats

### Indian Stocks:
- **NSE Format:** `RELIANCE.NS`, `TCS.NS`, `HDFCBANK.NS`
- **BSE Format:** `RELIANCE.BO`, `TCS.BO`, `HDFCBANK.BO`

### International Stocks:
- **USA:** `AAPL`, `MSFT`, `GOOGL` (no suffix needed)
- **UK:** `BP.L`, `GSK.L`
- **Japan:** `7203.T`
- **China:** `0700.HK`
- **Germany:** `SAP.DE`

---

## Adding More Stocks

To add more stocks, edit `src/services/stockApi.js`:

```javascript
// Indian stocks
export const INDIAN_STOCKS = [
  'RELIANCE.NS',
  'TCS.NS',
  // Add more here...
];

// International stocks
export const INTERNATIONAL_STOCKS = {
  'USA': ['AAPL', 'MSFT', ...],
  // Add more countries...
};
```

---

## Alternative Free APIs (If Needed)

If you ever need alternatives, here are other free options:

### Option 1: Alpha Vantage (Requires Free API Key)
- Visit: https://www.alphavantage.co/support/#api-key
- Free tier: 5 calls/minute, 500 calls/day
- Good for: International stocks (limited Indian support)

### Option 2: Polygon.io (Free Tier Available)
- Visit: https://polygon.io/
- Free tier: Limited but good for development
- Good for: Indian stocks (NSE/BSE) and international

### Option 3: Twelve Data (Free Tier)
- Visit: https://twelvedata.com/
- Free tier: 800 calls/day
- Good for: Global stocks including Indian markets

---

## Troubleshooting

### Problem: Stock data not loading
- **Solution:** Check your internet connection. Yahoo Finance API is reliable but may occasionally have downtime.

### Problem: Indian stocks showing wrong data
- **Solution:** Make sure you're using the correct format:
  - NSE: `SYMBOL.NS` (e.g., `RELIANCE.NS`)
  - BSE: `SYMBOL.BO` (e.g., `RELIANCE.BO`)

### Problem: Search not working
- **Solution:** The search uses Yahoo Finance's search API. Try searching with the exact stock symbol or company name.

---

## Ready to Go! 🚀

Your app is fully configured and ready to use. No API key setup needed!

Just run:
```bash
npm run dev
```

And start tracking stocks! 📈
