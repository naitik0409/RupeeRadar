import { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated news data - In a real app, you'd fetch from a news API
    const fetchNews = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enhanced mock news data with images
      const mockNews = [
        {
          id: 1,
          title: 'Indian Stock Market Reaches New Heights in Q4',
          summary: 'The NSE and BSE indices have shown remarkable growth this quarter, with technology and banking sectors leading the charge. Market analysts predict continued bullish trends.',
          source: 'Financial Times',
          date: new Date().toLocaleDateString(),
          category: 'Market News',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
        },
        {
          id: 2,
          title: 'Tech Stocks Surge Amid AI Revolution',
          summary: 'Major technology companies worldwide are experiencing significant gains as artificial intelligence adoption accelerates. Investors are bullish on AI-driven growth.',
          source: 'Tech Finance',
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
          category: 'Technology',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
        },
        {
          id: 3,
          title: 'Banking Sector Shows Strong Performance',
          summary: 'Leading banks report better-than-expected quarterly results, driving investor confidence in the financial sector. Net interest margins improve across the board.',
          source: 'Market Watch',
          date: new Date(Date.now() - 172800000).toLocaleDateString(),
          category: 'Banking',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        },
        {
          id: 4,
          title: 'Global Markets React to Economic Indicators',
          summary: 'International stock markets respond to latest economic data, with mixed results across different regions. Central bank policies continue to influence market sentiment.',
          source: 'Global Finance',
          date: new Date(Date.now() - 259200000).toLocaleDateString(),
          category: 'Global Markets',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        },
        {
          id: 5,
          title: 'Renewable Energy Stocks Gain Momentum',
          summary: 'Companies in the renewable energy sector see increased investor interest as sustainability becomes a key focus. Solar and wind energy companies lead the charge.',
          source: 'Green Finance',
          date: new Date(Date.now() - 345600000).toLocaleDateString(),
          category: 'Energy',
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
        },
        {
          id: 6,
          title: 'Cryptocurrency Markets Show Volatility',
          summary: 'Digital asset markets experience significant price swings as regulatory clarity improves. Institutional adoption continues to grow despite market fluctuations.',
          source: 'Crypto News',
          date: new Date(Date.now() - 432000000).toLocaleDateString(),
          category: 'Cryptocurrency',
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
        },
      ];
      
      setNews(mockNews);
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Stock Market News</h1>
        <p className="news-subtitle">
          Stay updated with the latest market trends, financial news, and investment insights from around the world
        </p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading news...</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {news.map((article) => (
              <article key={article.id} className="news-card">
                <div className="news-image">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    loading="lazy"
                  />
                  <div className="news-category">{article.category}</div>
                </div>
                <div className="news-content">
                  <h2 className="news-title">{article.title}</h2>
                  <p className="news-summary">{article.summary}</p>
                  <div className="news-footer">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="news-info-section">
            <div className="info-card">
              <h3>📰 Why Stay Informed?</h3>
              <p>
                Keeping up with financial news helps you make informed investment decisions. Market trends, 
                economic indicators, and company announcements can significantly impact stock prices. Our news 
                section aggregates the latest information to keep you ahead of the curve.
              </p>
            </div>
            <div className="info-card">
              <h3>🔔 Stay Updated</h3>
              <p>
                In a production application, this section would integrate with real financial news APIs such as 
                NewsAPI, Alpha Vantage News, or Yahoo Finance News to provide live, up-to-date market news and 
                analysis from trusted financial sources.
              </p>
            </div>
          </div>

          <div className="news-note">
            <p>💡 <strong>Note:</strong> This is a demo news feed. In a production app, you would integrate with a real financial news API like NewsAPI, Alpha Vantage News, or Yahoo Finance News to provide live, up-to-date market news.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default News;
