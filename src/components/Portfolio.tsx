'use client';

import React from 'react';
import { css } from '@/lib/css';
import {
  PROJECTS, LEFT_PROJECTS, RIGHT_PROJECTS, STATUS, statusKeyOf, mediaGrad,
  SECTION_LIST, BLOCK_HEADING, EXPERIENCE, TOOLS, STATUS_PHRASES, BIO_CORNERS,
  type ProjectId, type ProjectBlocks,
} from '@/lib/projects';
import UwPipelineDiagram from '@/components/UwPipelineDiagram';

// design constants (formerly tweakable design-tool props)
const GRAPH_HOLD = 1.0;       // screens the finished graph "holds" before cards arrive
const STATUS_SECS = 5;        // seconds between rotating status phrases
const BIO_FADE_MS = 190;      // per-character fade duration
const NODE_HIGHLIGHT = '#790000';

type Screen = 'home' | 'detail' | 'about';

interface State {
  screen: Screen;
  active: ProjectId;
  section: keyof ProjectBlocks;
  engaged: ProjectId | null;
}

interface GNode { nx: number; ny: number; z: number; col: string; ci: number; r: number; hub: boolean; }
type GEdge = [number, number];
interface Graph { nodes: GNode[]; edges: GEdge[]; rank: number[]; projOf: (string | null)[]; counts: Record<string, number>; }

interface BioChar { ch: string; style: string; rv: string; }
interface BioWord { chars: BioChar[]; sep: string; }
interface BioBlock { pos: string; words: BioWord[]; }

export default class Portfolio extends React.Component<Record<string, never>, State> {
  state: State = { screen: 'home', active: 'uw', section: 'overview', engaged: null };

  // ---- element refs ----
  stageEl: HTMLElement | null = null;
  graphWrapEl: HTMLElement | null = null;
  heroEl: HTMLElement | null = null;
  annoEl: HTMLElement | null = null;
  leftColEl: HTMLElement | null = null;
  rightColEl: HTMLElement | null = null;
  headerEl: HTMLElement | null = null;
  bioWrapEl: HTMLElement | null = null;
  cursorEl: HTMLElement | null = null;
  cursorPillEl: HTMLElement | null = null;
  cursorDotEl: HTMLElement | null = null;
  cursorLabelEl: HTMLElement | null = null;
  statusEl: HTMLElement | null = null;
  chronoEl: HTMLElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  // ---- animation state ----
  graph: Graph | null = null;
  engaged: ProjectId | null = null;
  engageT = 0;
  engageTarget = 0;
  _reveal = 0.12;
  _bioReveal = 0;
  _graphFade = 1;
  _p = 0;
  _w = 0;
  _h = 0;
  _raf = 0;
  _engRaf = 0;
  _gfRaf = 0;
  _bioT: ReturnType<typeof setTimeout> | null = null;
  _io: IntersectionObserver | null = null;
  _statusTimer: ReturnType<typeof setInterval> | null = null;
  _statusSpans: HTMLSpanElement[] = [];
  _statusBag: number[] | null = null;
  _statusI = 0;
  _pillActive = false;

  bioBlocks: BioBlock[] = this.buildBio();

  // ---------- seeded rng ----------
  rng(seed: number) {
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  hexA(hex: string, a: number) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; }

