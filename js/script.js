/* =========================================================
   VEDANT PILLAI — PORTFOLIO
   script.js
   ========================================================= */

'use strict';

/* ── 1. PARTICLE CANVAS ─────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, animId;

  const CONFIG = {
    count:       70,
    maxDist:     110,
    speed:       0.28,
    colors:      ['#63b3ed', '#68d391', '#b794f4'],
    minSize:     0.8,
    maxSize:     2.2,
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * CONFIG.speed,
      vy:   (Math.random() - 0.5) * CONFIG.speed,
      r:    CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
      alpha: 0.3 + Math.random() * 0.5,
      color,
    };
  }

  function build() {
    particles = Array.from({ length: CONFIG.count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDist) {
          ctx.globalAlpha = (1 - dist / CONFIG.maxDist) * 0.12;
          ctx.strokeStyle = '#63b3ed';
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* dots */
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      /* update */
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }

  resize();
  build();
  draw();
  window.addEventListener('resize', () => { resize(); });
})();


/* ── 2. CUSTOM CURSOR ────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  /* hover state */
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* hide on mobile */
  window.matchMedia('(hover: none)').matches && (dot.style.display = ring.style.display = 'none');
})();


/* ── 3. NAVBAR ───────────────────────────────────────────── */
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('navMenu');
  const links  = document.querySelectorAll('#navMenu a');

  /* scroll class */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    /* active link */
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* logo → top */
  const logo = document.getElementById('logoImage');
  if (logo) logo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ── 4. SCROLL REVEAL ────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ── 5. ANIMATED COUNTERS ────────────────────────────────── */
(function initCounters() {
  const items = document.querySelectorAll('.counter-val');
  if (!items.length) return;

  function run(el) {
    const target  = parseFloat(el.dataset.target);
    const dec     = parseInt(el.dataset.decimal || '0');
    const suffix  = el.dataset.suffix || '';
    const dur     = 1500;
    const start   = performance.now();

    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const val  = target * ease;
      el.textContent = (dec ? val.toFixed(dec) : Math.floor(val)) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        run(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  items.forEach(el => io.observe(el));
})();


/* ── 6. EXPERTISE BARS ───────────────────────────────────── */
(function initBars() {
  const container = document.getElementById('bars-container');
  if (!container) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fg').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animate'), i * 120);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  io.observe(container);
})();


/* ── 7. HERO TERMINAL TYPER ──────────────────────────────── */
(function initTerminal() {
  const cmdEl    = document.querySelector('.term-cmd');
  const outputEl = document.getElementById('term-output');
  if (!cmdEl || !outputEl) return;

  const sequences = [
    {
      cmd: 'whoami',
      out: [
        { text: 'Vedant Pillai', cls: 'ok' },
        { text: 'aka Titan-Hack', cls: '' },
      ],
    },
    {
      cmd: 'cat hall_of_fame.txt',
      out: [
        { text: '✓ Cisco        ✓ US HHS', cls: 'ok' },
        { text: '✓ IBM        ✓ Duke University', cls: 'ok' },
        { text: '✓ WHO      ✓ Elsevier', cls: 'ok' },
      ],
    },
  ];

  let seqIdx = 0;

  function typeCmd(str, cb) {
    cmdEl.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      cmdEl.textContent += str[i++];
      if (i === str.length) { clearInterval(iv); setTimeout(cb, 420); }
    }, 55);
  }

  function showOutput(lines, cb) {
    outputEl.innerHTML = '';
    lines.forEach((l, idx) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.textContent = l.text;
        if (l.cls) d.classList.add(l.cls);
        outputEl.appendChild(d);
        if (idx === lines.length - 1) setTimeout(cb, 1800);
      }, idx * 160);
    });
  }

  function eraseCmd(cb) {
    const iv = setInterval(() => {
      cmdEl.textContent = cmdEl.textContent.slice(0, -1);
      if (!cmdEl.textContent) { clearInterval(iv); outputEl.innerHTML = ''; cb(); }
    }, 30);
  }

  function loop() {
    const seq = sequences[seqIdx % sequences.length];
    seqIdx++;
    typeCmd(seq.cmd, () => {
      showOutput(seq.out, () => {
        eraseCmd(loop);
      });
    });
  }

  // start after hero animations settle
  setTimeout(loop, 1400);
})();


/* ── 8. SMOOTH SCROLL FOR ALL ANCHOR LINKS ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 9. SKILL CARD HOVER — mouse-tracking glow ───────────── */
(function initCardGlow() {
  document.querySelectorAll('.skill-card, .proj-card, .ach-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();


/* ── 10. STAGGER REVEAL FOR GRID CHILDREN ────────────────── */
(function initStagger() {
  const grids = document.querySelectorAll(
    '.skills-layout, .projects-grid, .ach-grid, .cert-list, .blog-list'
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      Array.from(e.target.children).forEach((child, i) => {
        child.style.opacity    = '0';
        child.style.transform  = 'translateY(20px)';
        child.style.transition = `opacity .5s ease ${i * 80}ms, transform .5s ease ${i * 80}ms`;
        requestAnimationFrame(() => {
          child.style.opacity   = '1';
          child.style.transform = 'translateY(0)';
        });
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  grids.forEach(g => io.observe(g));
})();