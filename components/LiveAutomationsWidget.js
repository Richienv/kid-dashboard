import { useEffect, useState } from 'react';

export default function LiveAutomationsWidget() {
  const [data, setData] = useState({
    lastUpdate: new Date().toLocaleTimeString(),
    sui: {
      price: '0.9742',
      tokens: 2977,
      breakeven: '1.0846',
      value: '2900.19',
      pnl: '-328.66',
      pnlPercent: '-10.4',
      nextCheck: 'Next hour'
    },
    crypto: {
      summary: '3 bullish, 1 mixed, 1 bearish - Bottom territory',
      badge: '🟢',
      latestPosts: [
        { account: 'KillaXBT', time: '6h ago', sentiment: 'bullish' },
        { account: 'CryptoBheem', time: 'Feb 5', sentiment: 'bullish' },
        { account: 'BrutalBtc', time: '19h ago', sentiment: 'bullish' },
        { account: 'RealInsider69', time: '7h ago', sentiment: 'bearish' },
        { account: 'TheCryptoLemon', time: '8h ago', sentiment: 'mixed' }
      ],
      nextCheck: '30 min'
    },
    buddy: {
      schedule: '3x/day (10AM, 3PM, 9PM)',
      lastQuestion: 'Kalau lo boleh kasih advice ke diri lo sendiri...',
      insightsCount: 5,
      nextCheck: '10:00 AM'
    },
    thesis: {
      progress: 15,
      currentFocus: 'Defining thesis topic',
      lastAction: 'Tracker created'
    }
  });

  useEffect(() => {
    // In production, fetch from API endpoint
    const fetchData = async () => {
      try {
        const res = await fetch('/api/live-automations');
        if (res.ok) {
          const freshData = await res.json();
          setData(freshData);
        }
      } catch (e) {
        // Keep default data if API fails
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-automations-widget">
      <div className="widget-header">
        <span className="live-dot">🟢</span>
        <h3>Live Automations</h3>
        <span className="last-update">Updated: {data.lastUpdate}</span>
      </div>

      <div className="automations-grid">
        {/* SUI Tracker */}
        <div className="automation-card crypto">
          <div className="card-header">
            <span className="icon">💰</span>
            <span className="title">SUI Position</span>
            <span className={`status ${parseFloat(data.sui.pnl) >= 0 ? 'positive' : 'negative'}`}>
              {parseFloat(data.sui.pnl) >= 0 ? '🟢' : '🔴'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span className="label">Price:</span>
              <span className="value">${data.sui.price}</span>
            </div>
            <div className="metric">
              <span className="label">PnL:</span>
              <span className={`value ${parseFloat(data.sui.pnl) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(data.sui.pnl) >= 0 ? '+' : ''}${data.sui.pnl} ({data.sui.pnlPercent}%)
              </span>
            </div>
            <div className="metric">
              <span className="label">Target:</span>
              <span className="value">${data.sui.breakeven} breakeven</span>
            </div>
          </div>
          <div className="card-footer">
            <span>Next check: {data.sui.nextCheck}</span>
          </div>
        </div>

        {/* Crypto Sentiment */}
        <div className="automation-card sentiment">
          <div className="card-header">
            <span className="icon">📈</span>
            <span className="title">Crypto Sentiment</span>
            <span className="status">{data.crypto.badge}</span>
          </div>
          <div className="card-body">
            <div className="sentiment-summary">{data.crypto.summary}</div>
            <div className="latest-posts">
              {data.crypto.latestPosts.map((post, i) => (
                <div key={i} className="post-preview">
                  <span className="account">@{post.account}</span>
                  <span className="time">{post.time}</span>
                  <span className={`sentiment ${post.sentiment}`}>{post.sentiment}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <span>Next check: {data.crypto.nextCheck}</span>
          </div>
        </div>

        {/* Buddy Check-ins */}
        <div className="automation-card buddy">
          <div className="card-header">
            <span className="icon">🤝</span>
            <span className="title">Buddy Check-ins</span>
            <span className="status">✅</span>
          </div>
          <div className="card-body">
            <div className="schedule">{data.buddy.schedule}</div>
            <div className="last-qa">
              <strong>Last Q:</strong> {data.buddy.lastQuestion.substring(0, 50)}...
            </div>
            <div className="insights-count">
              {data.buddy.insightsCount} insights learned
            </div>
          </div>
          <div className="card-footer">
            <span>Next: {data.buddy.nextCheck}</span>
          </div>
        </div>

        {/* Thesis Progress */}
        <div className="automation-card thesis">
          <div className="card-header">
            <span className="icon">🎓</span>
            <span className="title">Thesis Progress</span>
            <span className="status">📊</span>
          </div>
          <div className="card-body">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: data.thesis.progress + '%'}}></div>
            </div>
            <div className="progress-text">{data.thesis.progress}% complete</div>
            <div className="current-focus">
              <strong>Focus:</strong> {data.thesis.currentFocus}
            </div>
          </div>
          <div className="card-footer">
            <span>Last action: {data.thesis.lastAction}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .live-automations-widget {
          background: #1a1a2e;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          border: 1px solid #2d2d44;
        }
        .widget-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #2d2d44;
        }
        .live-dot {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .last-update {
          margin-left: auto;
          color: #888;
          font-size: 0.85em;
        }
        .automations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 15px;
        }
        .automation-card {
          background: #252542;
          border-radius: 8px;
          padding: 15px;
          border-left: 4px solid #4a9eff;
        }
        .automation-card.crypto { border-left-color: #f7931a; }
        .automation-card.sentiment { border-left-color: #4a9eff; }
        .automation-card.buddy { border-left-color: #50c878; }
        .automation-card.thesis { border-left-color: #9b59b6; }
        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .icon { font-size: 1.2em; }
        .title { flex: 1; }
        .card-body { margin-bottom: 12px; }
        .metric {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          border-bottom: 1px solid #333;
        }
        .metric:last-child { border-bottom: none; }
        .label { color: #888; }
        .value { font-weight: 600; }
        .value.positive { color: #50c878; }
        .value.negative { color: #e74c3c; }
        .card-footer {
          font-size: 0.8em;
          color: #666;
          border-top: 1px solid #333;
          padding-top: 10px;
        }
        .sentiment-summary {
          font-size: 0.9em;
          margin-bottom: 10px;
          padding: 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .post-preview {
          display: flex;
          gap: 8px;
          font-size: 0.8em;
          padding: 4px 0;
        }
        .account { color: #4a9eff; }
        .time { color: #666; }
        .sentiment { 
          margin-left: auto;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.75em;
          text-transform: uppercase;
        }
        .sentiment.bullish { background: rgba(80, 200, 120, 0.2); color: #50c878; }
        .sentiment.bearish { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }
        .sentiment.mixed { background: rgba(255, 193, 7, 0.2); color: #ffc107; }
        .progress-bar {
          height: 8px;
          background: #333;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #9b59b6, #8e44ad);
          transition: width 0.3s ease;
        }
        .progress-text {
          font-size: 0.9em;
          text-align: center;
          margin-bottom: 8px;
        }
        .schedule, .insights-count, .current-focus {
          font-size: 0.9em;
          padding: 4px 0;
        }
        .last-qa {
          font-size: 0.85em;
          padding: 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
}