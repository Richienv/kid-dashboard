export const workspaceData = {
  statuses: [
    {
      title: 'Codex mode',
      body: 'gpt-5.2-codex terautentikasi; siap menjalankan `codex exec`, `review`, dan `apply` dari sini.'
    },
    {
      title: 'Kid link',
      body: 'https://vercel-demo-two-jet.vercel.app — satu gateway untuk melihat memori, task, dan deploy log.'
    },
    {
      title: 'GitHub',
      body: 'https://github.com/Richienv/kid-dashboard (kita push setiap desain baru untuk auto deploy).' 
    },
    {
      title: 'Heartbeat',
      body: 'Ikuti HEARTBEAT.md: cek status aktif, update per menit kalau task berat, dan kirim ringkasan WhatsApp.'
    }
  ],
  files: [
    { name: 'SOUL.md', desc: 'Persona Kid & tone, dasar gaya bicara.' },
    { name: 'IDENTITY.md', desc: 'Nama, emoji, sumber mood, pronoun Kid.' },
    { name: 'USER.md', desc: 'Richie preferences, rutinitas, prioritas uang & thesis.' },
    { name: 'MEMORY.md', desc: 'Long-term context — thesis, outreach, beliefs, access.' },
    { name: 'HEARTBEAT.md', desc: 'Rules rutin cek mac mini + update WhatsApp.' },
    { name: 'WEEK1_ROADMAP.md', desc: 'Roadmap awal & perintah yang diarahkan ke Codex.' },
    { name: 'AGENTS.md', desc: 'Panduan ini workspace: bacalah sebelum mulai kerja.' },
    { name: 'TOOLS.md', desc: 'Catatan skill khusus, TTS, kamera, preferensi lingkungan.' },
    { name: 'memory/', desc: 'Folder log harian — siap di-parse untuk timeline atau summary.' }
  ],
  timeline: [
    {
      title: 'Dashboard rebuild',
      detail: 'Kid dashboard berubah jadi layout ERP dengan sidebar + topbar, data API, dan command kit.',
      note: 'Next: animasi cat status + update log memory.'
    },
    {
      title: 'GitHub & deploy',
      detail: 'Repo GitHub kid-dashboard siap; Vercel auto deploy setiap push.',
      note: 'Gunakan src/dir data untuk referensi live (Next API menghidangkan JSON).'
    },
    {
      title: 'Automation vision',
      detail: 'Setiap `/self-improving-agent` akan memicu ide—“now you can see my thought process” note, animasi status, dll.',
      note: 'Saya siap catat ke dashboard via timeline section.'
    }
  ]
};
