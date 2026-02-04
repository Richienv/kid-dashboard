import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const projectRoot = path.resolve(process.cwd());
const workspaceRoot = path.resolve(projectRoot, '..');

const safeExecSync = (cmd, cwd) => {
  try {
    return execSync(cmd, { cwd, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
};

const readFileSafe = (target) => {
  try {
    return fs.readFileSync(target, 'utf8');
  } catch {
    return '';
  }
};

const listDir = (dir) => {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
};

const parseSkillMetadata = (content) => {
  if (!content) return {};
  const match = content.match(/---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const section = match[1];
  const getValue = (pattern) => {
    const found = section.match(pattern);
    return found ? found[1].trim() : '';
  };
  const metadataRaw = getValue(/^\s*metadata:\s*(\{.*\})$/m);
  let metadata = {};
  if (metadataRaw) {
    try {
      metadata = JSON.parse(metadataRaw);
    } catch (err) {
      metadata = {};
    }
  }
  return {
    name: getValue(/^\s*name:\s*(.+)$/m),
    description: getValue(/^\s*description:\s*(.+)$/m),
    metadata
  };
};

const formatRelativeTime = (timestampMs) => {
  if (!timestampMs) return 'Unknown';
  const diff = Date.now() - timestampMs;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.round(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.round(diff / 3600000)}h ago`;
  const days = Math.floor(diff / 86400000);
  return `${days}d ago`;
};

const collectMemoryFiles = () => {
  const memoryDir = path.join(workspaceRoot, 'memory');
  return listDir(memoryDir)
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => ({
      name: entry.name,
      time: fs.statSync(path.join(memoryDir, entry.name)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
};

const latestMemory = () => {
  const files = collectMemoryFiles();
  if (!files.length) return { name: 'MEMORY.md', content: '' };
  const filePath = path.join(workspaceRoot, 'memory', files[0].name);
  return { name: files[0].name, content: readFileSafe(filePath) };
};

const gitLogLines = () => {
  const log = safeExecSync('git log -5 --pretty=format:%h|%s', projectRoot);
  if (!log) return [];
  return log.split('\n').map((line, index) => {
    const [hash, text] = line.split('|');
    return { id: index, hash, text };
  });
};

const gitStatusLines = () => {
  const output = safeExecSync('git status -sb', projectRoot);
  if (!output) return [];
  return output.split('\n');
};

const buildDecisionTrace = () => {
  const manualTrace = readFileSafe(path.join(projectRoot, 'function-req.txt'))
    .split('\n')
    .filter(Boolean)
    .map((line, index) => ({ id: 100 + index, type: 'action', content: line.trim() }));
  const gitLogs = gitLogLines().map((entry) => ({ id: entry.id, type: 'tool', content: `git ${entry.text}` }));
  return [...manualTrace.slice(0, 3), ...gitLogs];
};

const buildChatLogs = () => {
  const memorySample = latestMemory().content
    .split('\n')
    .filter((line) => line.trim().length)
    .slice(-4)
    .map((line, i) => ({ role: 'note', text: line.trim(), time: `${16 - i}:00` }));
  return memorySample;
};

const gatherLiveEvents = () => {
  const events = gitStatusLines().slice(0, 5).map((line, i) => ({
    icon: '⚙️',
    text: line,
    time: `${i * 2 + 1}m ago`,
    status: 'done'
  }));
  if (!events.length) {
    events.push({ icon: '✅', text: 'Workspace clean', time: 'just now', status: 'done' });
  }
  return events;
};

const readBuddyLog = () => {
  const logPath = path.join(projectRoot, 'buddy-checkin.md');
  try {
    const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
    return lines.slice(-3).map((line) => line.replace(/^-\s*/, ''));
  } catch {
    return [];
  }
};

const readThesisTracker = () => {
  const tracker = path.join(projectRoot, 'thesis-tracker.md');
  try {
    const text = fs.readFileSync(tracker, 'utf8');
    return text.split('\n').slice(0, 20).join('\n');
  } catch {
    return '';
  }
};

const normalizeSkillKey = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ');

const findSkillMatch = (text, skills) => {
  const normalized = normalizeSkillKey(text);
  if (!normalized) return null;
  return skills.find((skill) => {
    const candidate = normalizeSkillKey(skill.name);
    const desc = normalizeSkillKey(skill.desc);
    const firstWord = candidate.split(' ')[0];
    const descWord = desc.split(' ')[0];
    return (candidate && normalized.includes(candidate)) || (firstWord && normalized.includes(firstWord)) || (desc && normalized.includes(descWord));
  });
};

const buildActiveSkills = (liveEvents, skills) => {
  const matches = [];
  liveEvents.forEach((event) => {
    const skill = findSkillMatch(event.text, skills);
    if (skill) {
      const existing = matches.find((s) => s.name === skill.name);
      const entry = {
        name: skill.name,
        icon: skill.icon,
        lastSeen: event.time,
        event: event.text,
        status: skill.status || 'aktif'
      };
      if (existing) existing.lastSeen = entry.lastSeen;
      else matches.push(entry);
    }
  });
  return matches;
};

const deriveNextMove = (buddyLog, thesisSummary) => {
  if (!buddyLog.length && !thesisSummary) return 'Ask me anything about your thesis, and I will log it here.';
  const latest = buddyLog[buddyLog.length - 1] || 'No recent question yet.';
  const thesisHint = thesisSummary ? thesisSummary.split('\n').find((line) => line.trim()) : '';
  const thesisLine = thesisHint ? `I also captured: "${thesisHint.trim()}".` : '';
  return `Next move: respond to the question "${latest}". ${thesisLine} If you need a subtask, tell me to log it.`;
};

const gatherSkills = () => {
  const skillsDir = path.join(workspaceRoot, 'skills');
  const entries = listDir(skillsDir).filter((entry) => entry.isDirectory());
  const fallback = [
    {
      name: 'kid-insights',
      rating: '4.9',
      desc: 'Monitor Kid core signals',
      downloads: '6.4K',
      updated: '1d ago',
      status: 'aktif',
      lastUpdated: '1d ago',
      icon: '💡',
      refreshCommand: 'codex exec -- "cd ../skills/kid-insights && git pull"'
    },
    {
      name: 'vibe-ml',
      rating: '4.6',
      desc: 'Generative timeline prompts',
      downloads: '3.2K',
      updated: '3d ago',
      status: 'butuh update',
      lastUpdated: '3d ago',
      icon: '✨',
      refreshCommand: 'codex exec -- "cd ../skills/vibe-ml && git pull"'
    }
  ];
  if (!entries.length) return fallback;
  return entries
    .map((entry, index) => {
      const skillPath = path.join(skillsDir, entry.name);
      const metaText = readFileSafe(path.join(skillPath, 'SKILL.md'));
      const meta = parseSkillMetadata(metaText);
      let stats = null;
      try {
        stats = fs.statSync(skillPath);
      } catch {
        stats = null;
      }
      const updated = stats ? formatRelativeTime(stats.mtimeMs) : 'Unknown';
      const ageMs = stats ? Date.now() - stats.mtimeMs : Infinity;
      const status = ageMs < 1000 * 60 * 60 * 24 ? 'aktif' : 'butuh update';
      const clawMeta = (meta.metadata && meta.metadata.clawdbot) || {};
      const emoji = clawMeta.emoji || '🧠';
      const rating = clawMeta.rating || (4 + (index % 6) * 0.1).toFixed(1);
      const downloads = clawMeta.downloads || `${Math.floor(3 + index * 0.8)}K`;
      const refreshCommand = `codex exec -- "cd ../skills/${entry.name} && git pull"`;
      return {
        name: meta.name || entry.name,
        desc: meta.description || 'Ready for fast installs.',
        downloads,
        updated,
        lastUpdated: updated,
        status,
        icon: emoji,
        rating,
        refreshCommand
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
export function buildWorkspaceData() {
  const memFiles = collectMemoryFiles();
  const commitCount = safeExecSync('git rev-list --count HEAD', projectRoot) || '0';
  const skillsList = gatherSkills();
  const heroMetrics = [
    { label: 'Memory files', value: `${memFiles.length}`, trend: memFiles.length ? `+${memFiles.length}` : '—', type: 'up' },
    { label: 'Skills ready', value: `${skillsList.length}`, trend: '+1', type: 'up' },
    { label: 'Git commits', value: commitCount, trend: '+1', type: 'up' },
    { label: 'Uptime', value: `${Math.floor(process.uptime() / 60)}m`, trend: '-0m', type: 'down' }
  ];

  const liveEvents = gatherLiveEvents();
  const liveEventsWithSkill = liveEvents.map((event) => {
    const skill = findSkillMatch(event.text, skillsList);
    return { ...event, skill: skill ? skill.name : null };
  });
  const activeSkills = buildActiveSkills(liveEventsWithSkill, skillsList);
  const buddyLog = readBuddyLog();
  const thesisSummary = readThesisTracker();

  const memorySnapshot = latestMemory();
  const nextMove = deriveNextMove(buddyLog, thesisSummary);
  const usageData = {
    totalSpend: Math.max(120, memFiles.length * 12),
    billingCycle: 'Budget refreshes every 30 days',
    totalTokens: `${Math.min(12, memFiles.length) * 120}K`,
    modelSplit: [
      { name: 'gpt-4', percent: 45, color: '#a3e635' },
      { name: 'Claude', percent: 35, color: '#818cf8' },
      { name: 'Local', percent: 20, color: '#22d3d1' }
    ],
    weeklySpend: Array.from({ length: 7 }, (_, i) => ({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], amount: 200 + i * 45 })),
    projectUsage: [
      { name: 'Kid Dashboard', cost: 680, percent: 55 },
      { name: 'ERP Pilot', cost: 420, percent: 32 },
      { name: 'Research', cost: 220, percent: 12 }
    ]
  };

  const { totalmem, freemem } = os;
  const usageMemory = Math.round(((totalmem() - freemem()) / totalmem()) * 100);
  const healthStats = [
    { name: 'CPU', value: Math.round((os.loadavg()[0] / (os.cpus().length || 1)) * 100) },
    { name: 'Memory', value: usageMemory },
    { name: 'Storage', value: 48 },
    { name: 'Network', value: Math.min(100, Math.round(Math.random() * 40 + 50)) }
  ];

  const schedulerMetrics = {
    tasksCompleted: 120 + memFiles.length,
    avgResponseTime: 90 + memFiles.length,
    channelActivity: [
      { name: 'WhatsApp', percent: 45 },
      { name: 'Email', percent: 30 },
      { name: 'Slack', percent: 15 },
      { name: 'Other', percent: 10 }
    ]
  };

  const securityTeam = [
    { name: 'Personal', status: 'Online', uptime: '14d 3h', tasks: 142, health: 'Good' },
    { name: 'Family', status: 'Online', uptime: '7d 12h', tasks: 89, health: 'Good' },
    { name: 'Company', status: 'Maintenance', uptime: '2h 15m', tasks: 0, health: 'Good' }
  ];

  return {
    overview: {
      hero: { title: 'Kid Live Control', desc: 'Everything you need to monitor Richie + Codex in one responsive board.' },
      metrics: heroMetrics,
      activityData: [],
      liveEvents: liveEventsWithSkill,
      buddyLog,
      thesisSummary
    },
    usage: usageData,
    health: {
      status: 'All systems operational',
      uptime: `${Math.round(process.uptime() / 3600)}h`,
      lastIncident: 'None this week',
      systemStats: healthStats,
      liveActivity: liveEventsWithSkill,
      recentLogs: liveEventsWithSkill.slice(0, 6).map((e, idx) => ({ time: `${16 - idx}:${(idx * 3).toString().padStart(2, '0')}`, type: 'action', detail: e.text, duration: `${idx + 1}s` }))
    },
    skills: skillsList,
    memory: {
      currentFile: memorySnapshot.name,
      files: memFiles.map((f) => f.name),
      content: memorySnapshot.content
    },
    scheduler: {
      currentMonth: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      timezone: 'Asia/Shanghai',
      selectedDay: new Date().getDate(),
      tasks: {
        reports: [{ start: 1, end: 2, label: 'Weekly' }, { start: 15, end: 17, label: 'Monthly' }],
        backups: [{ start: 3, end: 3, label: 'Daily' }, { start: 28, end: 29, label: 'Full' }],
        alerts: [{ start: 9, end: 15, label: 'Monitoring' }]
      },
      metrics: schedulerMetrics,
      failedTasks: Math.min(5, memFiles.length)
    },
    security: {
      activityMap: [10, 15, 8, 22, 5, 18, 12, 25, 8, 14],
      auditLog: liveEvents.slice(0, 6).map((evt, idx) => ({ action: evt.icon, time: evt.time, detail: evt.text, status: 'allowed' })),
      stats: { blockRate: '99.9%', breaches: 0, logRetention: '28d' },
      team: securityTeam,
      policies: [
        { name: 'Default sandbox level', value: 'restricted' },
        { name: 'Auto-approve shell', value: 'disabled' },
        { name: 'Memory encryption', value: 'enabled' },
        { name: 'Audit retention', value: '90 days' }
      ]
    },
    biometrics: { energy: 82, sleep: 7.2, focus: 'High', water: '1.2L', alerts: [] },
    decisionTrace: buildDecisionTrace(),
    chatLogs: buildChatLogs(),
    activeSkills,
    buddyLog,
    thesisSummary,
    nextMove
  };
}
