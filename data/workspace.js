export const workspaceData = {
  overview: {
    hero: {
      title: "Onedashboard. Fullcommand.",
      desc: "Monitor agents, costs, and memory. Schedule tasks and secure access—without switching contexts."
    },
    metrics: [
      { label: 'API Calls', value: '2.4M', trend: '+12%', type: 'up' },
      { label: 'Active Agents', value: '8', trend: '+2', type: 'up' },
      { label: 'Messages', value: '14.2K', trend: '+8%', type: 'up' },
      { label: 'Uptime', value: '99.97%', trend: '-0.01%', type: 'down' }
    ],
    activityData: [12, 18, 14, 25, 30, 10, 8, 35, 22, 15, 14, 28, 40, 12, 18, 32, 25, 42, 12, 18, 36, 14, 28, 30]
  },

  // Usage & Cost Page
  usage: {
    totalSpend: 2847.12,
    billingCycle: 'Current billing cycle • 12 days remaining',
    totalTokens: '4.2M',
    modelSplit: [
      { name: 'Claude', percent: 45, color: '#a3e635' },
      { name: 'GPT-4', percent: 30, color: '#818cf8' },
      { name: 'Local', percent: 15, color: '#22d3d1' },
      { name: 'Other', percent: 10, color: '#6b7280' }
    ],
    weeklySpend: [
      { day: 'Mon', amount: 320 },
      { day: 'Tue', amount: 280 },
      { day: 'Wed', amount: 450 },
      { day: 'Thu', amount: 380 },
      { day: 'Fri', amount: 520 },
      { day: 'Sat', amount: 290 },
      { day: 'Sun', amount: 180 }
    ],
    projectUsage: [
      { name: 'Production API', cost: 1240, percent: 65 },
      { name: 'Dev Testing', cost: 680, percent: 35 },
      { name: 'Research', cost: 420, percent: 22 },
      { name: 'Personal', cost: 180, percent: 10 }
    ]
  },

  // Health Page
  health: {
    status: 'All systems operational',
    uptime: '99.97%',
    lastIncident: '3 days ago',
    systemStats: [
      { name: 'CPU', value: 34, icon: 'cpu' },
      { name: 'Memory', value: 62, icon: 'memory' },
      { name: 'Storage', value: 45, icon: 'storage' },
      { name: 'Network', value: 78, icon: 'network' }
    ],
    liveActivity: [
      { icon: 'mail', text: 'Inbox cleared 5 emails', time: '2m ago' },
      { icon: 'bell', text: 'Reminder sent', time: '5m ago' },
      { icon: 'globe', text: 'Browser task completed', time: '12m ago' },
      { icon: 'check', text: 'Calendar synced', time: '18m ago' }
    ],
    recentLogs: [
      { time: '09:12:03', type: 'skill_run', detail: 'calendar_sync', duration: '240ms' },
      { time: '09:11:41', type: 'memory_update', detail: 'user_prefs', duration: '80ms' },
      { time: '09:10:18', type: 'proactive', detail: 'daily_brief', duration: '1.2s' },
      { time: '09:08:52', type: 'shell_exec', detail: 'backup_script', duration: '3.4s' },
      { time: '09:05:33', type: 'api_call', detail: 'claude_completion', duration: '890ms' },
      { time: '09:02:11', type: 'file_write', detail: 'memory_store', duration: '45ms' },
      { time: '08:58:47', type: 'web_scrape', detail: 'news_fetch', duration: '2.1s' },
      { time: '08:55:22', type: 'skill_run', detail: 'email_digest', duration: '560ms' }
    ]
  },

  // Skills Page
  skills: [
    { name: 'email-assistant', rating: 4.8, desc: 'Automate drafts, labels, sends.', downloads: '12.4K', updated: '2d ago', icon: 'mail' },
    { name: 'calendar-sync', rating: 4.6, desc: 'Bi-directional calendar sync.', downloads: '8.2K', updated: '1w ago', icon: 'calendar' },
    { name: 'web-research', rating: 4.9, desc: 'Scrape + summarize with citations.', downloads: '15.1K', updated: '3d ago', icon: 'globe' },
    { name: 'slack-mod', rating: 4.5, desc: 'Moderate channels, post summaries.', downloads: '6.8K', updated: '5d ago', icon: 'message' },
    { name: 'github-triage', rating: 4.7, desc: 'Label issues, suggest assignees.', downloads: '9.9K', updated: '1d ago', icon: 'code' },
    { name: 'notion-db', rating: 4.4, desc: 'Query and update Notion databases.', downloads: '5.6K', updated: '2w ago', icon: 'database' }
  ],
  memory: {
    currentFile: 'user_prefs.md',
    files: ['user_prefs.md', 'SOUL.md', 'IDENTITY.md', 'MEMORY.md'],
    content: `## User Preferences

### Communication Style
- Preferred tone: concise, professional
- Response length: brief unless asked for detail
- Use bullet points for lists

### Working Hours
- Primary: 09:00 - 12:00, 13:00 - 17:00
- Timezone: America/New_York
- Do not schedule meetings before 09:00

### Priorities
- Email: High priority on client communications
- Calendar: Protect focus time blocks`
  },

  // Scheduler Page
  scheduler: {
    currentMonth: 'February 2026',
    timezone: 'UTC-5',
    selectedDay: 4,
    tasks: {
      reports: [
        { start: 1, end: 2, label: 'Weekly' },
        { start: 6, end: 8, label: 'Monthly' }
      ],
      backups: [
        { start: 3, end: 3, label: 'Daily' },
        { start: 26, end: 27, label: 'Full' }
      ],
      alerts: [
        { start: 9, end: 15, label: 'Monitoring' }
      ]
    },
    metrics: {
      tasksCompleted: 333,
      avgResponseTime: 156,
      channelActivity: [
        { name: 'Slack', percent: 45 },
        { name: 'Email', percent: 30 },
        { name: 'Discord', percent: 15 },
        { name: 'Other', percent: 10 }
      ]
    },
    failedTasks: 2
  },

  // Security Page
  security: {
    activityMap: [10, 15, 8, 22, 5, 18, 12, 25, 8, 14],
    auditLog: [
      { action: 'shell_exec', time: '2m ago', detail: 'backup_script.sh', status: 'allowed' },
      { action: 'file_write', time: '12m ago', detail: 'memory/user_prefs.md', status: 'allowed' },
      { action: 'permission_api', time: '1h ago', detail: 'gmail/send_mail', status: 'allowed' },
      { action: 'sandbox_api', time: '2h ago', detail: 'browser_action', status: 'allowed' },
      { action: 'api_key_use', time: '3h ago', detail: 'claude_api_key', status: 'allowed' },
      { action: 'network', time: '4h ago', detail: 'external_fetch', status: 'allowed' }
    ],
    stats: {
      blockRate: '99.9%',
      breaches: 0,
      logRetention: '24h'
    },
    team: [
      { name: 'Personal', status: 'Online', uptime: '14d 3h', tasks: 142, health: 'Good' },
      { name: 'Family', status: 'Online', uptime: '7d 12h', tasks: 89, health: 'Good' },
      { name: 'Company', status: 'Maintenance', uptime: '2h 15m', tasks: 0, health: 'Good' }
    ],
    policies: [
      { name: 'Default sandbox level', value: 'restricted' },
      { name: 'Auto-approve shell', value: 'disabled' },
      { name: 'Memory encryption', value: 'enabled' },
      { name: 'Audit retention', value: '90 days' }
    ]
  },

  // Legacy data for backwards compatibility
  biometrics: { energy: 82, sleep: 7.2, focus: 'High', water: '1.2L', alerts: [] },
  decisionTrace: [
    { id: 1, type: 'reasoning', content: 'Analyzing thesis requirements from MEMORY.md...' },
    { id: 2, type: 'tool', content: 'Executing "search_web" for "Agentic AI trends 2026"...' },
    { id: 3, type: 'action', content: 'Summarizing 12 results into MD format.' }
  ],
  chatLogs: [
    { role: 'agent', text: 'I decided to call the Email Skill to clear your inbox.', time: '16:10' },
    { role: 'system', text: 'Fetched 15 unread emails. Processed & Archived.', time: '16:11' }
  ],
  orchestrator: [],
  statuses: [],
  costs: { totalSpent: 42.50, budgetLimit: 100, breakdown: [] },
  infrastructure: { containers: [], vps: { cpu: '4%', ram: '1.2/4GB', disk: '22/80GB' } }
};
