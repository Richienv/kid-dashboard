import Head from 'next/head';
import { useMemo, useState } from 'react';

const navSections = [
  { key: 'status', label: 'Status overview', icon: '📊' },
  { key: 'files', label: 'Key workspace files', icon: '📁' },
  { key: 'timeline', label: 'Action history', icon: '🗂️' }
];

export default function Home({ statuses, files, timeline }) {
  const [activeSection, setActiveSection] = useState('status');
  const activeSectionData = useMemo(() => navSections.find((entry) => entry.key === activeSection), [activeSection]);

  return (
    <>
      <Head>
        <title>Kid Dashboard</title>
        <meta name="description" content="Kid control center untuk monitor memori, tasks, dan deploy." />
      </Head>
      <div className="app">
        <aside className="sidebar">
          <div className="brand">
            <p className="logo">Kid</p>
            <h2>Control</h2>
            <p className="intro">ERP-style board untuk monitor memori & automations.</p>
          </div>
          <nav className="nav">
            {navSections.map((entry) => (
              <a
                key={entry.key}
                href={`#${entry.key}`}
                className={activeSection === entry.key ? 'nav-link active' : 'nav-link'}
                onClick={() => setActiveSection(entry.key)}
              >
                <span className="icon" aria-hidden="true">
                  {entry.icon}
                </span>
                <span className="label">{entry.label}</span>
              </a>
            ))}
            <a
              href="https://vercel-demo-two-jet.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              <span className="icon">🧭</span>
              <span className="label">Live Kid</span>
            </a>
            <a
              href="https://github.com/Richienv/kid-dashboard"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              <span className="icon">🐙</span>
              <span className="label">GitHub</span>
            </a>
          </nav>
        </aside>
        <main className="main">
          <div className="topbar">
            <div>
              <h1>Kid Dashboard</h1>
              <small>Mac Mini control center — memori, task, dan automations.</small>
            </div>
            <div className="menu">
              {navSections.map((entry) => (
                <button
                  type="button"
                  key={entry.key}
                  className={activeSection === entry.key ? 'top-btn active' : 'top-btn'}
                  onClick={() => setActiveSection(entry.key)}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
          <FocusSection id="status" show={activeSection === 'status'}>
            <StatusPanel statuses={statuses} />
          </FocusSection>
          <FocusSection id="files" show={activeSection === 'files'}>
            <FilesPanel files={files} />
          </FocusSection>
          <FocusSection id="timeline" show={activeSection === 'timeline'}>
            <TimelinePanel timeline={timeline} />
          </FocusSection>
          <section className="panel" id="live-link">
            <h2>Kid live link</h2>
            <p className="statement">Satu link untuk monitor memori, tasks, deploy status.</p>
            <a className="link-cta" href="https://vercel-demo-two-jet.vercel.app" target="_blank" rel="noreferrer">
              https://vercel-demo-two-jet.vercel.app
            </a>
          </section>
          <footer>
            Butuh panel lain? Sebutkan saja dan saya tambahkan ke dashboard ini.
          </footer>
        </main>
      </div>
      <style jsx>{`
        .app {
          display: grid;
          grid-template-columns: 60px 1fr;
          min-height: 100vh;
        }
        .sidebar {
          background: rgba(6, 10, 20, 0.95);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          transition: width 0.3s ease;
          width: 60px;
          overflow: hidden;
        }
        .sidebar:hover {
          width: 260px;
        }
        .brand {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sidebar:hover .brand {
          opacity: 1;
        }
        .logo {
          font-size: 1rem;
          letter-spacing: 0.4em;
          font-weight: 600;
          text-transform: uppercase;
          color: #7ee5ff;
          margin: 0;
        }
        .nav {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .nav-link {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 0.55rem 0.75rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          transition: background 0.2s ease;
        }
        .nav-link .label {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sidebar:hover .nav-link .label {
          opacity: 1;
        }
        .nav-link.active {
          background: rgba(255,255,255,0.12);
          color: #ffffff;
        }
        .icon {
          font-size: 1.2rem;
        }
        .main {
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .topbar h1 {
          margin: 0;
          font-size: clamp(2rem, 3vw, 3rem);
        }
        small {
          color: rgba(255,255,255,0.6);
        }
        .menu {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .top-btn {
          border: none;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          color: white;
          padding: 0.45rem 1rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease;
        }
        .top-btn.active,
        .top-btn:hover {
          background: rgba(255,255,255,0.18);
        }
        .panel {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.5rem;
          padding: 1.6rem;
          box-shadow: 0 25px 50px rgba(3,5,16,0.45);
        }
        .panel h2 {
          margin-top: 0;
          font-size: 1.4rem;
        }
        .status-grid,
        .files {
          display: grid;
          gap: 0.8rem;
        }
        .status-grid {
          grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
        }
        .status-card,
        .file-card {
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.04);
          padding: 1rem;
        }
        .status-card strong,
        .file-card strong {
          color: #7ee5ff;
          display: block;
          margin-bottom: 0.35rem;
        }
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .timeline-item {
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1rem;
          background: rgba(255,255,255,0.02);
        }
        .statement {
          color: rgba(255,255,255,0.7);
        }
        .link-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          border-radius: 1rem;
          padding: 0.9rem 1.3rem;
          background: linear-gradient(120deg,#ff7c6b,#f05c8a);
          color: white;
          font-weight: 600;
          text-decoration: none;
        }
        footer {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }
        @media (max-width: 900px) {
          .app {
            grid-template-columns: 1fr;
          }
          .sidebar {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content: space-between;
          }
          .sidebar:hover {
            width: 100%;
          }
          .brand {
            opacity: 1;
          }
          .sidebar:hover .nav-link .label {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function FocusSection({ id, children, show }) {
  return (
    <section id={id} className="panel" style={{ display: show ? 'block' : 'none' }}>
      {children}
    </section>
  );
}

function StatusPanel({ statuses }) {
  return (
    <>
      <h2>Status overview</h2>
      <div className="status-grid">
        {statuses.map((status) => (
          <div key={status.title} className="status-card">
            <strong>{status.title}</strong>
            <p>{status.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function FilesPanel({ files }) {
  return (
    <>
      <h2>Key workspace files</h2>
      <div className="files">
        {files.map((file) => (
          <div key={file.name} className="file-card">
            <strong>{file.name}</strong>
            <p>{file.desc}</p>
          </div>
        ))}
      </div>
      <p className="legend">Semua data tinjau memori ada di `memory/` + dokumen root utama; tinggal bilang kalau mau file tambahan muncul.</p>
    </>
  );
}

function TimelinePanel({ timeline }) {
  return (
    <>
      <h2>Action history</h2>
      <div className="timeline">
        {timeline.map((entry) => (
          <div key={entry.title} className="timeline-item">
            <p><strong>{entry.title}</strong></p>
            <p>{entry.detail}</p>
            <p className="legend">{entry.note}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await import('../data/workspace');
  return {
    props: data.workspaceData
  };
}
