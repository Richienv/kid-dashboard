import Head from 'next/head';
import { useMemo, useState } from 'react';
import { buildWorkspaceData } from '../lib/workspace-data';

const navSections = [
  { key: 'overview', label: 'Overview' },
  { key: 'usage', label: 'Usage' },
  { key: 'health', label: 'Health' },
  { key: 'skills', label: 'Skills' },
  { key: 'scheduler', label: 'Scheduler' },
  { key: 'security', label: 'Security' }
];

export default function Home(props) {
  const [activeSection, setActiveSection] = useState('overview');
  const { overview, usage, health, skills, memory, scheduler, security, biometrics, decisionTrace, chatLogs } = props;

  return (
    <>
      <Head>
        <title>Kid Intelligence | Dashboard</title>
        <meta name="description" content="OpenClaw inspired minimalist dashboard." />
      </Head>
      <div className="app-container">
        <aside className="side-nav">
          <div className="side-nav-brand">
            <div className="brand-icon">OC</div>
            <h1>Dashboard</h1>
          </div>
          <div className="nav-items">
            {navSections.map(s => (
              <button key={s.key} className={activeSection === s.key ? 'nav-item active' : 'nav-item'} onClick={() => setActiveSection(s.key)}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="nav-footer">
            <div className="user-profile">
              <div className="avatar">RK</div>
              <div className="user-info"><strong>Richie Kid</strong><span>Mac Mini Active</span></div>
            </div>
          </div>
        </aside>

        <main className="workspace">
          <header className="workspace-header">
            <div className="header-left">
              <h2>{navSections.find(s => s.key === activeSection)?.label}</h2>
              <span className="timestamp">Last updated: just now</span>
            </div>
            <div className="header-right">
              <div className="system-status"><span className="dot green"></span>All systems online</div>
            </div>
          </header>

          <div className="workspace-content">
            {activeSection === 'overview' && <OverviewPage data={overview} trace={decisionTrace} logs={chatLogs} />}
            {activeSection === 'usage' && <UsagePage data={usage} />}
            {activeSection === 'health' && <HealthPage data={health} />}
            {activeSection === 'skills' && <SkillsPage skills={skills} memory={memory} />}
            {activeSection === 'scheduler' && <SchedulerPage data={scheduler} />}
            {activeSection === 'security' && <SecurityPage data={security} />}
          </div>
        </main>
      </div>
      <style jsx global>{styles}</style>
    </>
  );
}

function OverviewPage({ data, trace, logs }) {
  const terminalStatus = { status: 'Running', command: 'npm run dev', uptime: '29m', pid: '12847' };
  const tokenUsage = { today: '124K', month: '4.2M', budget: '5M', percent: 84 };
  const systemHealth = [
    { name: 'CPU', value: 34 },
    { name: 'Memory', value: 62 },
    { name: 'Storage', value: 45 },
    { name: 'Network', value: 78 }
  ];
  const liveEvents = [
    { icon: '✉️', text: 'Inbox cleared 5 emails', time: '2m ago', status: 'done' },
    { icon: '🔔', text: 'Reminder sent to calendar', time: '5m ago', status: 'done' },
    { icon: '🌐', text: 'Browser task: research AI trends', time: '12m ago', status: 'done' },
    { icon: '💾', text: 'Memory synced: user_prefs.md', time: '18m ago', status: 'done' },
    { icon: '⚡', text: 'Shell exec: backup_script.sh', time: '25m ago', status: 'done' }
  ];

  return (
    <section className="overview-view-new">
      <div className="ov-hero-row">
        <div className="ov-hero">
          <div className="hero-dots"><span></span><span></span><span></span></div>
          <h1>{data.hero.title}</h1>
          <p>{data.hero.desc}</p>
        </div>
        <div className="ov-quick-stats">
          {data.metrics.map(m => (
            <div key={m.label} className="ov-stat">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
              <small className={m.type}>{m.trend}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="ov-main-grid">
        <div className="ov-col-left">
          <div className="ov-panel live-activity-panel">
            <div className="panel-header"><h4>🔴 Live Activity</h4><span className="live-badge">● Live</span></div>
            <div className="live-feed">
              {liveEvents.map((e, i) => (
                <div key={i} className="feed-item">
                  <span className="feed-icon">{e.icon}</span>
                  <div className="feed-content">
                    <strong>{e.text}</strong>
                    <span>{e.time}</span>
                  </div>
                  <span className="feed-status done">✓</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ov-panel decision-panel">
            <div className="panel-header"><h4>🧠 Decision Trace</h4></div>
            <div className="trace-feed">
              {trace.map(t => (
                <div key={t.id} className="trace-row">
                  <span className={`trace-type ${t.type}`}>{t.type}</span>
                  <p>{t.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ov-col-right">
          <div className="ov-panel terminal-panel">
            <div className="panel-header"><h4>💻 Terminal Status</h4><span className="status-online">● Online</span></div>
            <div className="terminal-info">
              <div className="term-row"><span>Command</span><code>{terminalStatus.command}</code></div>
              <div className="term-row"><span>Status</span><strong className="green">{terminalStatus.status}</strong></div>
              <div className="term-row"><span>Uptime</span><strong>{terminalStatus.uptime}</strong></div>
              <div className="term-row"><span>PID</span><code>{terminalStatus.pid}</code></div>
            </div>
          </div>

          <div className="ov-panel token-panel">
            <div className="panel-header"><h4>◎ Token Usage</h4></div>
            <div className="token-stats">
              <div className="token-main">
                <strong>{tokenUsage.month}</strong>
                <span>/ {tokenUsage.budget} this month</span>
              </div>
              <div className="token-bar"><div className="token-fill" style={{ width: `${tokenUsage.percent}%` }}></div></div>
              <div className="token-detail">
                <span>Today: <strong>{tokenUsage.today}</strong></span>
                <span>{tokenUsage.percent}% of budget</span>
              </div>
            </div>
          </div>

          <div className="ov-panel health-panel">
            <div className="panel-header"><h4>📊 System Health</h4><span className="green">All Good</span></div>
            <div className="health-grid">
              {systemHealth.map(s => (
                <div key={s.name} className="health-item">
                  <div className="health-label"><span>{s.name}</span><strong>{s.value}%</strong></div>
                  <div className="health-bar"><div className="health-fill" style={{ width: `${s.value}%`, background: s.value > 70 ? '#f59e0b' : '#a3e635' }}></div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="ov-panel logs-panel">
            <div className="panel-header"><h4>📋 Recent Logs</h4></div>
            <div className="logs-mini">
              {logs.map((log, i) => (
                <div key={i} className="log-mini-row">
                  <span className="log-time">{log.time}</span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UsagePage({ data }) {
  return (
    <section className="usage-view animation-fade">
      <div className="usage-grid">
        <div className="usage-left">
          <h3 className="page-title">Usage & Cost</h3>
          <p className="page-desc">Real-time spend, token burn, and model split—so you never get surprised.</p>
          <div className="big-cost"><span className="dollar">$</span><span className="amount">{data.totalSpend.toLocaleString()}</span></div>
          <p className="billing-info">{data.billingCycle}</p>
          <div className="token-count"><span className="token-icon">◎</span><strong>{data.totalTokens}</strong> Tokens</div>
          <div className="model-legend">
            {data.modelSplit.map(m => <div key={m.name} className="legend-item"><span className="legend-dot" style={{ background: m.color }}></span>{m.name}: {m.percent}%</div>)}
          </div>
          <button className="budget-btn">⏱ Set budgets</button>
        </div>
        <div className="usage-right">
          <div className="model-split-card">
            <div className="card-header"><h4>Model Split</h4></div>
            <div className="arc-chart">
              <svg viewBox="0 0 100 100" className="donut">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#a3e635" strokeWidth="12" strokeDasharray="113 251" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#818cf8" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-113" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22d3d1" strokeWidth="12" strokeDasharray="38 251" strokeDashoffset="-188" transform="rotate(-90 50 50)" />
              </svg>
              <div className="arc-center"><strong>{data.totalTokens}</strong><span>Tokens</span></div>
            </div>
          </div>
          <div className="weekly-spend-card">
            <div className="card-header"><h4>Weekly Spend</h4><span className="trend-badge">+$420</span></div>
            <div className="weekly-chart">
              {data.weeklySpend.map((d, i) => <div key={i} className="week-bar"><div className="bar" style={{ height: `${d.amount / 6}px`, background: 'var(--accent-blue)' }}></div><span>{d.day}</span></div>)}
            </div>
          </div>
          <div className="project-usage-card">
            <div className="card-header"><h4>Project Usage</h4><span>This month</span></div>
            <div className="project-list">
              {data.projectUsage.map(p => <div key={p.name} className="project-row"><span className="pname">{p.name}</span><div className="pbar"><div className="pfill" style={{ width: `${p.percent}%` }}></div></div><span className="pcost">${p.cost}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HealthPage({ data }) {
  return (
    <section className="health-view animation-fade">
      <div className="health-grid">
        <div className="health-card">
          <h3>Agent Health</h3>
          <div className="status-badge"><span className="dot green"></span>{data.status}</div>
          <p className="uptime-info">Uptime {data.uptime} • Last incident: {data.lastIncident}</p>
          <div className="stat-row">
            {data.systemStats.map(s => <div key={s.name} className="stat-box"><span className="stat-label">{s.name}</span><strong className="stat-value">{s.value}%</strong><div className="stat-bar"><div className="stat-fill" style={{ width: `${s.value}%` }}></div></div></div>)}
          </div>
        </div>
        <div className="activity-feed-card">
          <div className="card-header"><h4>Live Activity</h4><span className="live-dot">● Live</span></div>
          <div className="activity-list">
            {data.liveActivity.map((a, i) => <div key={i} className="activity-item"><div className="activity-icon">{a.icon === 'mail' ? '✉️' : a.icon === 'bell' ? '🔔' : a.icon === 'globe' ? '🌐' : '✓'}</div><div className="activity-text"><strong>{a.text}</strong><span>{a.time}</span></div><span className="activity-dot"></span></div>)}
          </div>
        </div>
      </div>
      <div className="logs-card">
        <div className="card-header"><h4>Recent Logs</h4><div className="logs-actions"><span>Auto-refresh: ON</span><button>View all</button></div></div>
        <table className="logs-table">
          <thead><tr><th>TIME</th><th>TYPE</th><th>DETAIL</th><th>DURATION</th></tr></thead>
          <tbody>{data.recentLogs.map((l, i) => <tr key={i}><td>{l.time}</td><td className="type-cell">{l.type}</td><td>{l.detail}</td><td className="duration-cell">{l.duration}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function SkillsPage({ skills, memory }) {
  return (
    <section className="skills-view animation-fade">
      <div className="skills-grid">
        <div className="skills-list-card">
          <h3>Skills</h3>
          <p className="page-desc">Install, search, and review community skills.</p>
          <div className="search-box"><span>🔍</span><input type="text" placeholder="Search 500+ skills..." /></div>
          <div className="skill-list">
            {skills.map(s => <div key={s.name} className="skill-item"><div className="skill-icon">{s.icon === 'mail' ? '✉️' : s.icon === 'calendar' ? '📅' : s.icon === 'globe' ? '🌐' : s.icon === 'message' ? '💬' : s.icon === 'code' ? '💻' : '📁'}</div><div className="skill-info"><div className="skill-title"><strong>{s.name}</strong> <span className="rating">★ {s.rating}</span></div><p>{s.desc}</p><div className="skill-meta"><span>↓ {s.downloads}</span><span>⏱ {s.updated}</span></div></div><button className="install-btn">Install →</button></div>)}
          </div>
          <div className="skills-footer"><span>6 of 6 skills</span><button>Browse marketplace →</button></div>
        </div>
        <div className="memory-card">
          <h3>Memory</h3>
          <p className="page-desc">Persistent context stored as Markdown. Searchable. Editable.</p>
          <div className="memory-actions"><span className="file-badge">{memory.currentFile}</span><button>↺ Reset</button><button className="save-btn">💾 Save</button></div>
          <div className="memory-content"><pre>{memory.content}</pre></div>
          <div className="memory-search"><span>🔍</span><input type="text" placeholder="Search memory..." /></div>
        </div>
      </div>
    </section>
  );
}

function SchedulerPage({ data }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <section className="scheduler-view animation-fade">
      <div className="scheduler-grid">
        <div className="scheduler-main">
          <h3>Scheduler</h3>
          <p className="page-desc">Proactive tasks, cron jobs, and failure alerts—on a timeline.</p>
          <div className="calendar-card">
            <div className="calendar-header"><strong>{data.currentMonth}</strong><span>⏱ {data.timezone}</span></div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="cal-head">{d}</div>)}
              {days.map(d => <div key={d} className={`cal-day ${d === data.selectedDay ? 'selected' : ''}`}>{d}</div>)}
            </div>
          </div>
          <div className="timeline-section">
            <div className="timeline-label">📁 This Week</div>
            <div className="timeline-row"><span className="cat reports">● Reports</span><div className="gantt-bars"><div className="gantt-bar reports" style={{ left: '0%', width: '20%' }}>Weekly</div><div className="gantt-bar reports" style={{ left: '45%', width: '25%' }}>Monthly</div></div></div>
            <div className="timeline-row"><span className="cat backups">● Backups</span><div className="gantt-bars"><div className="gantt-bar backups" style={{ left: '15%', width: '10%' }}>Daily</div><div className="gantt-bar backups" style={{ left: '80%', width: '15%' }}>Full</div></div></div>
            <div className="timeline-row"><span className="cat alerts">● Alerts</span><div className="gantt-bars"><div className="gantt-bar alerts" style={{ left: '25%', width: '45%' }}>Monitoring</div></div></div>
          </div>
          <div className="failed-notice">⏱ {data.failedTasks} tasks failed in the last 24h <button>View</button></div>
        </div>
        <div className="metrics-sidebar">
          <h3>Metrics</h3>
          <p className="page-desc">Tasks, latency, and channel activity.</p>
          <div className="metric-block"><span>Tasks Completed (7d)</span><strong>{data.metrics.tasksCompleted}</strong></div>
          <div className="metric-block"><span>Avg Response Time (ms)</span><strong>{data.metrics.avgResponseTime}ms</strong></div>
          <div className="channel-activity"><h4>Channel Activity</h4>{data.metrics.channelActivity.map(c => <div key={c.name} className="channel-row"><span>{c.name}</span><div className="channel-bar"><div className="channel-fill" style={{ width: `${c.percent}%` }}></div></div><span>{c.percent}%</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function SecurityPage({ data }) {
  return (
    <section className="security-view animation-fade">
      <div className="security-grid">
        <div className="security-main">
          <h3>Security</h3>
          <p className="page-desc">Audit log, permission grants, and sandbox events.</p>
          <div className="activity-map"><div className="map-header"><span>Activity Map</span><span className="monitoring">● Monitoring</span></div><div className="map-visual">{data.activityMap.map((v, i) => <div key={i} className="map-bar" style={{ height: `${v * 3}px` }}></div>)}</div></div>
          <div className="audit-section"><div className="audit-header"><span>○ Audit Log</span><button>Export</button></div><table className="audit-table"><thead><tr><th>ACTION</th><th>TIME</th><th>DETAIL</th><th>STATUS</th></tr></thead><tbody>{data.auditLog.map((a, i) => <tr key={i}><td className="action-cell">{a.action}</td><td>{a.time}</td><td>{a.detail}</td><td className="status-cell">✓ {a.status}</td></tr>)}</tbody></table></div>
          <div className="security-stats"><div className="sec-stat"><strong className="green">{data.stats.blockRate}</strong><span>Block Rate</span></div><div className="sec-stat"><strong>{data.stats.breaches}</strong><span>Breaches</span></div><div className="sec-stat"><strong className="green">{data.stats.logRetention}</strong><span>Log Retention</span></div></div>
        </div>
        <div className="team-sidebar">
          <h3>Team</h3>
          <p className="page-desc">Switch agents, compare health, and share policies.</p>
          <div className="team-list">{data.team.map(t => <div key={t.name} className="team-card"><div className="team-header"><strong>{t.name}</strong><span className={`status-badge ${t.status === 'Online' ? 'online' : 'maint'}`}>{t.status}</span></div><div className="team-stats"><div><span>Uptime</span><strong>{t.uptime}</strong></div><div><span>Tasks</span><strong>{t.tasks}</strong></div><div><span>Health</span><strong className="green">{t.health}</strong></div></div></div>)}</div>
          <div className="policies-section"><h4>🔗 Shared Policies</h4>{data.policies.map(p => <div key={p.name} className="policy-row"><span>{p.name}</span><span className={p.value === 'enabled' || p.value === '90 days' ? 'green' : p.value === 'disabled' ? 'red' : 'muted'}>{p.value}</span></div>)}</div>
          <button className="add-agent-btn">+ Add Agent</button>
        </div>
      </div>
    </section>
  );
}

const styles = `
:root { --ink-blue: #003366; --ink-blue-muted: #4d7094; --ink-blue-light: #f0f6ff; --accent-blue: #0066cc; --border: #e2e8f0; --bg-main: #fcfcfc; }
body { margin: 0; font-family: 'Inter', system-ui, sans-serif; background: var(--bg-main); color: #1a1a1a; -webkit-font-smoothing: antialiased; }
.app-container { display: flex; height: 100vh; overflow: hidden; }
.side-nav { width: 240px; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 2rem 1rem; }
.side-nav-brand { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
.brand-icon { width: 32px; height: 32px; background: #d9f99d; color: #1a2e05; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.7rem; border-radius: 8px; }
.side-nav-brand h1 { font-size: 1rem; font-weight: 700; color: var(--ink-blue); margin: 0; }
.nav-items { display: flex; flex-direction: column; gap: 0.25rem; }
.nav-item { display: flex; align-items: center; padding: 0.7rem 1rem; border: none; background: transparent; color: #64748b; border-radius: 0.5rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; text-align: left; }
.nav-item:hover { background: #f8fafc; color: var(--ink-blue); }
.nav-item.active { background: #f1f5f9; color: var(--ink-blue); font-weight: 600; }
.nav-footer { margin-top: auto; border-top: 1px solid var(--border); padding-top: 1rem; }
.user-profile { display: flex; align-items: center; gap: 0.75rem; }
.avatar { width: 32px; height: 32px; background: var(--ink-blue); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
.user-info strong { display: block; font-size: 0.8rem; color: var(--ink-blue); }
.user-info span { font-size: 0.7rem; color: #64748b; }
.workspace { flex: 1; display: flex; flex-direction: column; padding: 2rem; overflow-y: auto; }
.workspace-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.header-left h2 { font-size: 1.5rem; font-weight: 800; color: var(--ink-blue); margin: 0; }
.header-left .timestamp { font-size: 0.8rem; color: #64748b; }
.header-right { display: flex; align-items: center; gap: 0.5rem; }
.system-status { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #64748b; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.green { background: #10b981; }
.animation-fade { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Overview - New Insightful Layout */
.overview-view-new { display: flex; flex-direction: column; gap: 1.5rem; animation: fadeIn 0.3s ease-out; }
.ov-hero-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
.ov-hero { background: #fff; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem 2rem; }
.ov-hero h1 { font-size: 2rem; line-height: 1.1; margin: 0 0 0.5rem 0; font-weight: 800; color: var(--ink-blue); }
.ov-hero p { font-size: 0.9rem; color: #64748b; margin: 0; }
.hero-dots { display: flex; gap: 6px; margin-bottom: 1rem; }
.hero-dots span { width: 10px; height: 10px; border-radius: 50%; background: #d9f99d; }
.ov-quick-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.ov-stat { background: white; border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; text-align: center; }
.ov-stat strong { display: block; font-size: 1.5rem; color: var(--ink-blue); font-weight: 800; }
.ov-stat span { display: block; font-size: 0.7rem; color: #64748b; margin-bottom: 0.25rem; }
.ov-stat small { font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; }
.ov-stat small.up { background: #dcfce7; color: #15803d; }
.ov-stat small.down { background: #fee2e2; color: #b91c1c; }

.ov-main-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem; }
.ov-col-left, .ov-col-right { display: flex; flex-direction: column; gap: 1rem; }

.ov-panel { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.25rem; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.panel-header h4 { margin: 0; font-size: 0.95rem; color: var(--ink-blue); font-weight: 700; }
.live-badge { color: #ef4444; font-size: 0.75rem; font-weight: 600; }
.status-online { color: #10b981; font-size: 0.75rem; font-weight: 600; }

.live-feed { display: flex; flex-direction: column; gap: 0.75rem; }
.feed-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid #f8fafc; }
.feed-item:last-child { border-bottom: none; }
.feed-icon { font-size: 1.25rem; }
.feed-content { flex: 1; }
.feed-content strong { display: block; font-size: 0.85rem; color: var(--ink-blue); font-weight: 600; }
.feed-content span { font-size: 0.7rem; color: #64748b; }
.feed-status { font-size: 0.9rem; }
.feed-status.done { color: #10b981; }

.trace-feed { display: flex; flex-direction: column; gap: 0.5rem; }
.trace-row { display: flex; align-items: flex-start; gap: 0.75rem; }
.trace-type { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; padding: 0.2rem 0.4rem; border-radius: 4px; background: #f1f5f9; color: #64748b; min-width: 60px; text-align: center; }
.trace-type.reasoning { background: #dbeafe; color: #1d4ed8; }
.trace-type.tool { background: #fef3c7; color: #92400e; }
.trace-type.action { background: #dcfce7; color: #15803d; }
.trace-row p { flex: 1; font-size: 0.8rem; color: var(--ink-blue); margin: 0; }

.terminal-info { display: flex; flex-direction: column; gap: 0.5rem; }
.term-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; padding: 0.25rem 0; }
.term-row span { color: #64748b; }
.term-row code { font-family: 'Monaco', monospace; font-size: 0.75rem; color: var(--accent-blue); background: #f8fafc; padding: 0.2rem 0.4rem; border-radius: 4px; }
.term-row strong { color: var(--ink-blue); }
.term-row strong.green { color: #10b981; }

.token-stats { }
.token-main { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.75rem; }
.token-main strong { font-size: 1.75rem; color: var(--ink-blue); font-weight: 800; }
.token-main span { font-size: 0.75rem; color: #64748b; }
.token-bar { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem; }
.token-fill { height: 100%; background: linear-gradient(90deg, #a3e635, #22d3d1); border-radius: 4px; }
.token-detail { display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; }
.token-detail strong { color: var(--ink-blue); }

.health-grid { display: flex; flex-direction: column; gap: 0.5rem; }
.health-item { }
.health-label { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
.health-label span { font-size: 0.75rem; color: #64748b; }
.health-label strong { font-size: 0.8rem; color: var(--ink-blue); }
.health-bar { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
.health-fill { height: 100%; border-radius: 3px; }

.logs-mini { display: flex; flex-direction: column; gap: 0.4rem; }
.log-mini-row { display: flex; gap: 0.75rem; font-size: 0.75rem; }
.log-time { color: #64748b; min-width: 40px; }
.log-text { color: var(--ink-blue); flex: 1; }
.green { color: #10b981 !important; }

/* Old Overview - kept for reference */
.overview-view { display: flex; flex-direction: column; gap: 1.5rem; }
.overview-top-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
.hero-card { background: #fff; border: 1px solid var(--border); border-radius: 1rem; padding: 2rem; }
.hero-card h1 { font-size: 2.5rem; line-height: 1.1; margin: 0 0 1rem 0; font-weight: 800; color: var(--ink-blue); }
.hero-card p { font-size: 1rem; color: #64748b; margin: 0; max-width: 400px; }
.metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.metric-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1rem; }
.metric-header { display: flex; justify-content: flex-end; margin-bottom: 0.5rem; }
.trend { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.4rem; border-radius: 4px; }
.trend.up { background: #dcfce7; color: #15803d; }
.trend.down { background: #fee2e2; color: #b91c1c; }
.metric-content h3 { font-size: 1.5rem; margin: 0; font-weight: 800; color: var(--ink-blue); }
.metric-content label { font-size: 0.75rem; color: #64748b; }
.activity-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; }
.card-header h4 { margin: 0; color: var(--ink-blue); font-size: 1rem; }
.card-header span { font-size: 0.75rem; color: #64748b; }
.chart-container { display: flex; align-items: flex-end; gap: 0.4rem; height: 80px; }
.chart-bar-wrap { flex: 1; }

.chart-bar { width: 100%; min-height: 4px; border-radius: 3px 3px 0 0; background: var(--accent-blue); }
.overview-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.sub-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.25rem; }
.sub-card h4 { margin: 0 0 1rem 0; color: var(--ink-blue); font-size: 0.95rem; }
.mini-trace { display: flex; flex-direction: column; gap: 0.5rem; }
.trace-item small { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: #64748b; }
.trace-item p { font-size: 0.8rem; margin: 0; color: var(--ink-blue); }
.mini-logs { display: flex; flex-direction: column; gap: 0.5rem; }
.log-row { display: flex; gap: 0.75rem; font-size: 0.8rem; }
.log-row .time { color: #64748b; flex-shrink: 0; }
.log-row p { margin: 0; color: var(--ink-blue); }

/* Usage */
.usage-view { }
.usage-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; }
.usage-left { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 2rem; }
.page-title { font-size: 1.5rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.page-desc { font-size: 0.9rem; color: #64748b; margin: 0 0 2rem 0; }
.big-cost { margin-bottom: 0.5rem; }
.big-cost .dollar { font-size: 1.5rem; color: #a3e635; font-weight: 700; vertical-align: top; }
.big-cost .amount { font-size: 3rem; font-weight: 800; color: var(--ink-blue); }
.billing-info { font-size: 0.8rem; color: #64748b; margin: 0 0 1.5rem 0; }
.token-count { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
.token-icon { font-size: 1.2rem; color: #a3e635; }
.token-count strong { font-size: 1.25rem; color: var(--ink-blue); }
.model-legend { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }
.legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #64748b; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; }
.budget-btn { width: 100%; padding: 0.75rem; background: #d9f99d; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; color: #1a2e05; }
.usage-right { display: flex; flex-direction: column; gap: 1rem; }
.model-split-card, .weekly-spend-card, .project-usage-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.25rem; }
.arc-chart { position: relative; width: 180px; height: 180px; margin: 1rem auto; }
.donut { width: 100%; height: 100%; }
.arc-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
.arc-center strong { display: block; font-size: 1.5rem; color: var(--ink-blue); }
.arc-center span { font-size: 0.75rem; color: #64748b; }
.trend-badge { font-size: 0.75rem; color: #a3e635; font-weight: 600; }
.weekly-chart { display: flex; align-items: flex-end; justify-content: space-between; height: 60px; }
.week-bar { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; flex: 1; }
.week-bar .bar { width: 60%; background: var(--ink-blue); border-radius: 3px 3px 0 0; }
.week-bar span { font-size: 0.65rem; color: #64748b; }
.project-list { display: flex; flex-direction: column; gap: 0.75rem; }
.project-row { display: flex; align-items: center; gap: 0.75rem; }
.pname { font-size: 0.85rem; color: var(--ink-blue); min-width: 120px; }
.pbar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
.pfill { height: 100%; background: #a3e635; border-radius: 3px; }
.pcost { font-size: 0.85rem; font-weight: 600; color: var(--ink-blue); }

/* Health */
.health-view { display: flex; flex-direction: column; gap: 1.5rem; }
.health-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.health-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.health-card h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 1rem 0; }
.status-badge { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--ink-blue); margin-bottom: 0.5rem; }
.uptime-info { font-size: 0.8rem; color: #64748b; margin: 0 0 1.5rem 0; }
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.stat-box { text-align: center; }
.stat-label { font-size: 0.7rem; color: #64748b; display: block; margin-bottom: 0.25rem; }
.stat-value { font-size: 1.25rem; color: var(--ink-blue); display: block; margin-bottom: 0.5rem; }
.stat-bar { height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden; }
.stat-fill { height: 100%; background: #a3e635; }
.activity-feed-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.live-dot { color: #10b981; font-size: 0.8rem; }
.activity-list { display: flex; flex-direction: column; gap: 1rem; }
.activity-item { display: flex; align-items: center; gap: 1rem; }
.activity-icon { font-size: 1.25rem; }
.activity-text { flex: 1; }
.activity-text strong { display: block; font-size: 0.9rem; color: var(--ink-blue); }
.activity-text span { font-size: 0.75rem; color: #64748b; }
.activity-dot { width: 8px; height: 8px; background: #a3e635; border-radius: 50%; }
.logs-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.logs-actions { display: flex; align-items: center; gap: 1rem; }
.logs-actions span { font-size: 0.75rem; color: #64748b; }
.logs-actions button { background: none; border: none; color: var(--ink-blue); font-weight: 600; cursor: pointer; font-size: 0.8rem; }
.logs-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.logs-table th { text-align: left; padding: 0.75rem 0; border-bottom: 1px solid var(--border); color: #64748b; font-weight: 600; font-size: 0.7rem; }
.logs-table td { padding: 0.75rem 0; border-bottom: 1px solid #f8fafc; color: var(--ink-blue); }
.type-cell { color: #a3e635; }
.duration-cell { color: #818cf8; }

/* Skills */
.skills-view { }
.skills-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
.skills-list-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.skills-list-card h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.search-box { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: #f8fafc; border-radius: 0.5rem; margin-bottom: 1rem; }
.search-box input { border: none; background: none; flex: 1; font-size: 0.9rem; outline: none; }
.skill-list { display: flex; flex-direction: column; gap: 0.75rem; }
.skill-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 0.75rem; }
.skill-icon { font-size: 1.5rem; }
.skill-info { flex: 1; }
.skill-title { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
.skill-title strong { color: var(--ink-blue); }
.rating { font-size: 0.75rem; color: #f59e0b; }
.skill-info p { font-size: 0.8rem; color: #64748b; margin: 0 0 0.5rem 0; }
.skill-meta { display: flex; gap: 1rem; font-size: 0.7rem; color: #64748b; }
.install-btn { background: none; border: none; color: #a3e635; font-weight: 600; cursor: pointer; font-size: 0.8rem; }
.skills-footer { display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.8rem; color: #64748b; }
.skills-footer button { background: none; border: none; color: #a3e635; font-weight: 600; cursor: pointer; }
.memory-card { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.memory-card h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.memory-actions { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.file-badge { font-size: 0.75rem; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; }
.memory-actions button { background: none; border: none; font-size: 0.75rem; color: #64748b; cursor: pointer; }
.save-btn { background: #d9f99d !important; color: #1a2e05 !important; padding: 0.25rem 0.5rem; border-radius: 4px; }
.memory-content { background: #f8fafc; border-radius: 0.5rem; padding: 1rem; max-height: 300px; overflow-y: auto; }
.memory-content pre { font-size: 0.75rem; color: var(--ink-blue); white-space: pre-wrap; margin: 0; font-family: 'Monaco', monospace; }
.memory-search { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 0.5rem; margin-top: 1rem; }
.memory-search input { border: none; background: none; flex: 1; font-size: 0.8rem; outline: none; }

/* Scheduler */
.scheduler-view { }
.scheduler-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
.scheduler-main { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.scheduler-main h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.calendar-card { border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; }
.calendar-header { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.9rem; }
.calendar-header strong { color: var(--ink-blue); }
.calendar-header span { color: #64748b; font-size: 0.75rem; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; text-align: center; }
.cal-head { font-size: 0.7rem; color: #64748b; padding: 0.5rem 0; }
.cal-day { font-size: 0.8rem; padding: 0.5rem; border-radius: 0.25rem; color: var(--ink-blue); cursor: pointer; }
.cal-day:hover { background: #f1f5f9; }
.cal-day.selected { background: #d9f99d; color: #1a2e05; font-weight: 600; }
.timeline-section { margin-bottom: 1.5rem; }
.timeline-label { font-size: 0.8rem; color: #64748b; margin-bottom: 0.75rem; }
.timeline-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.timeline-row .cat { font-size: 0.75rem; width: 80px; }
.cat.reports { color: #a3e635; }
.cat.backups { color: #818cf8; }
.cat.alerts { color: #22d3d1; }
.gantt-bars { flex: 1; height: 24px; background: #f8fafc; border-radius: 4px; position: relative; }
.gantt-bar { position: absolute; top: 4px; height: 16px; border-radius: 4px; font-size: 0.65rem; color: white; display: flex; align-items: center; padding: 0 0.5rem; }
.gantt-bar.reports { background: #a3e635; color: #1a2e05; }
.gantt-bar.backups { background: #818cf8; }
.gantt-bar.alerts { background: #22d3d1; color: #1a2e05; }
.failed-notice { font-size: 0.8rem; color: #64748b; display: flex; align-items: center; gap: 0.5rem; }
.failed-notice button { background: none; border: none; color: var(--ink-blue); font-weight: 600; cursor: pointer; }
.metrics-sidebar { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.metrics-sidebar h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.metric-block { margin-bottom: 1.5rem; }
.metric-block span { font-size: 0.75rem; color: #64748b; display: block; }
.metric-block strong { font-size: 2rem; color: var(--ink-blue); }
.channel-activity h4 { font-size: 0.85rem; color: var(--ink-blue); margin: 0 0 1rem 0; }
.channel-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.8rem; }
.channel-row span:first-child { width: 60px; color: #64748b; }
.channel-bar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
.channel-fill { height: 100%; background: var(--ink-blue); }

/* Security */
.security-view { }
.security-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
.security-main { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.security-main h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.activity-map { border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1.5rem; }
.map-header { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.85rem; color: #64748b; }
.monitoring { color: #10b981; }
.map-visual { display: flex; align-items: flex-end; gap: 0.5rem; height: 60px; }
.map-bar { flex: 1; background: var(--ink-blue); border-radius: 2px 2px 0 0; opacity: 0.7; }
.audit-section { margin-bottom: 1.5rem; }
.audit-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.85rem; }
.audit-header span { color: #64748b; }
.audit-header button { background: none; border: none; color: var(--ink-blue); font-weight: 600; cursor: pointer; font-size: 0.8rem; }
.audit-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.audit-table th { text-align: left; padding: 0.5rem 0; border-bottom: 1px solid var(--border); color: #64748b; font-weight: 600; }
.audit-table td { padding: 0.5rem 0; border-bottom: 1px solid #f8fafc; }
.action-cell { color: #a3e635; }
.status-cell { color: #10b981; }
.security-stats { display: flex; justify-content: space-around; text-align: center; padding: 1.5rem 0; border-top: 1px solid var(--border); }
.sec-stat strong { display: block; font-size: 1.5rem; color: var(--ink-blue); }
.sec-stat strong.green { color: #10b981; }
.sec-stat span { font-size: 0.75rem; color: #64748b; }
.team-sidebar { background: white; border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; }
.team-sidebar h3 { font-size: 1.25rem; font-weight: 800; color: var(--ink-blue); margin: 0 0 0.5rem 0; }
.team-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.team-card { border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem; }
.team-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.team-header strong { color: var(--ink-blue); }
.status-badge { font-size: 0.65rem; padding: 0.2rem 0.4rem; border-radius: 4px; }
.status-badge.online { background: #dcfce7; color: #15803d; }
.status-badge.maint { background: #fef3c7; color: #92400e; }
.team-stats { display: flex; gap: 1rem; }
.team-stats div { text-align: center; }
.team-stats span { font-size: 0.65rem; color: #64748b; display: block; }
.team-stats strong { font-size: 0.9rem; color: var(--ink-blue); }
.team-stats strong.green { color: #10b981; }
.policies-section { margin-bottom: 1.5rem; }
.policies-section h4 { font-size: 0.85rem; color: #64748b; margin: 0 0 0.75rem 0; }
.policy-row { display: flex; justify-content: space-between; font-size: 0.8rem; padding: 0.4rem 0; }
.policy-row span:first-child { color: var(--ink-blue); }
.policy-row .green { color: #10b981; }
.policy-row .red { color: #ef4444; }
.policy-row .muted { color: #64748b; }
.add-agent-btn { width: 100%; padding: 0.75rem; background: #d9f99d; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; color: #1a2e05; }
`;

export async function getStaticProps() {
  const data = buildWorkspaceData();
  return { props: data };
}
