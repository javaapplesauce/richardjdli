'use client';

import React from 'react';
import { css } from '@/lib/css';

// Fixed 1680x648 figure, scaled to fit its container, with a looping
// left-to-right "resolve" animation. Ported from the design's diagram export.

const LOOP_GAP_SECONDS = 2;

interface Resolve { sx: number; sy: number; ex: number; ey: number; col: string; }
interface FDot { ex: number; ey: number; col: string; }
interface Scatter { cx: number; cy: number; }
interface Scatter2 extends Scatter { op: number; }
interface Cluster { cx: number; cy: number; col: string; n: number; sp: number; code: string; }
interface Data { resolve: Resolve[]; fdots: FDot[]; scatter1: Scatter[]; scatter2: Scatter2[]; clusters: Cluster[]; }

export default class UwPipelineDiagram extends React.Component {
  wrap: HTMLElement | null = null;
  root: HTMLElement | null = null;
  _loop: ReturnType<typeof setInterval> | null = null;
  _io: IntersectionObserver | null = null;
  _ro: ResizeObserver | null = null;
  _onResize: (() => void) | null = null;
  data: Data = this.buildData();

  rng(seed: number) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  buildData(): Data {
    const rnd = this.rng(11);
    const g = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.28318 * v); };
    const R = (n: number) => Math.round(n * 10) / 10;
    const clusters: Cluster[] = [
      { cx: 50, cy: 30, col: '#1B3A57', n: 11, sp: 7, code: 'T' },
      { cx: 152, cy: 30, col: '#3F5E50', n: 10, sp: 7, code: 'NK' },
      { cx: 40, cy: 92, col: '#9C6A1E', n: 10, sp: 7, code: 'FB' },
      { cx: 158, cy: 92, col: '#5A4878', n: 11, sp: 7, code: 'EC' },
      { cx: 100, cy: 62, col: '#34567F', n: 9, sp: 6, code: 'HB' },
    ];
    const resolve: Resolve[] = [], fdots: FDot[] = [];
    clusters.forEach(cl => { for (let i = 0; i < cl.n; i++) { const ex = cl.cx + g() * cl.sp; const ey = cl.cy + g() * cl.sp * 0.85; const sx = 12 + rnd() * 176; const sy = 10 + rnd() * 100; resolve.push({ sx: R(sx), sy: R(sy), ex: R(ex), ey: R(ey), col: cl.col }); fdots.push({ ex: R(ex), ey: R(ey), col: cl.col }); } });
    const scatter1: Scatter[] = []; for (let i = 0; i < 48; i++) { scatter1.push({ cx: R(12 + rnd() * 176), cy: R(10 + rnd() * 100) }); }
    const scatter2: Scatter2[] = scatter1.map(d => ({ cx: d.cx, cy: d.cy, op: (rnd() < 0.32 ? 0.13 : 0.85) }));
    return { resolve, fdots, scatter1, scatter2, clusters };
  }

  setWrap = (el: HTMLElement | null) => { this.wrap = el; };
  setRoot = (el: HTMLElement | null) => { this.root = el; };

  applyScale = () => { if (!this.wrap || !this.root) return; const w = this.wrap.clientWidth || 1680; const s = Math.min(w / 1680, 1); this.root.style.transform = 'scale(' + s + ')'; };
  loopMs() { return 5600 + Math.max(0, LOOP_GAP_SECONDS) * 1000; }
  replay() { const r = this.root; if (!r) return; r.classList.remove('play'); void r.offsetWidth; r.classList.add('play'); }
  startLoop() { if (this._loop) return; this.replay(); this._loop = setInterval(() => this.replay(), this.loopMs()); }
  stopLoop() { if (this._loop) { clearInterval(this._loop); this._loop = null; } if (this.root) this.root.classList.remove('play'); }

  componentDidMount() {
    if (!this.root) return;
    this.applyScale();
    if (window.ResizeObserver) { this._ro = new ResizeObserver(() => this.applyScale()); if (this.wrap) this._ro.observe(this.wrap); }
    this._onResize = () => this.applyScale(); window.addEventListener('resize', this._onResize);
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.startLoop();
    if (window.IntersectionObserver) {
      const target = this.wrap || this.root;
      this._io = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) this.startLoop(); else this.stopLoop(); }); }, { threshold: 0 });
      this._io.observe(target);
    }
  }
  componentWillUnmount() { if (this._io) this._io.disconnect(); if (this._ro) this._ro.disconnect(); if (this._onResize) window.removeEventListener('resize', this._onResize); this.stopLoop(); }

  stageHeader(label: string, focal = false) {
    return (
      <div style={css(`display:flex; align-items:center; justify-content:space-between; height:16px; margin-bottom:8px;`)}>
        <span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.14em; color:${focal ? '#1a1a1a' : '#4A4234'};${focal ? 'font-weight:600;' : ''}`)}>{label}</span>
        <span style={css(`width:${focal ? 8 : 7}px; height:${focal ? 8 : 7}px; border-radius:50%; background:${focal ? '#790000' : 'rgba(26,26,26,0.34)'};`)} />
      </div>
    );
  }
  stageCaption(title: string, sub: string) {
    return (
      <div style={css(`margin-top:auto; padding-top:10px;`)}>
        <div style={css(`font-family:'Spectral',Georgia,serif; font-size:17px; font-weight:600; line-height:1.16; color:#1a1a1a;`)}>{title}</div>
        <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; line-height:1.35; color:#463F33; margin-top:6px;`)}>{sub}</div>
      </div>
    );
  }
  arrow(cls: string) {
    return (
      <div className={`arrow ${cls}`} style={css(`flex:0 0 44px; align-self:flex-start; margin-top:96px;`)}>
        <svg viewBox="0 0 44 12" width="44" height="12" style={{ display: 'block' }}>
          <line className="aline" x1="0" y1="6" x2="34" y2="6" stroke="rgba(26,26,26,0.5)" strokeWidth="1.8" />
          <polygon className="ahead" points="34,2 42,6 34,10" fill="rgba(26,26,26,0.62)" />
        </svg>
      </div>
    );
  }

  render() {
    const D = this.data;
    const dots3 = D.resolve.map(d => `--sx:${d.sx}px;--sy:${d.sy}px;--ex:${d.ex}px;--ey:${d.ey}px;--col:${d.col};`);
    const tags = D.clusters.map((c, i) => ({ code: c.code, col: c.col, left: (c.cx / 200 * 100).toFixed(2) + '%', top: (c.cy / 120 * 100).toFixed(2) + '%', delay: (3.7 + i * 0.1).toFixed(2) + 's' }));
    const stageBox = `position:relative; flex:0 0 236px; box-sizing:border-box; background:#F5EEDB; border:1px solid rgba(26,26,26,0.26); padding:14px 16px 14px; height:252px; display:flex; flex-direction:column;`;
    return (
      <div className="uwfig scalewrap" ref={this.setWrap} style={css(`position:relative; width:100%; max-width:1680px; margin:0 auto; aspect-ratio:1680 / 648; overflow:hidden;`)}>
        <div className="diagram" ref={this.setRoot} style={css(`position:absolute; left:0; top:0; transform-origin:top left; width:1680px; height:648px; box-sizing:border-box; background:#EFE7D3; color:#1a1a1a; padding:32px 40px 24px; display:flex; flex-direction:column; gap:16px; overflow:hidden; font-family:'Spectral',Georgia,serif;`)}>
          <div aria-hidden="true" style={css(`position:absolute; inset:0; z-index:5; pointer-events:none; background-image:url(/assets/grain.png); background-size:220px; mix-blend-mode:multiply; opacity:0.22;`)} />

          {/* HEADER */}
          <div style={css(`position:relative; z-index:8; display:flex; align-items:flex-end; justify-content:space-between; gap:24px; background:#EFE7D3; padding:2px 2px 8px;`)}>
            <div>
              <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.2em; color:#1B3A57; margin-bottom:10px;`)}>FIG. 01 — PIPELINE ARCHITECTURE</div>
              <h2 style={css(`font-family:'Spectral',Georgia,serif; font-weight:500; font-size:28px; line-height:1.04; letter-spacing:-0.01em; margin:0; color:#1a1a1a;`)}>Single-cell RNA-seq analysis <span style={css(`font-style:italic;`)}>pipeline</span></h2>
            </div>
            <div style={css(`text-align:right;`)}>
              <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.16em; color:#1B3A57; margin-bottom:6px;`)}>END TO END</div>
              <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:13px; letter-spacing:0.02em; color:#1a1a1a;`)}>FASTQ&nbsp;&nbsp;→&nbsp;&nbsp;annotated cell atlas</div>
            </div>
          </div>

          {/* PIPELINE ROW */}
          <div style={css(`position:relative; z-index:8; flex:1; min-height:368px; display:flex; align-items:flex-start; justify-content:flex-start; padding-top:74px;`)}>
            {/* INPUTS */}
            <div className="inp" style={css(`position:relative; flex:0 0 240px; height:252px;`)}>
              <div style={css(`position:absolute; left:0; top:0; display:inline-block; background:#EFE7D3; padding:1px 4px 1px 0; font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.14em; color:#4A4234;`)}>INPUTS · 10X</div>
              <svg viewBox="0 0 240 252" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                <path className="mline" d="M200,70 C224,70 214,122 234,122" fill="none" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5" />
                <path className="mline" d="M200,122 L234,122" fill="none" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5" />
                <path className="mline" d="M200,174 C224,174 214,122 234,122" fill="none" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5" />
                <g className="mhead">
                  <circle cx="234" cy="122" r="3" fill="#6E5F49" />
                  <polygon points="246,118 252,122 246,126" fill="rgba(26,26,26,0.6)" />
                </g>
              </svg>
              {['Chorionic villi', 'Chorioamniotic membranes', 'Decidua'].map((t, i) => (
                <div key={i} style={css(`position:absolute; left:0; top:${48 + i * 52}px; width:196px; min-height:44px; background:#F5EEDB; border:1px solid rgba(26,26,26,0.30); display:flex; align-items:center; gap:9px; padding:6px 11px;`)}>
                  <span style={css(`flex:0 0 auto; width:8px; height:8px; background:#6E5F49;`)} />
                  <span style={css(`font-family:'IBM Plex Mono',monospace; font-size:13px; line-height:1.22; color:#1a1a1a;`)}>{t}</span>
                </div>
              ))}
            </div>

            {/* STAGE 01 */}
            <div className="stage s1" style={css(stageBox)}>
              {this.stageHeader('STAGE 01')}
              <div style={css(`flex:0 0 120px;`)}>
                <svg viewBox="0 0 200 120" width="100%" height="120" style={{ display: 'block' }}>
                  {D.scatter1.map((d, i) => (<circle key={i} className="gdot" r="2.1" cx={d.cx} cy={d.cy} />))}
                </svg>
              </div>
              {this.stageCaption('Raw 10X Genomics output', 'FASTQ → count matrix')}
            </div>

            {this.arrow('a1')}

            {/* STAGE 02 */}
            <div className="stage s2" style={css(stageBox)}>
              {this.stageHeader('STAGE 02')}
              <div style={css(`flex:0 0 120px;`)}>
                <svg viewBox="0 0 200 120" width="100%" height="120" style={{ display: 'block' }}>
                  <line x1="100" y1="8" x2="100" y2="112" stroke="rgba(26,26,26,0.26)" strokeWidth="1" strokeDasharray="3 4" />
                  {D.scatter2.map((d, i) => (<circle key={i} className="gdot" r="2.1" cx={d.cx} cy={d.cy} fillOpacity={d.op} />))}
                </svg>
              </div>
              {this.stageCaption('QC & filtering', 'Seurat · low-quality cells removed')}
            </div>

            {this.arrow('a2')}

            {/* STAGE 03 */}
            <div className="stage s3" style={css(stageBox)}>
              {this.stageHeader('STAGE 03')}
              <div style={css(`flex:0 0 120px;`)}>
                <svg viewBox="0 0 200 120" width="100%" height="120" style={{ display: 'block' }}>
                  {dots3.map((s, i) => (<circle key={i} className="rdot" r="2.2" style={css(s)} />))}
                </svg>
              </div>
              {this.stageCaption('Normalization & clustering', 'Seurat · unsupervised')}
            </div>

            {this.arrow('a3')}

            {/* STAGE 04 — FOCAL */}
            <div className="stage s4" style={css(`position:relative; flex:0 0 236px; box-sizing:border-box; background:#FBF4E2; border:2px solid #790000; box-shadow:0 16px 46px rgba(121,0,0,0.17); padding:14px 16px 14px; height:252px; display:flex; flex-direction:column;`)}>
              {/* before/after callout */}
              <div className="cPanel" style={css(`position:absolute; left:50%; bottom:100%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; width:352px; margin-bottom:0;`)}>
                <div style={css(`background:#FBF4E2; border:2px solid #790000; box-shadow:0 12px 34px rgba(121,0,0,0.15); padding:13px 15px; width:100%; box-sizing:border-box;`)}>
                  <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.16em; color:#1a1a1a; margin-bottom:10px;`)}>CELL-TYPE LABELING</div>
                  <div style={css(`position:relative; display:inline-block; margin-bottom:9px;`)}>
                    <span className="cManual" style={css(`font-family:'IBM Plex Mono',monospace; font-size:14px; color:#5A5145; white-space:nowrap;`)}>Manual: 7+ days</span>
                    <span className="cStrike" style={css(`position:absolute; left:0; top:50%; width:100%; height:2px; background:#790000;`)} />
                  </div>
                  <div className="cAuto" style={css(`display:flex; align-items:center; gap:10px; flex-wrap:nowrap;`)}>
                    <span style={css(`font-family:'Spectral',Georgia,serif; font-style:italic; font-weight:600; font-size:20px; color:#1a1a1a; line-height:1; white-space:nowrap;`)}>Automated: &lt;12 hrs</span>
                    <span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; font-weight:600; color:#FDF6D8; background:#790000; padding:4px 8px; line-height:1;`)}>90%↓</span>
                  </div>
                </div>
                <div style={css(`width:2px; height:22px; background:#790000;`)} />
                <div style={css(`width:9px; height:9px; border-radius:50%; background:#790000; margin-top:-4px;`)} />
              </div>

              {this.stageHeader('STAGE 04', true)}
              <div style={css(`position:relative; flex:0 0 120px;`)}>
                <svg viewBox="0 0 200 120" width="100%" height="120" style={{ display: 'block' }}>
                  {D.fdots.map((d, i) => (<circle key={i} r="2.4" cx={d.ex} cy={d.ey} fill={d.col} />))}
                </svg>
                {tags.map((t, i) => (
                  <div key={i} style={css(`position:absolute; left:${t.left}; top:${t.top}; transform:translate(-50%,-50%);`)}>
                    <div className="tag" style={css(`animation-delay:${t.delay}; display:flex; align-items:center; gap:5px; background:#FBF4E2; border:1px solid ${t.col}; padding:2px 6px; line-height:1; transform-origin:center; box-shadow:0 1px 3px rgba(26,26,26,0.14);`)}>
                      <span style={css(`flex:0 0 auto; width:8px; height:8px; background:${t.col};`)} />
                      <span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; font-weight:600; color:#1a1a1a;`)}>{t.code}</span>
                    </div>
                  </div>
                ))}
              </div>
              {this.stageCaption('Cell-type annotation', 'SingleR · reference-based')}
            </div>

            {this.arrow('a4')}

            {/* STAGE 05 */}
            <div className="stage s5" style={css(stageBox)}>
              {this.stageHeader('STAGE 05')}
              <div style={css(`flex:0 0 120px;`)}>
                <svg viewBox="0 0 200 120" width="100%" height="120" style={{ display: 'block' }}>
                  <path d="M22,98 C54,80 70,56 104,58 C140,60 152,42 182,28" fill="none" stroke="rgba(26,26,26,0.5)" strokeWidth="1.8" />
                  <path d="M104,58 C122,80 142,90 176,96" fill="none" stroke="rgba(26,26,26,0.34)" strokeWidth="1.5" />
                  <circle cx="22" cy="98" r="3.2" fill="#6E5F49" />
                  <circle cx="104" cy="58" r="3.6" fill="#3F5E50" />
                  <circle cx="176" cy="96" r="3.2" fill="#5A4878" />
                  <circle cx="182" cy="28" r="3.8" fill="#790000" />
                </svg>
              </div>
              {this.stageCaption('Downstream analysis', 'Trajectory · GO · cell–cell signaling')}
            </div>
          </div>

          {/* FOOTER / LEGEND */}
          <div style={css(`position:relative; z-index:8; display:flex; align-items:center; justify-content:space-between; gap:24px; border-top:1px solid rgba(26,26,26,0.22); padding-top:13px; background:#EFE7D3;`)}>
            <div style={css(`display:flex; align-items:center; gap:26px;`)}>
              <div style={css(`display:flex; align-items:center; gap:9px;`)}>
                <span style={css(`display:flex; gap:3px;`)}>
                  {['#1B3A57', '#3F5E50', '#9C6A1E', '#5A4878', '#34567F'].map((c, i) => (<span key={i} style={css(`width:9px; height:9px; border-radius:50%; background:${c};`)} />))}
                </span>
                <span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; color:#463F33;`)}>cell-type clusters</span>
              </div>
              <div style={css(`display:flex; align-items:center; gap:9px;`)}><span style={css(`width:12px; height:12px; background:#790000;`)} /><span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; color:#463F33;`)}>focal stage · reference annotation</span></div>
              <div style={css(`display:flex; align-items:center; gap:9px;`)}><span style={css(`width:20px; height:2px; background:rgba(26,26,26,0.55);`)} /><span style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; color:#463F33;`)}>data flow</span></div>
            </div>
            <div style={css(`font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.03em; color:#4A4234;`)}>scRNA-seq pipeline · UW Medicine — published, BMC Genomics</div>
          </div>
        </div>
      </div>
    );
  }
}