  buildGraph() {
    if (this.graph) return;
    const rnd = this.rng(7);
    const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    const clusters = [
      { cx: 0.30, cy: 0.42, n: 135, col: '#790000' },
      { cx: 0.45, cy: 0.30, n: 70, col: '#9E2A2F' },
      { cx: 0.61, cy: 0.39, n: 155, col: '#1B3A57' },
      { cx: 0.71, cy: 0.62, n: 125, col: '#34567F' },
      { cx: 0.42, cy: 0.63, n: 55, col: '#8A5A1A' },
    ];
    const nodes: GNode[] = [];
    clusters.forEach((cl, ci) => { const sp = 0.085 + rnd() * 0.04; for (let i = 0; i < cl.n; i++) { const nx = cl.cx + gauss() * sp; const ny = cl.cy + gauss() * sp; const z = rnd(); const hub = i < 3; nodes.push({ nx, ny, z, col: cl.col, ci, r: hub ? (6 + rnd() * 4) : (1.5 + z * 3), hub }); } });
    const edges: GEdge[] = [];
    for (let i = 0; i < nodes.length; i++) { const a = nodes[i]; const best: [number, number][] = []; for (let j = 0; j < nodes.length; j++) { if (i === j) continue; const b = nodes[j]; best.push([(a.nx - b.nx) ** 2 + (a.ny - b.ny) ** 2, j]); } best.sort((p, q) => p[0] - q[0]); const k = a.hub ? 5 : 1 + Math.floor(rnd() * 2); let add = 0; for (let m = 0; m < best.length && add < k; m++) { const j = best[m][1]; if (nodes[j].ci === a.ci || rnd() < 0.1) { edges.push([i, j]); add++; } } }
    const order = nodes.map((_, i) => i); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1));[order[i], order[j]] = [order[j], order[i]]; }
    const rank = new Array<number>(nodes.length); order.forEach((idx, r) => rank[idx] = r);
    const centers: Record<string, [number, number]> = { jpl: [0.68, 0.40], msft: [0.42, 0.30], glml: [0.27, 0.46], uw: [0.74, 0.62], toonsutra: [0.45, 0.65], bite: [0.58, 0.54], suits: [0.36, 0.56], lesports: [0.56, 0.30], cavr: [0.30, 0.36], athenaeum: [0.50, 0.46] };
    const projOf: (string | null)[] = new Array(nodes.length).fill(null); const counts: Record<string, number> = {};
    for (const pid of ['jpl', 'msft', 'glml', 'uw', 'toonsutra', 'bite', 'suits', 'lesports', 'cavr', 'athenaeum']) {
      const c = centers[pid]; const idxs = nodes.map((n, i) => [(n.nx - c[0]) ** 2 + (n.ny - c[1]) ** 2, i] as [number, number]).filter(e => projOf[e[1]] === null).sort((a, b) => a[0] - b[0]); const take = pid === 'athenaeum' ? 44 : 30; let got = 0; for (let m = 0; m < idxs.length && got < take; m++) { projOf[idxs[m][1]] = pid; got++; } counts[pid] = got;
    }
    this.graph = { nodes, edges, rank, projOf, counts };
  }

  // ---------- refs ----------
  setStage = (el: HTMLElement | null) => { this.stageEl = el; if (el) requestAnimationFrame(() => this.tick()); };
  setGraphWrap = (el: HTMLElement | null) => { this.graphWrapEl = el; };
  setHero = (el: HTMLElement | null) => { this.heroEl = el; };
  setAnno = (el: HTMLElement | null) => { this.annoEl = el; if (el) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; } };
  setLeftCol = (el: HTMLElement | null) => { this.leftColEl = el; if (el) el.style.opacity = '0'; };
  setRightCol = (el: HTMLElement | null) => { this.rightColEl = el; if (el) el.style.opacity = '0'; };
  setHeader = (el: HTMLElement | null) => { this.headerEl = el; if (el) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; } };
  setBioWrap = (el: HTMLElement | null) => { this.bioWrapEl = el; };
  setCursor = (el: HTMLElement | null) => { this.cursorEl = el; };
  setCursorPill = (el: HTMLElement | null) => { this.cursorPillEl = el; };
  setCursorDot = (el: HTMLElement | null) => { this.cursorDotEl = el; };
  setCursorLabel = (el: HTMLElement | null) => { this.cursorLabelEl = el; };

  // rotating "is currently …" status with per-character scatter reveal
  nextStatusIdx() { let bag = this._statusBag; if (!bag || !bag.length) { bag = this.shuffleIdx(STATUS_PHRASES.length); if (bag[0] === this._statusI && bag.length > 1) bag.push(bag.shift() as number); } const v = bag.shift() as number; this._statusBag = bag; return v; }
  setStatus = (el: HTMLElement | null) => { this.statusEl = el; if (el) { this._statusBag = null; this._statusI = this.nextStatusIdx(); this.renderStatus(); this.startStatusCycle(); } };
  shuffleIdx(n: number) { const o = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[o[i], o[j]] = [o[j], o[i]]; } return o; }
  renderStatus() { const el = this.statusEl; if (!el) return; const txt = STATUS_PHRASES[this._statusI % STATUS_PHRASES.length]; el.innerHTML = ''; const spans: HTMLSpanElement[] = []; for (const ch of txt) { const s = document.createElement('span'); s.textContent = (ch === ' ') ? ' ' : ch; s.style.cssText = 'display:inline-block; white-space:pre; opacity:0; transition:opacity 220ms ease;'; el.appendChild(s); spans.push(s); } this._statusSpans = spans; this.shuffleIdx(spans.length).forEach((idx, k) => { setTimeout(() => { if (this._statusSpans === spans && spans[idx]) spans[idx].style.opacity = '1'; }, 40 + k * 22); }); }
  hideStatus(cb: () => void) { const spans = this._statusSpans || []; if (!spans.length) { cb && cb(); return; } let last = 0; this.shuffleIdx(spans.length).forEach((idx, k) => { last = k * 18; setTimeout(() => { if (spans[idx]) spans[idx].style.opacity = '0'; }, k * 18); }); setTimeout(() => cb && cb(), last + 260); }
  startStatusCycle() { if (this._statusTimer) clearInterval(this._statusTimer); this._statusTimer = setInterval(() => { this.hideStatus(() => { this._statusI = this.nextStatusIdx(); this.renderStatus(); }); }, STATUS_SECS * 1000); }

  // ---------- cursor ----------
  onMouseMove = (e: MouseEvent) => { if (this.cursorEl) { this.cursorEl.style.left = e.clientX + 'px'; this.cursorEl.style.top = e.clientY + 'px'; } };
  onMouseOver = (e: MouseEvent) => { const t = e.target as HTMLElement | null; if (this._pillActive) { if (t && t.closest && t.closest('.rl-card')) return; } const clickable = t && t.closest && t.closest('a,button,[role="button"],.rl-link'); this.setDotMode(clickable ? 'light' : 'navy'); };
  setDotMode(kind: 'light' | 'navy') { this._pillActive = false; if (!this.cursorDotEl) return; if (this.cursorPillEl) this.cursorPillEl.style.display = 'none'; this.cursorDotEl.style.display = 'block'; if (kind === 'light') { this.cursorDotEl.style.background = '#6E97C4'; this.cursorDotEl.style.transform = 'scale(1.45)'; } else { this.cursorDotEl.style.background = '#1B3A57'; this.cursorDotEl.style.transform = 'scale(1)'; } }
  showCursor(label: string, color: string) { if (!this.cursorEl) return; this._pillActive = true; if (this.cursorDotEl) this.cursorDotEl.style.display = 'none'; if (this.cursorLabelEl) this.cursorLabelEl.textContent = label; if (this.cursorPillEl) { this.cursorPillEl.style.background = color; this.cursorPillEl.style.display = 'flex'; } }
  hideCursor() { this._pillActive = false; if (this.cursorPillEl) this.cursorPillEl.style.display = 'none'; if (this.cursorDotEl) this.cursorDotEl.style.display = 'block'; }

  // ---------- canvas ----------
  setCanvas = (el: HTMLCanvasElement | null) => { this.canvas = el; if (el) { this.resize(); this.draw(); } };
  setChrono = (el: HTMLElement | null) => { this.chronoEl = el; if (el) { if (this._io) this._io.disconnect(); this._io = new IntersectionObserver((ents) => { ents.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('rl-in'); }); }, { threshold: 0.15 }); this._io.observe(el); } };

  resize() { if (!this.canvas) return; const dpr = Math.min(window.devicePixelRatio || 1, 2); const w = this.canvas.clientWidth || window.innerWidth; const h = this.canvas.clientHeight || window.innerHeight; this.canvas.width = Math.round(w * dpr); this.canvas.height = Math.round(h * dpr); this.ctx = this.canvas.getContext('2d'); if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); this._w = w; this._h = h; }

  draw() {
    const g = this.graph; if (!g || !this.ctx) return; const { nodes, edges, rank, projOf } = g; const W = this._w, H = this._h, ctx = this.ctx; ctx.clearRect(0, 0, W, H);
    const reveal = this._reveal != null ? this._reveal : 0.12; const N = nodes.length; const shown = Math.floor(reveal * N);
    const sc = Math.max(1, Math.min(W, H) / 820);
    const mx = (nx: number) => (0.04 + nx * 0.92) * W, my = (ny: number) => (0.02 + ny * 0.95) * H;
    const eng = this.engaged; const et = eng ? (this.engageT || 0) : 0; const gf = this._graphFade != null ? this._graphFade : 1; const hl = NODE_HIGHLIGHT;
    ctx.lineWidth = 1.1;
    for (const [i, j] of edges) { if (rank[i] < shown && rank[j] < shown) { const a = nodes[i], b = nodes[j]; const tg = !!eng && projOf[i] === eng && projOf[j] === eng; let ea = 0.12 * (0.4 + a.z * 0.6); if (eng) { ea = tg ? 0.5 * (0.5 + a.z * 0.5) : ea * (1 - 0.9 * et); } ctx.strokeStyle = this.hexA(tg ? hl : a.col, ea * gf); ctx.beginPath(); ctx.moveTo(mx(a.nx), my(a.ny)); ctx.lineTo(mx(b.nx), my(b.ny)); ctx.stroke(); } }
    for (let idx = 0; idx < N; idx++) {
      if (rank[idx] >= shown) continue; const nd = nodes[idx]; const tagged = !!eng && projOf[idx] === eng; let a = 0.5 + nd.z * 0.5; const t = shown - rank[idx]; if (t < 10) a *= t / 10; a = Math.max(0, a); if (eng && !tagged) a *= (1 - 0.82 * et); a *= gf; const x = mx(nd.nx), y = my(nd.ny); let r = nd.r * 1.6 * sc; if (tagged) r *= 1 + 0.45 * et;
      if (nd.hub || tagged) { ctx.globalAlpha = a * (tagged ? 0.22 : 0.15); ctx.fillStyle = nd.col; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, 6.2832); ctx.fill(); }
      ctx.globalAlpha = a; ctx.fillStyle = nd.col; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      if (tagged) { ctx.globalAlpha = Math.min(1, a + 0.3); ctx.lineWidth = 1.8; ctx.strokeStyle = this.hexA(hl, 0.7 * et); ctx.beginPath(); ctx.arc(x, y, r + 5, 0, 6.2832); ctx.stroke(); }
      else if (nd.hub) { ctx.globalAlpha = a * 0.5; ctx.lineWidth = 1.4; ctx.strokeStyle = nd.col; ctx.beginPath(); ctx.arc(x, y, r + 5, 0, 6.2832); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
  }

  engage(id: ProjectId) { this.engaged = id; this.engageTarget = 1; this.setState({ engaged: id }); this.startEngageAnim(); }
  reset() { this.engageTarget = 0; this.setState({ engaged: null }); this.startEngageAnim(); }
  openProject(id: ProjectId) { this.engaged = null; this.engageTarget = 0; if (this._engRaf) { cancelAnimationFrame(this._engRaf); this._engRaf = 0; } this.setState({ screen: 'detail', active: id, section: 'overview' }, () => { window.scrollTo(0, 0); requestAnimationFrame(() => window.scrollTo(0, 0)); }); }
  startEngageAnim() { if (this._engRaf) return; const step = () => { this._engRaf = 0; const tgt = this.engageTarget || 0; const d = tgt - (this.engageT || 0); this.engageT = (this.engageT || 0) + d * 0.2; if (Math.abs(d) < 0.012) { this.engageT = tgt; if (tgt === 0) this.engaged = null; this.draw(); return; } this.draw(); this._engRaf = requestAnimationFrame(step); }; this._engRaf = requestAnimationFrame(step); }
  playBio() { this._graphFade = 0; this.animGraphFade(); if (this._bioT) clearTimeout(this._bioT); this._bioT = setTimeout(() => { /* bio settle (visual no-op; reveal is scroll-driven) */ }, 160); }
  animGraphFade() { if (this._gfRaf) return; const step = () => { this._gfRaf = 0; this._graphFade = Math.min(1, (this._graphFade || 0) + 0.04); this.draw(); if (this._graphFade < 1) this._gfRaf = requestAnimationFrame(step); }; this._gfRaf = requestAnimationFrame(step); }

  clamp(v: number, a: number, b: number) { return Math.min(Math.max(v, a), b); }

  tick = () => {
    this._raf = 0;
    if (this.state.screen === 'home') {
      const st = this.stageEl; if (st) {
        const vh = window.innerHeight; const total = st.offsetHeight - vh; const scrolled = this.clamp(-st.getBoundingClientRect().top, 0, total); const p = total > 0 ? scrolled / total : 0; this._p = p;
        const target = this.clamp(0.12 + scrolled / (vh * 0.85), 0, 1);
        this._reveal = Math.max(this._reveal || 0.12, target);
        this.draw();
        const hero = this.heroEl; if (hero) hero.style.opacity = String(1 - this.clamp(scrolled / (vh * 0.45), 0, 1));
        const gw = this.graphWrapEl; if (gw) gw.style.opacity = String(1 - this.clamp((p - 0.84) / 0.16, 0, 1));
        const co = this.clamp((scrolled - vh * GRAPH_HOLD) / (vh * 0.45), 0, 1);
        const lc = this.leftColEl; if (lc) lc.style.opacity = String(co);
        const rc = this.rightColEl; if (rc) rc.style.opacity = String(co);
        const bioP = this.clamp(scrolled / (vh * 0.8), 0, 1); this._bioReveal = Math.max(this._bioReveal || 0, bioP);
        const bw = this.bioWrapEl; if (bw) { bw.style.opacity = String(1 - co); const br = this._bioReveal; bw.querySelectorAll<HTMLElement>('[data-rv]').forEach(s => { s.style.opacity = br >= parseFloat(s.getAttribute('data-rv') || '1') ? '1' : '0'; }); }
        const anno = this.annoEl; if (anno) { const appear = this.clamp((this._bioReveal - 0.55) / 0.25, 0, 1); const fade = 1 - this.clamp((co - 0.45) / 0.45, 0, 1); const vis = appear * fade; anno.style.opacity = String(vis); anno.style.pointerEvents = vis > 0.5 ? 'auto' : 'none'; }
      }
    } else if (this.state.screen === 'detail') {
      const secs = document.querySelectorAll<HTMLElement>('[data-sec]'); let cur = this.state.section;
      secs.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= 140) cur = (s.getAttribute('data-sec') || cur) as keyof ProjectBlocks; });
      if (cur !== this.state.section) this.setState({ section: cur });
    }
    const hdr = this.headerEl; if (hdr) { const show = (this._reveal >= 0.99) || this.state.screen !== 'home'; hdr.style.opacity = show ? '1' : '0'; hdr.style.pointerEvents = show ? 'auto' : 'none'; }
  };
  onScrollEvt = () => { if (!this._raf) this._raf = requestAnimationFrame(this.tick); };
  onResize = () => { this.resize(); this.draw(); };

  componentDidMount() {
    this.buildGraph(); this.engaged = null; this.engageT = 0; this.engageTarget = 0;
    window.addEventListener('scroll', this.onScrollEvt, { passive: true });
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mouseover', this.onMouseOver, { passive: true });
    // deep-link: ?p=<projectId> opens a detail page, ?about opens the about screen
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    if (p && Object.prototype.hasOwnProperty.call(PROJECTS, p)) this.setState({ screen: 'detail', active: p as ProjectId, section: 'overview' });
    else if (params.has('about')) this.setState({ screen: 'about' });
    requestAnimationFrame(() => this.tick());
    this.playBio();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollEvt);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseover', this.onMouseOver);
    if (this._io) this._io.disconnect();
    if (this._statusTimer) clearInterval(this._statusTimer);
    if (this._bioT) clearTimeout(this._bioT);
  }
  componentDidUpdate(_prev: Record<string, never>, prev: State) {
    if (prev.screen !== this.state.screen || prev.active !== this.state.active) {
      let url = '/';
      if (this.state.screen === 'detail') url = '?p=' + this.state.active;
      else if (this.state.screen === 'about') url = '?about';
      window.history.replaceState(null, '', url);
    }
    if (prev.screen !== this.state.screen) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => { this.resize(); this.draw(); this.tick(); if (this.state.screen === 'home') this.playBio(); });
    }
  }

  scrollToSec(id: keyof ProjectBlocks) { const el = document.querySelector('[data-sec="' + id + '"]'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: y, behavior: 'smooth' }); } this.setState({ section: id }); }

  // navigation
  goHome = () => this.setState({ screen: 'home' });
  goWork = () => { if (this.state.screen !== 'home') this.setState({ screen: 'home' }); setTimeout(() => window.scrollTo({ top: Math.round(window.innerHeight * 0.95), behavior: 'smooth' }), 40); };
  goAbout = () => this.setState({ screen: 'about' });
  resetEngage = () => { if (this.state.engaged) this.reset(); };

  // ---------- bio scatter data ----------
  buildBio(): BioBlock[] {
    const corners = BIO_CORNERS;
    const flat: string[] = [];
    corners.forEach((cn, bi) => { [...cn.t].forEach((_, ci) => flat.push(bi + '_' + ci)); });
    const sh = this.rng(99); for (let i = flat.length - 1; i > 0; i--) { const j = Math.floor(sh() * (i + 1));[flat[i], flat[j]] = [flat[j], flat[i]]; }
    const rvOf: Record<string, number> = {}; flat.forEach((key, k) => { rvOf[key] = (k + 1) / flat.length; });
    return corners.map((cn, bi) => {
      const words: BioWord[] = []; let cur: BioWord | null = null;
      [...cn.t].forEach((ch, ci) => { if (ch === ' ') { if (cur) { words.push(cur); cur = null; } return; } if (!cur) cur = { chars: [], sep: ' ' }; cur.chars.push({ ch, style: `display:inline-block; color:${cn.color}; opacity:0; transition:opacity ${BIO_FADE_MS}ms ease;`, rv: (rvOf[bi + '_' + ci] || 1).toFixed(3) }); });
      if (cur) words.push(cur);
      return { pos: `position:absolute; ${cn.pos} max-width:${cn.w}; font-family:var(--fm); font-size:19px; line-height:1.5; letter-spacing:0.02em; pointer-events:none;`, words };
    });
  }

  // ---------- render: project card ----------
  renderCard(id: ProjectId) {
    const p = PROJECTS[id];
    const eng = this.state.engaged;
    const isEngaged = eng === id;
    const dim = !!eng && !isEngaged;
    const sk = statusKeyOf(id); const st = STATUS[sk]; const clickable = st.clickable;
    const redLine = p.position ? `${p.position} · ${p.date}` : p.date;
    const displayTitle = p.company || p.title;
    const subtitle = p.team || '';
    const media = mediaGrad(p.media);
    const mediaAspect = p.mediaAspect || (p.composite ? '1 / 1' : (p.logo ? '5 / 3' : (p.photo ? '1 / 1' : '4 / 5')));
    const tagCount = (this.graph && this.graph.counts[id]) || 0;
    const logoMaxW = p.logoMaxW || '82%'; const logoMaxH = p.logoMaxH || '76%';
    const cardStyle = `display:block; width:100%; max-width:430px; text-align:left; background:color-mix(in srgb, var(--paper) 90%, transparent); backdrop-filter:blur(3px); border:1px solid ${isEngaged ? 'var(--accent)' : 'var(--line)'}; padding:0; cursor:none; color:var(--ink); font-family:var(--fd); position:relative; opacity:${dim ? 0.3 : 1}; filter:${dim ? 'grayscale(0.4)' : 'none'}; box-shadow:${isEngaged ? '0 18px 44px rgba(121,0,0,0.18)' : 'none'}; transition:opacity .4s ease, filter .4s ease, border-color .3s ease, box-shadow .3s ease, transform .3s cubic-bezier(.2,.7,.2,1);`;
    const onCard = (e: React.MouseEvent) => { e.stopPropagation(); if (this.state.engaged === id) { if (clickable) this.openProject(id); } else this.engage(id); };
    return (
      <button key={id} className="rl-card" onClick={onCard} onMouseEnter={() => this.showCursor(st.label, st.color)} onMouseLeave={() => this.hideCursor()} style={css(cardStyle)}>
        <div className="rl-media" style={css(`aspect-ratio:${mediaAspect}; overflow:hidden; position:relative;`)}>
          <div className="rl-media-img" style={css(`position:absolute; inset:0; background:${media};`)} />
          {p.composite && (<>
            <div className="rl-media-img" style={css(`position:absolute; inset:0; background:radial-gradient(120% 90% at 50% 38%, #f6f8fc 0%, #e4eaf3 55%, #d2dbe9 100%);`)} />
            <img src="/assets/nasa-logo.gif" alt="" style={css(`position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:78%; height:auto; mix-blend-mode:multiply; opacity:0.92;`)} />
            <img src="/assets/magicleap-headset-crop.png" alt="NASA SUITS" style={css(`position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:90%; height:auto; opacity:0.82; filter:drop-shadow(0 16px 26px rgba(20,34,55,0.3));`)} />
          </>)}
          {p.photo && (<img src={p.photo} loading="lazy" alt={displayTitle} className="rl-media-img" style={css(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;`)} />)}
          {p.logo && (
            <div className="rl-media-img" style={css(`position:absolute; inset:0; background:#ffffff; display:flex; align-items:center; justify-content:center; overflow:hidden;`)}>
              {p.bgLogo && (<img src={p.bgLogo} loading="lazy" alt="" style={css(`position:absolute; height:74%; width:auto; left:50%; top:50%; transform:translate(-50%,-50%); opacity:0.15;`)} />)}
              <img src={p.logo} loading="lazy" alt={displayTitle} style={css(`position:relative; max-width:${logoMaxW}; max-height:${logoMaxH}; width:auto; height:auto; object-fit:contain; display:block;`)} />
            </div>
          )}
          {isEngaged && (<div style={css(`position:absolute; right:12px; top:12px; font-family:var(--fm); font-size:9px; letter-spacing:0.1em; color:var(--cream); background:var(--accent); padding:3px 8px;`)}>◖ {tagCount} SOURCES</div>)}
        </div>
        <div style={css(`padding:14px 17px 15px; border-top:1px solid var(--line);`)}>
          <div style={css(`margin-bottom:6px;`)}>
            <div style={css(`font-family:var(--fm); font-size:9.5px; letter-spacing:0.14em; text-transform:uppercase; color:var(--accent); margin-bottom:4px;`)}>{redLine}</div>
            <h3 style={css(`font-family:var(--fd); font-weight:600; font-size:21px; line-height:1.05; margin:0;`)}>{displayTitle}</h3>
            {subtitle && (<div style={css(`font-family:var(--fd); font-style:italic; font-size:14.5px; line-height:1.3; color:var(--soft); margin-top:3px;`)}>{subtitle}</div>)}
          </div>
          <p style={css(`font-size:13px; line-height:1.5; color:var(--soft); margin:0;`)}>{p.desc}</p>
        </div>
      </button>
    );
  }

  // ---------- render: home ----------
  renderHome() {
    const annoEngaged = this.state.engaged === 'athenaeum';
    const annoBtnStyle = `position:absolute; inset:0; border-radius:50%; border:1px solid ${annoEngaged ? 'var(--accent)' : 'var(--line)'}; background:${annoEngaged ? 'color-mix(in srgb, var(--accent) 10%, var(--paper))' : 'color-mix(in srgb, var(--paper) 92%, transparent)'}; box-shadow:${annoEngaged ? '0 0 0 7px color-mix(in srgb, var(--accent) 13%, transparent)' : 'none'}; backdrop-filter:blur(3px); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:36px; gap:9px; transition:border-color .25s ease, background .25s ease, box-shadow .25s ease;`;
    const annoOnClick = (e: React.MouseEvent) => { e.stopPropagation(); if (this.state.engaged === 'athenaeum') this.reset(); else this.engage('athenaeum'); };
    const holdHeight = `${Math.round(GRAPH_HOLD * 100)}vh`;
    const frames = Array.from({ length: 15 }).map((_, i) => ({ n: String(i + 1).padStart(2, '0'), flip: (i % 2 ? -1 : 1), h: (56 + Math.round(30 * Math.abs(Math.sin(i * 0.62)))) + '%' }));
    const renderStrip = (ariaHidden: boolean) => frames.map((fr, i) => (
      <div key={(ariaHidden ? 'b' : 'a') + i} aria-hidden={ariaHidden || undefined} style={css(`width:140px; flex:none; border-right:1px solid rgba(255,255,255,0.1);`)}>
        <div style={css(`height:13px; background-image:repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 6px, transparent 6px 20px); opacity:0.45;`)} />
        <div style={css(`aspect-ratio:3/4; position:relative; overflow:hidden; background:#201d24;`)}>
          <div style={css(`position:absolute; left:50%; bottom:0; transform:translateX(-50%) scaleX(${fr.flip}); width:62%; height:${fr.h}; background:linear-gradient(180deg, color-mix(in srgb, var(--accent) 66%, #000), #0c0b0e); clip-path:polygon(38% 0,62% 0,70% 22%,58% 40%,72% 64%,64% 100%,36% 100%,30% 66%,44% 40%,30% 22%); opacity:0.92;`)} />
          <div style={css(`position:absolute; left:10px; top:8px; font-family:var(--fm); font-size:9px; color:rgba(255,255,255,0.5);`)}>{fr.n}</div>
        </div>
        <div style={css(`height:13px; background-image:repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 6px, transparent 6px 20px); opacity:0.45;`)} />
      </div>
    ));
    return (
      <main data-screen-label="Landing Page">
        <section data-screen-label="Showcase" ref={this.setStage} style={css(`position:relative;`)}>
          {/* PINNED GRAPH */}
          <div ref={this.setGraphWrap} style={css(`position:sticky; top:0; height:100vh; z-index:0; margin-bottom:-100vh; pointer-events:none; overflow:hidden;`)}>
            <canvas ref={this.setCanvas} style={css(`position:absolute; inset:0; width:100%; height:100%; display:block;`)} />
            <div style={css(`position:absolute; inset:0; background:radial-gradient(ellipse 60% 55% at 50% 46%, transparent 40%, color-mix(in srgb, var(--paper) 55%, transparent) 100%);`)} />
            <div ref={this.setBioWrap} style={css(`position:absolute; inset:0; pointer-events:none;`)}>
              {this.bioBlocks.map((bl, bi) => (
                <div key={bi} style={css(bl.pos)}>
                  {bl.words.map((w, wi) => (
                    <React.Fragment key={wi}>
                      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {w.chars.map((c, ci) => (<span key={ci} style={css(c.style)} data-rv={c.rv}>{c.ch}</span>))}
                      </span>
                      <span style={{ display: 'inline', whiteSpace: 'normal' }}>{w.sep}</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
            {/* GRAPH ANNOTATION */}
            <div ref={this.setAnno} style={css(`position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .5s ease;`)}>
              <div style={css(`position:absolute; left:6vw; bottom:9vh; width:222px; height:222px;`)}>
                <div style={css(`position:absolute; left:186px; top:34px; width:200px; height:1px; background:var(--navy); opacity:0.42; transform:rotate(-27deg); transform-origin:left center; pointer-events:none;`)} />
                <span style={css(`position:absolute; left:364px; top:-58px; width:8px; height:8px; border-radius:50%; background:var(--accent); transform:translate(-4px,-4px); pointer-events:none;`)} />
                <button onClick={annoOnClick} style={css(annoBtnStyle)}>
                  <div style={css(`font-family:var(--fm); font-size:8.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy);`)}>What am I looking at?</div>
                  <div style={css(`font-family:var(--fd); font-size:12px; line-height:1.34; color:var(--ink);`)}>Each dot is a paper, note, or idea I’ve read — placed by similarity, so related thinking clusters together.</div>
                  <div style={css(`font-family:var(--fm); font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:6px;`)}><span style={css(`width:6px; height:6px; border-radius:50%; background:var(--accent);`)} />Currently building</div>
                </button>
              </div>
            </div>
          </div>

          {/* OVERLAY CONTENT */}
          <div style={css(`position:relative; z-index:2; pointer-events:none;`)}>
            <div style={css(`height:100vh; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:30px; pointer-events:none;`)}>
              <div ref={this.setHero} style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--soft); display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;`)}>
                <span style={css(`color:var(--navy);`)}>Athenæum — a live knowledge graph</span>
                <span>Scroll ↓</span>
                <span style={css(`display:block; width:1px; height:30px; background:linear-gradient(var(--soft), transparent);`)} />
              </div>
            </div>
            <div style={css(`height:${holdHeight}; pointer-events:none;`)} />
            {/* CARDS GRID */}
            <div onClick={this.resetEngage} style={css(`display:grid; grid-template-columns:minmax(0,1fr) clamp(300px,28vw,420px) minmax(0,1fr); align-items:start; pointer-events:auto;`)}>
              <div ref={this.setLeftCol} style={css(`display:flex; flex-direction:column; align-items:flex-start; gap:3.2vh; padding:5vh 28px 30vh;`)}>
                {LEFT_PROJECTS.map(id => this.renderCard(id))}
              </div>
              <div style={css(`pointer-events:none;`)} />
              <div ref={this.setRightCol} style={css(`display:flex; flex-direction:column; align-items:flex-end; gap:3.2vh; padding:12vh 28px 30vh;`)}>
                {RIGHT_PROJECTS.map(id => this.renderCard(id))}
              </div>
            </div>
          </div>
        </section>

        {/* CHRONOPHOTOGRAPHY */}
        <section ref={this.setChrono} className="rl-reveal" style={css(`position:relative; z-index:3; background:color-mix(in srgb, var(--navy) 7%, var(--paper)); border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:80px 0;`)}>
          <div style={css(`max-width:1320px; margin:0 auto 40px; padding:0 44px; display:flex; align-items:flex-end; justify-content:space-between; gap:30px; flex-wrap:wrap;`)}>
            <div>
              <div style={css(`font-family:var(--fm); font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--navy); margin-bottom:16px;`)}>On Movement</div>
              <h2 style={css(`font-family:var(--fd); font-weight:500; font-size:clamp(34px,4.4vw,60px); line-height:1.0; margin:0; letter-spacing:-0.01em;`)}>Time, stopped &amp; <span style={css(`font-style:italic;`)}>set in sequence.</span></h2>
            </div>
            <p style={css(`font-size:15px; line-height:1.62; color:var(--soft); max-width:26em; margin:0;`)}>Work in Progress! My summer 2026 personal endeavor, dedicated to leaving the desk and capturing bodily movement &amp; connection.</p>
          </div>
          <div style={css(`overflow:hidden; padding:6px 0 14px;`)}>
            <div className="rl-marquee-track" style={css(`display:flex; width:max-content; border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:#16141a;`)}>
              {renderStrip(false)}
              {renderStrip(true)}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={css(`position:relative; z-index:3; background:var(--paper); padding:64px 44px 54px;`)}>
          <div style={css(`max-width:1320px; margin:0 auto; display:grid; grid-template-columns:1.4fr 1fr; gap:40px; align-items:start;`)}>
            <div>
              <div style={css(`font-family:var(--fd); font-weight:500; font-style:italic; font-size:30px; line-height:1.15; max-width:14em;`)}>“Dare mighty things!”</div>
              <div style={css(`font-family:var(--fm); font-size:12px; line-height:1.6; color:var(--soft); margin-top:14px; max-width:22em; font-style:normal; letter-spacing:0.02em;`)}>— Richard, after eating the famous <a href="https://science.nasa.gov/missions/what-are-jpls-lucky-peanuts/" target="_blank" rel="noopener" style={css(`color:var(--accent); text-decoration:none; border-bottom:1px solid color-mix(in srgb, var(--accent) 45%, transparent);`)}>JPL peanuts</a> (he has a nut allergy)</div>
            </div>
            <div style={css(`text-align:right;`)}>
              <div style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy); margin-bottom:14px;`)}>Elsewhere</div>
              <div style={css(`display:flex; flex-direction:column; align-items:flex-end; gap:9px; font-family:var(--fm); font-size:13px;`)}>
                <a className="rl-link" href="mailto:rjl2194@columbia.edu" style={css(`color:var(--ink); text-decoration:none; width:max-content;`)}>Email ↗</a>
                <a className="rl-link" href="https://github.com/javaapplesauce" target="_blank" rel="noopener" style={css(`color:var(--ink); text-decoration:none; width:max-content;`)}>GitHub ↗</a>
                <a className="rl-link" href="https://drive.google.com/drive/folders/1TKmpgqYLrckh7Guk7XnNGLWEbMTF4v-G?usp=drive_link" target="_blank" rel="noopener" style={css(`color:var(--ink); text-decoration:none; width:max-content;`)}>Resume ↗</a>
              </div>
            </div>
          </div>
          <div style={css(`max-width:1320px; margin:36px auto 0; padding-top:20px; border-top:1px solid var(--line); display:flex; justify-content:center; font-family:var(--fm); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--soft);`)}><span>© 2026 Richard Li</span></div>
        </footer>
      </main>
    );
  }

  // ---------- render: detail ----------
  renderDetail() {
    const d = PROJECTS[this.state.active] || PROJECTS.athenaeum;
    const sections = SECTION_LIST.map(([id, label]) => ({
      id, label,
      style: `display:flex;align-items:center;text-align:left;background:${this.state.section === id ? 'color-mix(in srgb,#790000 8%,transparent)' : 'transparent'};border:none;border-left:2px solid ${this.state.section === id ? '#790000' : 'transparent'};cursor:pointer;font-family:var(--fd);font-size:15px;color:${this.state.section === id ? '#790000' : 'var(--ink)'};padding:8px 12px;transition:color .2s,background .2s;`,
    }));
    const blocks = SECTION_LIST.map(([id, label], i) => ({ id, num: String(i + 1).padStart(2, '0') + ' / ' + label, h: BLOCK_HEADING[id], body: d.blocks[id] }));
    const hasDiagram = this.state.active === 'uw';
    const meta = [
      { k: 'Timeline', v: d.timeline, kc: 'var(--navy)' },
      { k: 'Role', v: d.role, kc: 'var(--navy)' },
      { k: d.metaTeamLabel || 'Team', v: d.metaTeam || d.team || '—', kc: 'var(--navy)' },
      { k: 'Tools', v: d.metaTools || d.tools || '—', kc: 'var(--navy)' },
    ];
    return (
      <main data-screen-label="Project Detail" style={css(`max-width:1320px; margin:0 auto; padding:46px 44px 90px;`)}>
        <button onClick={this.goWork} className="rl-link" style={css(`background:none;border:none;cursor:pointer;font-family:var(--fm);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--soft);padding:0;margin-bottom:30px;`)}>← All work</button>
        <div style={css(`display:grid; grid-template-columns:230px 1fr; gap:56px; align-items:start;`)}>
          <aside style={css(`position:sticky; top:90px;`)}>
            <div style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy); margin-bottom:16px;`)}>Contents</div>
            <nav style={css(`display:flex; flex-direction:column; gap:2px; margin-bottom:34px;`)}>
              {sections.map(s => (<button key={s.id} onClick={() => this.scrollToSec(s.id)} className="rl-sub" style={css(s.style)}>{s.label}</button>))}
            </nav>
            <div style={css(`border-top:1px solid var(--line); padding-top:22px; display:flex; flex-direction:column; gap:17px;`)}>
              {meta.map((m, i) => (
                <div key={i}>
                  <div style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:${m.kc}; margin-bottom:6px;`)}>{m.k}</div>
                  <div style={css(`font-size:14px; line-height:1.42;`)}>{m.v}</div>
                </div>
              ))}
            </div>
          </aside>
          <article style={css(`min-width:0;`)}>
            {hasDiagram ? (
              <div style={css(`border:1px solid var(--line); background:#EFE7D3; overflow:hidden; margin-bottom:14px;`)}>
                <UwPipelineDiagram />
              </div>
            ) : (
              <div className="rl-media" style={css(`aspect-ratio:16/9; border:1px solid var(--line); overflow:hidden; background:#16141a; position:relative; margin-bottom:14px;`)}>
                <img src="/assets/graph_cream.png" alt="" style={css(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.92;`)} />
                <div style={css(`position:absolute; inset:0; background:rgba(18,16,16,0.28);`)} />
                <div style={css(`position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;`)}>
                  <div style={css(`width:64px; height:64px; border:1.5px solid var(--cream); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--cream);`)}><span style={css(`margin-left:4px; font-size:20px;`)}>▶</span></div>
                  <div style={css(`font-family:var(--fm); font-size:10.5px; letter-spacing:0.18em; text-transform:uppercase; color:var(--cream);`)}>Video demo — drop in</div>
                </div>
                <div style={css(`position:absolute; left:0; bottom:0; right:0; display:flex; justify-content:space-between; padding:10px 14px; font-family:var(--fm); font-size:10px; letter-spacing:0.13em; color:#FDF6D8; background:linear-gradient(transparent, rgba(15,13,13,0.6));`)}><span>DEMO</span><span>{d.demoNote}</span></div>
              </div>
            )}
            <p style={css(`font-family:var(--fm); font-size:11px; color:var(--soft); letter-spacing:0.06em; margin:0 0 30px;`)}>{d.caption}</p>
            <h1 style={css(`font-family:var(--fd); font-weight:500; font-size:clamp(40px,5vw,74px); line-height:0.98; letter-spacing:-0.01em; margin:0 0 22px;`)}>{d.title}</h1>
            <p style={css(`font-size:21px; line-height:1.55; color:var(--soft); max-width:32em; margin:0 0 12px;`)}>{d.lede}</p>
            {blocks.map(b => (
              <section key={b.id} data-sec={b.id} style={css(`padding:34px 0; border-top:1px solid var(--line); scroll-margin-top:90px;`)}>
                <div style={css(`display:grid; grid-template-columns:170px 1fr; gap:30px; align-items:start;`)}>
                  <div><h2 style={css(`font-family:var(--fd); font-weight:600; font-size:23px; margin:0; line-height:1.1;`)}>{b.h}</h2></div>
                  <div style={css(`font-size:17px; line-height:1.66; color:var(--ink);`)}>{b.body}</div>
                </div>
              </section>
            ))}
            {d.reflection && (
              <section style={css(`padding:34px 0 0; border-top:1px solid var(--line);`)}>
                <div style={css(`display:grid; grid-template-columns:170px 1fr; gap:30px; align-items:start;`)}>
                  <div><h2 style={css(`font-family:var(--fd); font-weight:600; font-size:23px; margin:0; line-height:1.1;`)}>What I took away</h2><div style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:var(--navy); margin-top:8px;`)}>Reflection</div></div>
                  <div style={css(`font-family:var(--fd); font-style:italic; font-size:20px; line-height:1.6; color:var(--soft);`)}>{d.reflection}</div>
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
    );
  }

  // ---------- render: about ----------
  renderAbout() {
    return (
      <main data-screen-label="About Page" style={css(`height:calc(100vh - 58px); min-height:640px; box-sizing:border-box; width:100%; padding:22px 28px;`)}>
        <div style={css(`display:grid; grid-template-columns:1.05fr 1.25fr 0.82fr; gap:26px; height:100%; align-items:stretch;`)}>
          {/* LEFT — TEXT */}
          <div style={css(`display:flex; flex-direction:column; min-height:0;`)}>
            <div style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--navy); margin-bottom:9px;`)}>About</div>
            <h1 style={css(`font-family:var(--fd); font-weight:500; font-size:clamp(15px,1.35vw,18px); line-height:1.2; letter-spacing:-0.01em; margin:0 0 8px;`)}>My name is <span style={css(`font-style:italic; color:var(--accent);`)}>Richard JD Li</span>, an undergraduate studying Computer Science and East Asian Studies at Columbia University. I’m passionate about building software and advancing AI-research!</h1>
            <p style={css(`font-size:11.5px; line-height:1.42; color:var(--soft); margin:0 0 11px;`)}>At any given moment, you’ll find me working on my projects, getting active in a sport/gym/nature, or you’ll find me mid-conversation with strangers/friends/family alike.</p>
            <div style={css(`font-family:var(--fm); font-size:9.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy); margin-bottom:5px; padding-bottom:5px; border-bottom:1px solid var(--line);`)}>Industry Experience</div>
            <div style={css(`display:flex; flex-direction:column; flex-shrink:0;`)}>
              {EXPERIENCE.map((e, i) => (
                <div key={i} onClick={e.pid ? () => this.openProject(e.pid as ProjectId) : undefined} className={e.pid ? 'rl-exp-link' : 'rl-exp-row'} style={css(`display:grid; grid-template-columns:74px 1fr; gap:12px; padding:2px 6px 2px 0; border-bottom:1px solid var(--line); transition:background .15s ease; cursor:${e.pid ? 'pointer' : 'default'};`)}>
                  <div style={css(`font-family:var(--fm); font-size:10px; color:var(--navy); padding-top:2px;`)}>{e.yr}</div>
                  <div>
                    <div style={css(`font-family:var(--fd); font-weight:600; font-size:13.5px; line-height:1.12; display:flex; align-items:center; gap:5px;`)}>{e.org}{e.pid && (<span style={css(`font-family:var(--fm); font-size:9px; color:var(--accent);`)}>↗</span>)}</div>
                    <div style={css(`font-size:10.5px; line-height:1.28; color:var(--soft);`)}>{e.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={css(`font-family:var(--fm); font-size:9.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy); margin:9px 0 5px; padding-bottom:5px; border-bottom:1px solid var(--line);`)}>Education</div>
            <div style={css(`display:grid; grid-template-columns:74px 1fr; gap:12px;`)}>
              <div style={css(`font-family:var(--fm); font-size:10px; color:var(--navy); padding-top:2px;`)}>’24 — Present</div>
              <div><div style={css(`font-family:var(--fd); font-weight:600; font-size:13.5px; line-height:1.12;`)}>Columbia University</div><div style={css(`font-size:10.5px; line-height:1.28; color:var(--soft);`)}>B.A. Computer Science &amp; East Asian Studies · GPA 3.65</div></div>
            </div>
          </div>
          {/* CENTER — PHOTO */}
          <figure style={css(`margin:0; position:relative; min-height:0; border:1px solid var(--line); overflow:hidden;`)}>
            <img src="/assets/photo-pizza.jpg" alt="Richard eating pizza in New York" style={css(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; display:block;`)} />
            <figcaption style={css(`position:absolute; left:0; right:0; bottom:0; padding:11px 13px; font-family:var(--fm); font-size:10.5px; letter-spacing:0.07em; color:var(--cream); background:linear-gradient(transparent, rgba(20,18,18,0.62));`)}>Richard Li — New York, 2025</figcaption>
          </figure>
          {/* RIGHT — SQUARES + TOOLKIT */}
          <div style={css(`display:flex; flex-direction:column; gap:12px; min-height:0;`)}>
            <div style={css(`flex:1; min-height:0; aspect-ratio:1; align-self:center; max-width:100%; border:1px solid var(--line); position:relative; overflow:hidden;`)}><img src="/assets/photo-cat.jpg" alt="Napping beside a cat in the sun" style={css(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:78% center; display:block;`)} /></div>
            <div style={css(`flex:1; min-height:0; aspect-ratio:1; align-self:center; max-width:100%; border:1px solid var(--line); position:relative; overflow:hidden;`)}><img src="/assets/photo-honeycomb.jpg" alt="Under a honeycomb sculpture" style={css(`position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; display:block;`)} /></div>
            <div style={css(`flex:none;`)}>
              <div style={css(`font-family:var(--fm); font-size:9.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--navy); margin-bottom:6px; padding-bottom:5px; border-bottom:1px solid var(--line);`)}>Toolkit</div>
              <div style={css(`display:flex; flex-wrap:wrap; gap:5px;`)}>
                {TOOLS.map((t, i) => (<span key={i} style={css(`font-family:var(--fm); font-size:10px; letter-spacing:0.04em; color:var(--ink); border:1px solid var(--line); padding:3px 7px;`)}>{t}</span>))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  render() {
    const { screen } = this.state;
    return (
      <div data-screen-label="Portfolio Root" style={css(`--paper:#EFE7D3;--panel:#E7DCC0;--ink:#241F1A;--soft:#5A5249;--line:rgba(42,37,32,0.22);--accent:#790000;--navy:#1B3A57;--navy2:#34567F;--cream:#FDF6D8;--fd:'Libre Caslon Text',Georgia,serif;--fm:'JetBrains Mono',monospace; min-height:100vh; background:var(--paper); color:var(--ink); font-family:var(--fd); position:relative; cursor:none;`)}>
        <div aria-hidden="true" style={css(`position:fixed; inset:0; z-index:60; pointer-events:none; background-image:url(/assets/grain.png); background-size:220px; mix-blend-mode:multiply; opacity:0.5;`)} />

        {/* CUSTOM CURSOR */}
        <div ref={this.setCursor} style={css(`position:fixed; left:-200px; top:0; z-index:80; pointer-events:none; transform:translate(-50%,-50%); transition:opacity .2s ease;`)}>
          <div ref={this.setCursorDot} style={css(`width:16px; height:16px; border-radius:50%; background:#1B3A57; box-shadow:0 2px 9px rgba(0,0,0,0.2); transition:background .2s ease, transform .2s cubic-bezier(.2,.8,.2,1);`)} />
          <div ref={this.setCursorPill} style={css(`display:none; align-items:center; gap:9px; padding:9px 17px; border-radius:999px; background:var(--accent); box-shadow:0 6px 18px rgba(0,0,0,0.28); transform:translate(-50%,-50%);`)}>
            <span style={css(`width:8px; height:8px; border-radius:50%; background:#FDF6D8;`)} />
            <span ref={this.setCursorLabel} style={css(`font-family:var(--fm); font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#FDF6D8; white-space:nowrap;`)}>Currently building</span>
          </div>
        </div>

        {/* HEADER */}
        <header ref={this.setHeader} style={css(`position:sticky; top:0; z-index:40; background:color-mix(in srgb, var(--paper) 86%, transparent); backdrop-filter:saturate(1.1) blur(3px); border-bottom:1px solid var(--line); transition:opacity .7s ease;`)}>
          <div style={css(`max-width:1320px; margin:0 auto; padding:16px 44px; display:flex; align-items:center; justify-content:space-between;`)}>
            <button onClick={this.goHome} style={css(`background:none;border:none;padding:0;cursor:pointer;display:flex;align-items:center;gap:11px;font-family:var(--fm);color:var(--ink);`)}>
              <span style={css(`font-size:13px;letter-spacing:0.22em;font-weight:600;`)}>RICHARD&nbsp;LI</span>
              <span style={css(`width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block;`)} />
              <span ref={this.setStatus} suppressHydrationWarning style={css(`font-size:10px;letter-spacing:0.15em;color:var(--navy);text-transform:uppercase;display:inline-flex;`)} />
            </button>
            <nav style={css(`display:flex; gap:32px; font-family:var(--fm); font-size:12px; letter-spacing:0.16em; text-transform:uppercase;`)}>
              <button className="rl-link" onClick={this.goWork} style={css(`background:none;border:none;cursor:pointer;color:var(--ink);font:inherit;letter-spacing:inherit;text-transform:inherit;padding:0;`)}>Work</button>
              <button className="rl-link" onClick={this.goAbout} style={css(`background:none;border:none;cursor:pointer;color:var(--ink);font:inherit;letter-spacing:inherit;text-transform:inherit;padding:0;`)}>About</button>
              <a className="rl-link" href="https://www.linkedin.com/in/richardjdli/" target="_blank" rel="noopener" style={css(`color:var(--accent);text-decoration:none;`)}>LinkedIn ↗</a>
            </nav>
          </div>
        </header>

        {screen === 'home' && this.renderHome()}
        {screen === 'detail' && this.renderDetail()}
        {screen === 'about' && this.renderAbout()}
      </div>
    );
  }
}
