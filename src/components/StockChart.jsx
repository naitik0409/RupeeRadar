import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useEffect, useState } from 'react';
import { getIntradayData } from '../services/stockApi';
import './StockChart.css';

const TIME_RANGES = [
  { label: '1D', value: '1d', interval: '5m' },
  { label: '5D', value: '5d', interval: '15m' },
  { label: '1M', value: '1mo', interval: '1d' },
  { label: '6M', value: '6mo', interval: '1d' },
  { label: 'YTD', value: 'ytd', interval: '1d' },
  { label: '1Y', value: '1y', interval: '1wk' },
  { label: '5Y', value: '5y', interval: '1mo' },
  { label: 'All', value: 'max', interval: '1mo' },
];

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1d');
  const [chartType, setChartType] = useState('area');

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      const range = TIME_RANGES.find(r => r.value === timeRange) || TIME_RANGES[0];
      
      // For now, using intraday data. In production, you'd fetch based on range
      const data = await getIntradayData(symbol);
      
      if (data && data['Time Series (5min)']) {
        const timeSeries = data['Time Series (5min)'];
        const formattedData = Object.entries(timeSeries)
          .slice(0, 78)
          .reverse()
          .map(([time, values]) => {
            const date = new Date(time);
            return {
              time: date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
              fullTime: date,
              price: parseFloat(values['4. close']),
              high: parseFloat(values['2. high']),
              low: parseFloat(values['3. low']),
              open: parseFloat(values['1. open']),
              volume: parseFloat(values['5. volume']),
            };
          });
        setChartData(formattedData);
      }
      setIsLoading(false);
    };

    if (symbol) {
      fetchChartData();
    }
  }, [symbol, timeRange]);

  if (isLoading) {
    return (
      <div className="chart-loading">
        <div className="chart-loader"></div>
        <p>Loading chart for {symbol}...</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="chart-error">
        <p>Chart data not available</p>
      </div>
    );
  }

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[0]?.price || 0;
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice ? ((change / previousPrice) * 100) : 0;
  const isPositive = change >= 0;
  
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  
  const isIndianStock = symbol.includes('.NS') || symbol.includes('.BO');
  const currencySymbol = isIndianStock ? '₹' : '$';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{data.time}</p>
          <p className="tooltip-price">
            {currencySymbol}{data.price.toFixed(2)}
          </p>
          <div className="tooltip-details">
            <span>High: {currencySymbol}{data.high.toFixed(2)}</span>
            <span>Low: {currencySymbol}{data.low.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="stock-chart-container">
      <div className="chart-controls-top">
        <div className="timeframe-selectors">
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              className={`timeframe-btn ${timeRange === range.value ? 'active' : ''}`}
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="chart-options">
          <button
            className={`chart-type-btn ${chartType === 'area' ? 'active' : ''}`}
            onClick={() => setChartType('area')}
            title="Area Chart"
          >
            Area
          </button>
          <button
            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            Line
          </button>
        </div>
      </div>

      <div className="chart-header">
        <div className="chart-price-info">
          <div className="chart-current-price">{currencySymbol}{currentPrice.toFixed(2)}</div>
          <div className={`chart-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{currencySymbol}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div className="chart-stats">
        <div className="chart-stat-item">
          <span className="stat-label">High</span>
          <span className="stat-value">{currencySymbol}{maxPrice.toFixed(2)}</span>
        </div>
        <div className="chart-stat-item">
          <span className="stat-label">Low</span>
          <span className="stat-value">{currencySymbol}{minPrice.toFixed(2)}</span>
        </div>
        <div className="chart-stat-item">
          <span className="stat-label">Avg</span>
          <span className="stat-value">{currencySymbol}{avgPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#16c784' : '#ea3943'} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={isPositive ? '#16c784' : '#ea3943'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis 
                dataKey="time" 
                stroke="#7d8590"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tick={{ fill: '#7d8590' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#7d8590"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tick={{ fill: '#7d8590' }}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={avgPrice} stroke="#7d8590" strokeDasharray="5 5" strokeOpacity={0.5} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#16c784' : '#ea3943'}
                strokeWidth={2}
                fill="url(#colorPrice)"
                activeDot={{ r: 5, fill: isPositive ? '#16c784' : '#ea3943', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis 
                dataKey="time" 
                stroke="#7d8590"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tick={{ fill: '#7d8590' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#7d8590"
                style={{ fontSize: '12px', fontWeight: 500 }}
                tick={{ fill: '#7d8590' }}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={avgPrice} stroke="#7d8590" strokeDasharray="5 5" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#16c784' : '#ea3943'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: isPositive ? '#16c784' : '#ea3943', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
