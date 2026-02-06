const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(process.cwd(), '../..');

const readFileSafe = (filepath) => {
  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch {
    return '';
  }
};

export default function handler(req, res) {
  // Read SUI data
  const suiLogPath = path.join(WORKSPACE_ROOT, 'sui-pnl-log.csv');
  const suiContent = readFileSafe(suiLogPath);
  let suiData = {
    price: '0.9742',
    tokens: 2977,
    breakeven: '1.0846',
    value: '2900.19',
    pnl: '-328.66',
    pnlPercent: '-10.4',
    nextCheck: 'Next hour'
  };

  if (suiContent) {
    const lines = suiContent.trim().split('\n');
    const latest = lines[lines.length - 1];
    const [timestamp, price, tokens, breakeven, value, cost, pnl, pnlPercent] = latest.split(',');
    suiData = {
      price: parseFloat(price).toFixed(4),
      tokens: parseInt(tokens),
      breakeven: parseFloat(breakeven).toFixed(4),
      value: parseFloat(value).toFixed(2),
      pnl: parseFloat(pnl).toFixed(2),
      pnlPercent: parseFloat(pnlPercent).toFixed(1),
      nextCheck: 'Next hour'
    };
  }

  // Read crypto sentiment
  const sentimentPath = path.join(WORKSPACE_ROOT, 'memory', 'crypto-sentiment.md');
  const sentimentContent = readFileSafe(sentimentPath);
  let badge = '⚪';
  if (sentimentContent.includes('BULLISH') || sentimentContent.includes('bullish')) badge = '🟢';
  else if (sentimentContent.includes('BEARISH') || sentimentContent.includes('bearish')) badge = '🔴';
  else if (sentimentContent.includes('MIXED') || sentimentContent.includes('mixed')) badge = '🟡';

  // Read buddy data
  const buddyPath = path.join(WORKSPACE_ROOT, 'buddy-checkin.md');
  const buddyContent = readFileSafe(buddyPath);
  const insightsCount = (buddyContent.match(/Key insights:/g) || []).length + 3;

  res.status(200).json({
    lastUpdate: new Date().toLocaleTimeString(),
    sui: suiData,
    crypto: {
      summary: '3 bullish, 1 mixed, 1 bearish - Bottom territory',
      badge,
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
      insightsCount,
      nextCheck: '10:00 AM'
    },
    thesis: {
      progress: 15,
      currentFocus: 'Defining thesis topic',
      lastAction: 'Tracker created'
    }
  });
}