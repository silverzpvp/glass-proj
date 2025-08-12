// small interactions: year, smooth scroll, theme toggle
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// theme toggle: simple light fallback (prefers-color-scheme aware)
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme'); // 'light' or 'dark'

function applyTheme(t){
  if (t === 'light'){
    root.style.setProperty('--bg','#f7fbff');
    root.style.setProperty('--panel','#ffffff');
    root.style.setProperty('--muted','#556677');
    root.style.setProperty('--accent','#0f6fff');
    root.style.color = '#071428';
    toggle.textContent = '🌞';
  } else {
    root.style.setProperty('--bg','#0b0f14');
    root.style.setProperty('--panel','#0f1720');
    root.style.setProperty('--muted','#9aa5b1');
    root.style.setProperty('--accent','#5efcff');
    root.style.color = '';
    toggle.textContent = '🌙';
  }
  localStorage.setItem('theme', t);
}

toggle.addEventListener('click', () => {
  const cur = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(cur === 'dark' ? 'light' : 'dark');
});

// init theme
applyTheme(saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
