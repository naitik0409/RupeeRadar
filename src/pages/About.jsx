import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About StockTracker</h1>
        <p className="about-subtitle">Your comprehensive stock market tracking solution for global markets</p>
      </div>

      <div className="about-hero">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" 
          alt="Stock Market Analytics" 
          loading="lazy"
        />
        <div className="hero-overlay">
          <h2>Empowering Investors Worldwide</h2>
          <p>Track, analyze, and make informed decisions with real-time market data</p>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="section-content">
            <h2>📈 What is StockTracker?</h2>
            <p>
              StockTracker is a modern, professional web application designed to help investors and traders 
              track stocks from markets around the world. Whether you're interested in Indian stocks (NSE/BSE), 
              US markets, or international exchanges, StockTracker provides real-time data, interactive charts, 
              and comprehensive stock information to help you make informed investment decisions.
            </p>
            <p>
              Our platform combines powerful analytics with an intuitive interface, making it easy for both 
              beginners and experienced traders to monitor their portfolios and discover new investment opportunities.
            </p>
          </div>
          <div className="section-image">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
              alt="Global Stock Markets" 
              loading="lazy"
            />
          </div>
        </section>

        <section className="about-section">
          <h2>✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Coverage</h3>
              <p>Track stocks from India, USA, UK, Japan, China, Germany, and 50+ other countries. Access major exchanges including NSE, BSE, NYSE, NASDAQ, LSE, and more.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Data</h3>
              <p>Get up-to-date stock prices, market movements, and financial metrics updated every minute. Never miss a market opportunity with live data feeds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Interactive Charts</h3>
              <p>Visualize stock performance with beautiful, interactive charts. Multiple timeframes (1D, 5D, 1M, 6M, YTD, 1Y, 5Y, All) and chart types (Area, Line).</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Personal Watchlist</h3>
              <p>Save your favorite stocks and track them in one convenient place. Monitor multiple stocks simultaneously and get quick access to your portfolio.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Find stocks worldwide with intelligent search and fuzzy matching. Even if you don't know the exact symbol, our search will find related results.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Fully Responsive</h3>
              <p>Works seamlessly on desktop, tablet, and mobile devices. Access your portfolio and track stocks from anywhere, anytime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💹</div>
              <h3>Market Summary</h3>
              <p>Stay informed with real-time market indices including S&P 500, Dow 30, Nasdaq, VIX, and more. Track global market trends at a glance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📉</div>
              <h3>Financial Metrics</h3>
              <p>Access comprehensive financial data including Market Cap, PE Ratio, EPS, Beta, Bid/Ask prices, and historical performance metrics.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🛠️ Technology Stack</h2>
          <p className="tech-intro">
            StockTracker is built with modern web technologies to ensure fast performance, 
            reliability, and an excellent user experience.
          </p>
          <div className="tech-stack">
            <div className="tech-item">React 19</div>
            <div className="tech-item">Vite</div>
            <div className="tech-item">React Router</div>
            <div className="tech-item">Recharts</div>
            <div className="tech-item">Axios</div>
            <div className="tech-item">Fuse.js</div>
            <div className="tech-item">Yahoo Finance API</div>
            <div className="tech-item">CSS3</div>
            <div className="tech-item">JavaScript ES6+</div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-content">
            <h2>📝 Data Sources</h2>
            <p>
              StockTracker uses Yahoo Finance API to provide real-time stock data. This free, 
              reliable API offers comprehensive coverage of global stock markets, including Indian 
              stocks (NSE and BSE), US markets, and international exchanges.
            </p>
            <p>
              All data is fetched in real-time and updated regularly to ensure accuracy. We support 
              stocks from major exchanges worldwide, making it easy to track your investments regardless 
              of where they're listed.
            </p>
          </div>
          <div className="section-image">
            <img 
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop" 
              alt="Data Analytics" 
              loading="lazy"
            />
          </div>
        </section>

        <section className="about-section">
          <h2>🚀 Getting Started</h2>
          <div className="getting-started">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Explore Stocks</h3>
                <p>Browse popular stocks on the home page or use the search bar to find any stock worldwide.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>View Details</h3>
                <p>Click on any stock to see detailed information, interactive charts, and financial metrics.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Add to Watchlist</h3>
                <p>Save your favorite stocks to your personal watchlist for quick access and monitoring.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track Performance</h3>
                <p>Monitor market trends, track your portfolio, and stay informed with real-time updates.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>⚠️ Important Disclaimer</h2>
          <p className="disclaimer">
            <strong>StockTracker is for informational purposes only.</strong> The data provided should not be 
            considered as financial advice. Always do your own research and consult with a qualified financial 
            advisor before making investment decisions. Stock market investments are subject to market risks, 
            and past performance does not guarantee future results. We are not responsible for any financial 
            losses that may occur from using this platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
