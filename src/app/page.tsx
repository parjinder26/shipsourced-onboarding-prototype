'use client';

/* ─────────────────────────────────────────────────────────────
   ShipSourced — marketing page, redesign candidate.

   Design brief: replace the dark/neon/animated landing page with a
   light editorial layout. Rules this page follows:
     • one accent colour, used sparingly (eyebrows, one headline line,
       diagram highlights) — never as a glow or a gradient
     • hairline borders + one soft shadow instead of neon and blur
     • no emoji, no counters, no marquee, no 3D, no pulse
     • a real type scale and a 8px spacing rhythm
   All colours live in the token block below — swapping the accent is
   a one-line change.
   ───────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const sans = localFont({
  src: './fonts/PlusJakartaSansVariable.woff2',
  weight: '200 800',
  display: 'swap',
});

/* ⚠️ NOT CONFIRMED. Three numbers exist in this repo and none are labelled
   WhatsApp — (559) 203-8158 (the team's message), (559) 203-8185
   (ShippingCalculator.tsx, same digits transposed) and (559) 293-9121 (the
   onboarding crons). Confirm before this page goes anywhere public. */
const WA_NUMBER = '15592038158';
const WA_TEXT = 'Hi ShipSourced — I\'d like a quote on my product.';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

function WaMark() {
  return (
    <svg className="wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 004.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.8 9.8 0 0012.04 2zm0 17.94h-.01a8.2 8.2 0 01-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.13 8.13 0 01-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 012.4 5.8c0 4.52-3.68 8.19-8.2 8.19z" />
    </svg>
  );
}

/* ── Primitives ─────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Btn({ href, children, variant = 'solid' }: { href: string; children: ReactNode; variant?: 'solid' | 'ghost' }) {
  return (
    <Link href={href} className={`btn btn--${variant}`}>
      {children}
      <Arrow />
    </Link>
  );
}

/* ── Affiliate dashboard preview ──
   A still of the real partner dashboard (components/ReferralDashboard.tsx) with example
   numbers — same tiles, chart and funnel the partner sees after signing up. */
const previewBars = [2, 3, 3, 5, 4, 6, 7, 6, 9, 8, 10, 12, 9, 13, 14, 12, 16, 15, 18, 17, 20, 19, 22, 24, 21, 26, 25, 28, 27, 30];
const previewKpis = [
  { label: 'Link views', value: '1,284', sub: '312 in the last 30 days' },
  { label: 'Sign-ups', value: '37', sub: '2.9% of views · 31 connected a store' },
  { label: 'Stores shipping', value: '19', sub: '7,770 orders shipped' },
  { label: 'Total earned', value: '$2,132.50', sub: '$212.75 pending · $1,919.75 paid' },
];
const previewFunnel = [
  { label: 'Viewed your link', n: '1,284', pct: '100%', w: 100 },
  { label: 'Signed up', n: '37', pct: '2.9%', w: 46 },
  { label: 'Connected a store', n: '31', pct: '2.4%', w: 38 },
  { label: 'Shipping orders', n: '19', pct: '1.5%', w: 26 },
];

function AffiliatePreview() {
  return (
    <div className="affdash" role="img" aria-label="Example partner dashboard: your referral link, link views, sign-ups, stores shipping, earnings over 30 days and a funnel from views to shipping stores.">
      <div className="affdash__top">
        <span className="affdash__dots"><i /><i /><i /></span>
        <span className="affdash__title">Partner dashboard</span>
        <span className="affdash__tag">Example</span>
      </div>
      <div className="affdash__link">
        <div>
          <p className="affdash__label">Your referral link</p>
          <p className="affdash__url mono">shipsourced.com/onboard?ref=<b>jordan</b></p>
        </div>
        <span className="affdash__copy">Copy link</span>
      </div>
      <div className="affdash__kpis">
        {previewKpis.map(k => (
          <div key={k.label} className="affdash__kpi">
            <p className="affdash__label">{k.label}</p>
            <p className="affdash__value">{k.value}</p>
            <p className="affdash__sub">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="affdash__row">
        <div className="affdash__chart">
          <div className="affdash__chart-head"><span>Earnings, last 30 days</span><b>$486.25</b></div>
          <div className="affdash__bars">
            {previewBars.map((h, i) => <i key={i} style={{ height: `${h * 3.2}%` }} />)}
          </div>
        </div>
        <ul className="affdash__funnel">
          {previewFunnel.map(f => (
            <li key={f.label}>
              <div className="affdash__frow"><span>{f.label}</span><span><b>{f.n}</b> <small>{f.pct}</small></span></div>
              <div className="affdash__track"><div style={{ width: `${f.w}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Section({ id, children, tone = 'light', className = '' }: {
  id?: string; children: ReactNode; tone?: 'light' | 'ink' | 'white'; className?: string;
}) {
  return (
    <section id={id} className={`section section--${tone} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* ── Small illustrative marks (no icon library, no emoji) ── */

const marks = {
  /* two people handing a package over — the moment an order is placed */
  store: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4.5" cy="5" r="2.1" /><path d="M1.8 20v-5.4a2.7 2.7 0 0 1 2.7-2.7h.6" />
      <circle cx="19.5" cy="5" r="2.1" /><path d="M22.2 20v-5.4a2.7 2.7 0 0 0-2.7-2.7h-.6" />
      <rect x="8.4" y="9.6" width="7.2" height="6" rx="1" />
      <path d="M6.4 12.6h2M15.6 12.6h2" />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20V8.8l9-4.8 9 4.8V20M8 20v-6h8v6M8 17h8" />
    </svg>
  ),
  carrier: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6.5h11.5v9H2zM13.5 9.5H18l3.5 3.5v2.5h-8z" /><circle cx="6" cy="18" r="1.9" /><circle cx="17.5" cy="18" r="1.9" />
    </svg>
  ),
  customer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" /><path d="M4.8 19.5a7.4 7.4 0 0 1 14.4 0" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V5.5a1.5 1.5 0 0 1 1.5-1.5H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M7.5 12h9" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 7.8 12 3.2 3.5 7.8v8.4L12 20.8l8.5-4.6zM3.5 7.8 12 12.4m0 0v8.4m0-8.4 8.5-4.6" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5zM13.5 3.5v5h5M9 13h6M9 16.5h4" />
    </svg>
  ),
};

/* ── Supply-chain diagram (hero card) ───────────── */

const flowNodes = [
  { mark: marks.store,     title: 'Your store',          sub: 'Shopify · Amazon · API' },
  { mark: marks.warehouse, title: 'Our warehouse',       sub: 'Shenzhen, CN · Clovis, CA' },
  { mark: marks.globe,     title: 'Destination country', sub: 'Customs cleared by us' },
  { mark: marks.customer,  title: 'Your customer',       sub: '200+ countries' },
];

const flowStages = ['Synced', 'Picked', 'In the air', 'Customs', 'Delivered'];

/**
 * The journey animates once it scrolls into view: each leg wipes in left to
 * right, the plane flies the air leg, and the nodes and stage chips light in
 * sequence. One shared 15s loop drives all of it — the keyframes in CSS are
 * staggered by percentage, so nothing can drift out of sync.
 *
 * Held paused until `.is-live` so it never animates off-screen, and fully
 * disabled (rendered in its finished state) under prefers-reduced-motion.
 */
function FlowDiagram() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLive(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const LEG1 = 'M135 112 H 365';
  const ARC  = 'M385 112 Q 500 26 615 112';
  const LEG2 = 'M635 112 H 865';

  return (
    <figure ref={ref} className={`flow card ${live ? 'is-live' : ''}`}>
      <div className="flow__track" aria-hidden="true">
        <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="flow__svg">
          {/* three vehicles, each running its own leg in turn */}
          <g className="flow__veh flow__veh--walk" style={{ offsetPath: `path('${LEG1}')` } as React.CSSProperties}>
            <circle cx="-3" cy="-30" r="5" />
            <path className="fv-limb" d="M-3 -25 V-11" />
            <rect className="fv-box fv-box--set" x="3" y="-24" width="11" height="11" rx="2" />
            <path className="fv-limb fv-arm fv-arm--set" d="M-3 -21 H3" />
            <path className="fv-limb fv-leg fv-leg--a" d="M-3 -11 L-8 0" />
            <path className="fv-limb fv-leg fv-leg--b" d="M-3 -11 L2 0" />
          </g>
          {/* the box he put down, waiting at the warehouse for its flight */}
          <rect className="flow__dropped" x="360" y="100" width="11" height="11" rx="2" />
          <g className="flow__veh flow__veh--plane" style={{ offsetPath: `path('${ARC}')` } as React.CSSProperties}>
            <path d="M16 0 L2 -2.5 L-4 -9 L-8 -9 L-4 -2.5 L-13 -2.5 L-15 -6 L-17 -6 L-16 -2.5 L-18 0 L-16 2.5 L-17 6 L-15 6 L-13 2.5 L-4 2.5 L-8 9 L-4 9 L2 2.5 Z" />
          </g>
          {/* last mile — a smaller mail van, with an envelope on the side */}
          <g className="flow__veh flow__veh--walk flow__veh--courier" style={{ offsetPath: `path('${LEG2}')` } as React.CSSProperties}>
            <circle cx="-3" cy="-30" r="5" />
            <path className="fv-limb" d="M-3 -25 V-11" />
            <rect className="fv-box" x="3" y="-24" width="11" height="11" rx="2" />
            <path className="fv-limb" d="M-3 -21 H3" />
            <path className="fv-limb fv-leg fv-leg--a" d="M-3 -11 L-8 0" />
            <path className="fv-limb fv-leg fv-leg--b" d="M-3 -11 L2 0" />
          </g>
        </svg>
      </div>

      <ol className="flow__nodes">
        {flowNodes.map((n, i) => (
          <li key={n.title} className="flow__node">
            <span className={`flow__chip flow__chip--${i + 1}`}>
              {n.mark}
              {i === 3 && (
                <em className="flow__badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2"
                       strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
                </em>
              )}
            </span>
            <span className="flow__title">{n.title}</span>
            <span className="flow__sub">{n.sub}</span>
          </li>
        ))}
      </ol>

      <figcaption className="flow__legend">
        {flowStages.map((label, i) => (
          <span key={label} className={`legend legend--s${i + 1}`}><i /> {label}</span>
        ))}
      </figcaption>
    </figure>
  );
}

/* ── Stats ──────────────────────────────────────── */

const stats = [
  { v: '200+', l: 'Countries served' },
  { v: '99.5%', l: 'Order accuracy' },
  { v: '~15 min', l: 'Signup to first label' },
];

/* ── Timeline ───────────────────────────────────── */

const timeline = [
  {
    when: 'Minute 0',
    title: 'The order syncs itself',
    body: 'Your store pushes the order the moment it is placed. No CSV, no copy-paste, no portal for you to babysit.',
    scene: 'sync' as const,
    mark: marks.store,
  },
  {
    when: 'Hour 1',
    title: 'We pick and pack it',
    body: 'The order drops into a tote on the floor. Every parcel is weighed and photographed before it is sealed.',
    scene: 'pack' as const,
    mark: marks.box,
  },
  {
    when: 'Same day',
    title: 'The cheapest label wins',
    body: 'We rate-shop USPS, UPS and DHL on every parcel and buy the cheapest service that still hits the promised window.',
    scene: 'label' as const,
    mark: marks.carrier,
  },
  {
    when: 'Day 2 to 8',
    title: 'It lands on the doorstep',
    body: 'Domestic orders in 2 to 4 days, cross-border in 5 to 8. Customs paperwork is filed by us, not by you.',
    scene: 'deliver' as const,
    mark: marks.customer,
  },
];

function Scene({ kind }: { kind: 'sync' | 'pack' | 'label' | 'deliver' }) {
  if (kind === 'sync') {
    return (
      <div className="scene">
        {[
          { id: '#SS-7231', st: 'Synced', tone: 'ok' },
          { id: '#SS-7230', st: 'Synced', tone: 'ok' },
          { id: '#SS-7229', st: 'Syncing', tone: 'wait' },
        ].map(r => (
          <div key={r.id} className="scene__row">
            <span className="mono">{r.id}</span>
            <span className={`tag tag--${r.tone}`}>{r.st}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'pack') {
    return (
      <div className="scene scene--center">
        <div className="scale">
          <div className="scale__read"><span className="mono">12.4</span> oz</div>
          <div className="scale__plate" />
        </div>
        <p className="scene__note">Weighed &amp; photographed · Tote B-14</p>
      </div>
    );
  }
  if (kind === 'label') {
    return (
      <div className="scene">
        {[
          { c: 'USPS Ground Advantage', p: '$7.79', win: true },
          { c: 'UPS Ground', p: '$9.14', win: false },
          { c: 'DHL eCommerce', p: '$8.60', win: false },
        ].map(r => (
          <div key={r.c} className={`scene__row ${r.win ? 'scene__row--win' : ''}`}>
            <span>{r.c}</span>
            <span className="mono">{r.p}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="scene scene--center">
      <div className="track">
        {['Accepted', 'In transit', 'Out for delivery', 'Delivered'].map((s, i) => (
          <div key={s} className={`track__step ${i < 3 ? 'track__step--done' : ''}`}>
            <i /><span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/**
 * The how-it-works spine fills as you scroll, and each step lights when it
 * reaches the middle of the screen — so the line runs all the way down to
 * "It lands on the doorstep" exactly as the last card arrives.
 *
 * Progress is written to a CSS variable and the reads are batched into one
 * rAF, so scrolling never triggers a layout thrash.
 */
function useSpine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [lit, setLit] = useState<number>(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      setLit(99);
      return;
    }
    const items = Array.from(el.querySelectorAll<HTMLElement>('.tl__item'));
    let queued = false;

    const measure = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / Math.max(1, r.height)));
      el.style.setProperty('--p', String(p));

      // A step lights exactly when the drawn line reaches its node, so the
      // fill and the markers can never disagree about where you are.
      const drawn = 12 + p * (el.offsetHeight - 24);
      let last = -1;
      items.forEach((it, i) => { if (it.offsetTop + 52 <= drawn) last = i; });
      setLit(last);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(measure); } };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, lit };
}




/**
 * Warehousing capabilities as a stack of numbered cards that overlap — text on
 * the left, a panel showing the actual screen on the right. Each card is pulled
 * up under the one above so the set reads as one continuous run rather than four
 * separate boxes.
 */
const warehouseCards = ([
  {
    n: '01',
    title: 'Every parcel weighed and photographed',
    body: 'The pack station captures a weight and a photo before the box is sealed. When a customer says the box arrived light, there is a record — not an argument.',
    art: (
      <div className="wa-art wa-art--weigh">
        <div className="wa-weigh">
          <span className="wa-weigh__num mono">12.4</span><span className="wa-weigh__u">oz</span>
        </div>
        <div className="wa-photo" aria-hidden="true">
          {['parcel-1', 'parcel-2', 'parcel-3'].map(n => (
            <span key={n}><img src={`/marketing/${n}.jpg`} alt="" loading="lazy" /></span>
          ))}
        </div>
        <p className="wa-cap">3 items · Tote B-14 · sealed 14:22 · operator MG</p>
      </div>
    ),
  },
  {
    n: '02',
    title: 'Two warehouses, one stock number',
    body: 'Clovis and Shenzhen are counted separately at bin level, then rolled into the single figure your store syncs against. No reconciling two spreadsheets to find out what you can actually sell.',
    art: (
      <div className="wa-art">
        <table className="wa-tbl">
          <thead><tr><th>SKU</th><th>Clovis</th><th>Shenzhen</th><th>Sellable</th></tr></thead>
          <tbody>
            {[
              ['MR-LIP-TRIO', 142, 480, 622],
              ['MR-GLOW-30', 38, 210, 248],
              ['MR-NIGHT-50', 9, 0, 9],
            ].map(r => (
              <tr key={String(r[0])}>
                <td className="mono">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                <td><b className={Number(r[3]) < 20 ? 'low' : ''}>{r[3]}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    n: '03',
    title: 'Orders drop straight onto the floor',
    body: 'A synced order becomes a pick task in a numbered tote within minutes. Pickers work a queue, not a printout, and the pack station knows what belongs in every tote.',
    art: (
      <div className="wa-art">
        {[
          { tote: 'B-14', items: '3 items', st: 'Packing', tone: 'go' },
          { tote: 'B-15', items: '1 item', st: 'Picking', tone: 'go' },
          { tote: 'B-16', items: '7 items', st: 'Queued', tone: 'wait' },
        ].map(t => (
          <div key={t.tote} className="wa-row">
            <span className="wa-tote">{t.tote}</span>
            <span className="wa-row__m">{t.items}</span>
            <span className={`wa-pill wa-pill--${t.tone}`}>{t.st}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '05',
    title: 'Customs handled end to end',
    body: 'HS codes classified, declared values set and commercial invoices filed on the China leg. Nothing about the border lands in your inbox.',
    art: (
      <div className="wa-art">
        {[
          ['HS code', '3304.99.50'],
          ['Declared value', '$6.20'],
          ['Description', 'Lip care set, non-medicated'],
          ['Invoice', 'Filed · CN → US'],
        ].map(([k, v]) => (
          <div key={k} className="wa-row">
            <span className="wa-row__sku">{k}</span>
            <span className="mono wa-row__m">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '04',
    title: 'Inbound counted against what you said you sent',
    body: 'Every inbound shipment is received unit by unit against the manifest you submitted. Shortages surface on arrival, while the freight claim is still open.',
    art: (
      <div className="wa-art">
        {[
          { sku: 'MR-LIP-TRIO', exp: 500, got: 500 },
          { sku: 'MR-GLOW-30', exp: 250, got: 250 },
          { sku: 'MR-NIGHT-50', exp: 200, got: 186 },
        ].map(r => (
          <div key={r.sku} className="wa-row">
            <span className="mono wa-row__sku">{r.sku}</span>
            <span className="wa-row__m">{r.got} / {r.exp}</span>
            <span className={`wa-pill wa-pill--${r.got === r.exp ? 'go' : 'bad'}`}>
              {r.got === r.exp ? 'Received' : `${r.exp - r.got} short`}
            </span>
          </div>
        ))}
      </div>
    ),
  },
]).sort((a, b) => a.n.localeCompare(b.n));

/** Letters lift in a wave, then sit still for most of the cycle. A constant
 *  bounce reads as broken; one pass every few seconds reads as an invitation. */
function Wave({ text }: { text: string }) {
  return (
    <span className="wave" aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ animationDelay: `${i * 0.045}s` }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

/* ── Cost comparison ────────────────────────────── */
/* Deliberately a simple illustrative example — the real, live rates sit
   directly underneath it in the ShippingCalculator slab. */

/* ⚠️ Pick & pack is NOT free and must never be shown as $0.00 here (it read that
   way until 2026-09-17). Production bills it on essentially every order —
   pack $0.50-$2.50, pick $0.50-$5.00 depending on the account — and /pricing
   now discloses it as a real line. A homepage that zeroes it contradicts that
   page, and Shopify App Store requirement 4.2.1 asks for pricing that is
   accurate and complete. The honest comparison is the label and the markup:
   we rate-shop the carrier and we do not add an agent's cut on top. */
const costRows = [
  { label: 'Product', agent: '$6.20', us: '$6.20', muted: true },
  { label: 'Shipping label', agent: '$9.14', us: '$7.79', muted: false },
  { label: 'Pick & pack', agent: '$1.40', us: '$1.40', muted: false },
  { label: 'Agent markup', agent: '$1.10', us: '$0.00', muted: false },
];

/* ── Capability cards ───────────────────────────── */


/* ONE programme, quoted per order. ⚠️ The rate shown is $0.20 while
   referralCommissionPerOrder in the database is still 0.15 — the owner is
   handling that separately (2026-09-12), so until it lands the site advertises
   more than the engine pays. Do not treat this as the source of truth for
   commissions. The setter $0.10 / closer $0.15 tiers still exist in the
   commission route; they are simply no longer advertised here. */
const affiliateSteps = [
  { n: '1', title: 'Create your account', body: 'Takes a minute. Your referral link is ready the moment you are in.' },
  { n: '2', title: 'Share your link', body: 'It opens our free quote page, so the people you send get a price before they ever sign up.' },
  { n: '3', title: 'Track it all', body: 'Real views, sign-ups, stores shipping and what each one has earned you — live, in your dashboard.' },
];

const rewards = [
  {
    name: 'When a store ships its first order',
    rate: '$10',
    unit: 'per store',
    body: 'A store signs up through your link and ships one order with us. The first shipped order pays you ten dollars. Sign-ups that never ship do not count.',
    who: 'Signup bonus',
  },
  {
    name: 'On every order after that',
    rate: '$0.25',
    unit: 'per order they ship',
    body: 'Every order the store ships pays you — for as long as they keep shipping. No cap on stores, no cap on orders, and no twelve-month window.',
    who: 'For life',
  },
];

const affiliateFaq = [
  { q: 'How much do I actually earn?', a: 'Ten dollars the first time a store you referred ships an order, then 25 cents on every order after. It is a flat amount per order, not a percentage of their shipping bill, so it does not shrink when they negotiate better rates. A store shipping 300 orders a month earns you $10 up front and then $75 every month.' },
  { q: 'When do the payments stop?', a: 'They do not. You earn on every order for as long as that store keeps shipping with us. There is no twelve-month window and no cap on the number of stores you refer.' },
  { q: 'Do I need to be a ShipSourced client myself?', a: 'No. A free partner account is only for referring — create one, and you get your link and your dashboard straight away. If you already ship with us, you do not need a second account: your link is in your client portal under Referrals, and clients earn the same $0.25 an order plus a $10 bill credit per store.' },
  { q: 'What can I see in the dashboard?', a: 'Your link with a one-click copy, how many real people viewed it, who signed up, which of them connected a store and which are shipping, every order that earned you something, and what is pending versus paid. Views count real people only — one per person per day, after they spend a few seconds on the page.' },
  { q: 'What counts as a referral?', a: 'A store that signs up through your link and ships at least one order. Sign-ups that never connect a store or never ship do not earn, since the commission is per shipped order.' },
  { q: 'How do I get paid?', a: 'The ShipSourced team pays partners out directly. Every order and bonus is itemised in your dashboard so you can check the number before it is paid.' },
];

/* ── FAQ ────────────────────────────────────────── */

const faqGroups = [
  {
    group: 'What we do',
    items: [
      { q: 'What does ShipSourced actually do for my store?', a: 'We hold your stock in our own warehouses, pick and pack every order that comes in from your store, buy the label, and file the customs paperwork. You keep selling; nothing about fulfillment lands on your desk.' },
      { q: 'Do I need to talk to a salesperson to start?', a: 'No. Onboarding is self-serve end to end — connect your store, confirm your rates, and you can generate your first label in about fifteen minutes. A human is available if you want one, but nothing is gated behind a call.' },
      { q: 'How is this different from a sourcing agent?', a: 'An agent quotes you per order and marks up the freight. We are a warehouse with software: you see the rate card, the label cost, and the pick-and-pack line separately, on every order.' },
    ],
  },
  {
    group: 'Shipping and delivery',
    items: [
      { q: 'How fast do my customers get their orders?', a: 'From our US warehouse, 2 to 4 business days domestically. From Shenzhen, 5 to 8 business days to most of the 200+ countries we ship to.' },
      { q: 'Will my customer know it shipped from China?', a: 'The parcel carries your branding and a local tracking number the customer can follow on the carrier site. No agent branding and no origin markings anywhere on the outside.' },
      { q: 'Can I use my own packaging?', a: 'Yes. Send us your mailers, inserts, or boxes and we will store them alongside your stock and apply per-SKU packing rules automatically.' },
    ],
  },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq ${open ? 'faq--open' : ''}`}>
      <button className="faq__q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="faq__sign" aria-hidden="true">{open ? '−' : '+'}</span>
        {q}
      </button>
      {open && <p className="faq__a">{a}</p>}
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */

export default function RedesignPage() {
  const [menu, setMenu] = useState(false);
  const spine = useSpine<HTMLOListElement>();

  const nav = [
    { label: 'How it works', href: '#how' },
    { label: 'Software', href: '#portal' },
    { label: 'Warehousing', href: '#warehousing' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Affiliate', href: '#affiliate' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className={`page ${sans.className}`}>
      
      <Styles />

      {/* ── Nav ── */}
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="brand">
            <img src="/logo-icon.png" alt="" className="brand__mark" />
            <span>ShipSourced</span>
          </Link>
          <nav className="nav__links">
            {nav.map(n => <a key={n.label} href={n.href}>{n.label}</a>)}
          </nav>
          <div className="nav__cta">
            <Link href="/login" className="nav__login">Sign in</Link>
            <Btn href="/signup">Sign Up</Btn>
          </div>
          <button className="nav__burger" onClick={() => setMenu(m => !m)} aria-label="Menu" aria-expanded={menu}>
            <span /><span /><span />
          </button>
        </div>
        {menu && (
          <div className="nav__drawer">
            {nav.map(n => <a key={n.label} href={n.href} onClick={() => setMenu(false)}>{n.label}</a>)}
            <Link href="/login" onClick={() => setMenu(false)}>Sign in</Link>
            <Link href="/signup" onClick={() => setMenu(false)}>Sign Up</Link>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="wrap">
          <p className="hero__kicker">Self-serve 3PL · United States &amp; China</p>
          <h1 className="hero__h1">
            Connect your store.<br />
            <span className="accent">Your orders ship themselves.</span>
          </h1>
          <p className="hero__sub">
            We warehouse your stock in Clovis and Shenzhen, pick and pack every order the moment
            it syncs, and buy the cheapest label that still hits the delivery window. Customs included.
          </p>
          <div className="hero__cta">
            <Btn href="/signup">Sign Up</Btn>
            <Btn href="#" variant="ghost">Talk to the team</Btn>
            <Btn href="#pricing" variant="ghost">See what it costs</Btn>
          </div>
          <FlowDiagram />
        </div>
      </section>

      {/* ── Stats ── */}
      <Section tone="white" className="statband">
        <div className="stats">
          {stats.map(s => (
            <div key={s.l} className="stat">
              <p className="stat__v">{s.v}</p>
              <p className="stat__l">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Timeline ── */}
      <Section id="how">
        <div className="head">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="h2">From the checkout page to the<br /><span className="accent">doorstep</span>, without you.</h2>
        </div>
        <div className="how">
          <ol className="tl" ref={spine.ref}>
          <span className="tl__fill" aria-hidden="true" />
          {timeline.map((t, i) => (
            <li key={t.when} className={`tl__item ${i % 2 ? 'tl__item--right' : ''} ${i <= spine.lit ? 'is-lit' : ''}`}>
              <span className="tl__node" aria-hidden="true">{t.mark}</span>
              <article className="card tl__card">
                <Scene kind={t.scene} />
                <div className="tl__body">
                  <p className="tl__when">{t.when}</p>
                  <h3 className="h3">{t.title}</h3>
                  <p className="muted">{t.body}</p>
                </div>
              </article>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── Portal preview ── */}
      <Section id="portal">
        <div className="head">
          <Eyebrow>Software</Eyebrow>
          <h2 className="h2">Every order, SKU and dollar<br /><span className="accent">on one screen.</span></h2>
          <p className="head__sub">
            <strong className="cta-word"><Wave text="Click through it" /></strong> — this is the real
            dashboard your account opens on.
          </p>
        </div>
        {/* The Software section now embeds the REAL /dashboard-preview route instead of a
            static mock, so "this is the real dashboard your account opens on" is literally
            true and the marketing page can never drift from the product. The old dashboard
            still lives in src/app/components/PortalMockup.tsx if this needs reverting —
            re-import it and swap this block back. */}
        <div className="portal">
          <div className="portal__frame">
            <div className="portal__bar">
              <span className="portal__dots"><i /><i /><i /></span>
              <span className="portal__url">app.shipsourced.com/dashboard</span>
              <a className="portal__pop" href="https://shipsourcedcenter.com/dashboard-preview" target="_blank" rel="noreferrer">Open full screen &#8599;</a>
            </div>
            <iframe
              className="portal__inner"
              src="https://shipsourcedcenter.com/dashboard-preview"
              title="ShipSourced client dashboard (sample data)"
              loading="lazy"
            />
          </div>
        </div>

        <div className="stack" id="warehousing">
          <p className="stack__lede">A warehouse and the software<br />that runs it.<span>No spreadsheets, no tab-hopping — every part of it visible from one screen.</span></p>
          {warehouseCards.map((c, i) => (
            <article key={c.n} className="stack__card card" style={{ zIndex: i + 1, top: `${96 + i * 16}px` }}>
              <div className="stack__text">
                <p className="stack__num">{c.n}</p>
                <h3 className="h3 stack__h">{c.title}</h3>
                <p className="muted">{c.body}</p>
              </div>
              <div className="stack__art">{c.art}</div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Two proof panels ── */}
      <Section>
        <div className="duo">
          <article className="card panel">
            <div className="panel__head">
              <h3 className="h3">It arrives like a domestic order.</h3>
              <p className="muted">Local carrier, local tracking, your branding. No origin markings on the outside.</p>
            </div>
            <div className="panel__art">
              <div className="lbl lbl--back">
                <p className="lbl__from">Shipped from Shenzhen</p>
                <p className="mono lbl__num">CN 4471 8820</p>
                <div className="barcode" />
              </div>
              <div className="lbl lbl--front">
                <p className="lbl__brand">YOUR BRAND</p>
                <p className="lbl__carrier">USPS</p>
                <p className="mono lbl__num">9400 1148 8842</p>
                <div className="barcode" />
              </div>
            </div>
          </article>

          <article className="card panel">
            <div className="panel__head">
              <h3 className="h3">Every unit opened, not a sample.</h3>
              <p className="muted">Defects get caught on our floor instead of in your support inbox.</p>
            </div>
            <div className="panel__art panel__art--qc">
              <div className="qc">
                <p className="qc__title">QC · inbound lot 214</p>
                <div className="qc__grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className={`qc__cell ${i === 7 ? 'qc__cell--bad' : ''}`}>
                      {i === 7 ? '✕' : '✓'}
                    </span>
                  ))}
                </div>
                <p className="qc__flag">Unit 47 · loose stitching · rejected</p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* ── Pricing / comparison ── */}
      <Section id="pricing" tone="white">
        <div className="head">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="h2">Every line on the invoice,<br /><span className="accent">shown before you commit.</span></h2>
          <p className="head__sub">
            One example order — a 12&nbsp;oz parcel to a US address — priced the way an agent bills it,
            and the way we bill it.
          </p>
        </div>

        <div className="compare">
          <div className="card compare__col">
            <p className="compare__label">A typical sourcing agent</p>
            <dl>
              {costRows.map(r => (
                <div key={r.label} className="compare__row">
                  <dt className={r.muted ? 'muted' : ''}>{r.label}</dt>
                  <dd className={r.muted ? 'muted' : 'bad'}>{r.agent}</dd>
                </div>
              ))}
            </dl>
            <div className="compare__total">
              <span>You pay</span><strong className="bad">$17.84</strong>
            </div>
          </div>

          <div className="card card--on compare__col">
            <p className="compare__label compare__label--on">ShipSourced</p>
            <dl>
              {costRows.map(r => (
                <div key={r.label} className="compare__row">
                  <dt className={r.muted ? 'muted' : ''}>{r.label}</dt>
                  <dd className={r.us === '$0.00' ? 'muted' : ''}>{r.us}</dd>
                </div>
              ))}
            </dl>
            <div className="compare__total">
              <span>You pay</span><strong className="accent">$15.39</strong>
            </div>
          </div>
        </div>
        <p className="fineprint">
          Illustrative figures for one example parcel. Your own rates are quoted per SKU and per
          destination — see below.
        </p>

        {/* Each lane described rather than priced — a real quote depends on the
            product's weight, size and destination, so the page hands off to /quote
            instead of pretending a calculator can answer it. */}
        <div className="lanes">
          {[
            {
              name: 'US Domestic',
              lede: 'Your stock sits in Clovis, California.',
              body: 'We pick, pack and rate-shop USPS, UPS and DHL on every single order, then buy whichever label is cheapest for that parcel. Pick, pack and the packaging itself are one flat per-order rate.',
              facts: ['2 to 4 business days', 'Cheapest carrier per parcel', 'Packaging included'],
            },
            {
              name: 'International',
              lede: 'The same warehouse, shipping to 200+ countries.',
              body: 'Commercial invoices, declared values and HS codes are filed on our side. Your customer gets a tracking number they can follow on their local carrier.',
              facts: ['200+ destinations', 'Customs paperwork filed by us', 'End-to-end tracking'],
            },
            {
              name: 'China Fulfillment',
              lede: 'Skip the US leg entirely.',
              body: 'We hold your stock in Shenzhen and ship factory-direct to your customer. No US inventory to buy up front, no freight to pre-pay, and nothing about the border reaches your inbox.',
              facts: ['5 to 8 business days', 'No US stock required', 'Branded, no origin markings'],
            },
          ].map(l => (
            <article key={l.name} className="card lane">
              <p className="lane__name">{l.name}</p>
              <p className="lane__lede">{l.lede}</p>
              <p className="lane__body">{l.body}</p>
              <ul className="lane__facts">
                {l.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="quote">
          <div className="quote__box card">
            <h3 className="quote__h">Get a quote on your exact product.</h3>
            <p className="quote__p">
              Weight, size and destination move the number more than any calculator can guess.
              Send us the product and we&apos;ll price it properly — no call required.
            </p>
            <a className="wabtn" href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <WaMark /> Message us on WhatsApp
            </a>
            <p className="quote__note">Typically answered the same day.</p>
          </div>
        </div>
      </Section>

      {/* ── Affiliate ── */}
      <Section id="affiliate" tone="ink" className="aff">
        <div className="aff__grid">
          <div className="aff__copy">
            <p className="aff__eyebrow">Affiliate programme</p>
            <h2 className="h2 h2--ink aff__h">Refer once. Get paid on every order<br />for as long as they ship.</h2>
            <p className="aff__sub">
              Create a free partner account and you get your own link on the spot. Share it with store
              owners, your students, your community — then watch every view, sign-up and shipped order
              land in your dashboard. $10 when a store you sent ships its first order, then $0.25 on every
              order after, for the life of the account.
            </p>
            <div className="aff__cta">
              <Btn href="#">Create your account &amp; get your link</Btn>
              <Btn href="#" variant="ghost">Partner sign in</Btn>
            </div>
            <p className="aff__client">
              Already a ShipSourced client? Your link is in your portal under <a href="#">Referrals <Arrow /></a>
            </p>
            <ol className="aff__steps">
              {affiliateSteps.map(st => (
                <li key={st.n}>
                  <span className="aff__n">{st.n}</span>
                  <div><strong>{st.title}</strong><p>{st.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <AffiliatePreview />
        </div>
        <div className="aff__more">
          <a className="aff__link" href="#rewards">See the rewards <Arrow /></a>
        </div>
      </Section>

      <Section id="rewards" tone="white">
        <div className="head">
          <Eyebrow>The rewards</Eyebrow>
          <h2 className="h2">Every order they ship,<br /><span className="accent">pays you — forever.</span></h2>
        </div>
        <div className="rewards">
          {rewards.map(r => (
            <article key={r.name} className="card reward">
              <p className="reward__who">{r.who}</p>
              <h3 className="reward__name">{r.name}</h3>
              <p className="reward__rate">{r.rate}<span>{r.unit}</span></p>
              <p className="muted reward__body">{r.body}</p>
            </article>
          ))}
        </div>

        <div className="asked">
          <div className="asked__intro">
            <h3 className="h2 asked__h">Questions asked.</h3>
            <p className="muted">What people want to know before they start sending stores over.</p>
          </div>
          <div className="asked__list">
            {affiliateFaq.map(it => <Faq key={it.q} {...it} />)}
          </div>
        </div>
      </Section>

      {/* ── Closing CTA ── */}
      <Section tone="ink" className="closer">
        <h2 className="h2 h2--ink">Your next order can ship itself.</h2>
        <p className="closer__sub">
          Connect a store, confirm your rates, print a label. Roughly fifteen minutes, no call required.
        </p>
        <div className="hero__cta hero__cta--center">
          <Btn href="/signup">Sign Up</Btn>
          <Btn href="/login" variant="ghost">Sign in</Btn>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <div className="faqwrap">
          <div className="faqwrap__intro">
            <h2 className="h2">Questions,<br /><span className="accent">answered.</span></h2>
            <p className="muted">What sellers ask us before they move their fulfillment over.</p>
            <a className="link" href="#">Talk to the team <Arrow /></a>
          </div>
          <div className="faqwrap__list">
            {faqGroups.map(g => (
              <div key={g.group} className="faqgroup">
                <p className="faqgroup__title">{g.group}</p>
                {g.items.map(it => <Faq key={it.q} {...it} />)}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="foot">
        <div className="wrap foot__inner">
          <div className="foot__brand">
            <Link href="/" className="brand brand--dark">
              <img src="/logo-icon.png" alt="" className="brand__mark" />
              <span>ShipSourced</span>
            </Link>
            <p className="muted">Global fulfillment for modern e-commerce sellers.</p>
          </div>
          {[
            { h: 'Platform', links: [['How it works', '#how'], ['Software', '#portal'], ['Warehousing', '#warehousing'], ['Pricing', '#pricing'], ['Rate calculator', '#']] },
            { h: 'Company', links: [['Affiliate programme', '#affiliate'], ['Support', '#'], ['Track a parcel', '#'], ['Terms', '#'], ['Privacy', '#']] },
            { h: 'Get started', links: [['Sign in', '/login'], ['Talk to the team', '#'], ['Book a call', 'https://calendly.com/shipsourced/30min']] },
          ].map(col => (
            <div key={col.h} className="foot__col">
              <p className="foot__h">{col.h}</p>
              {col.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            </div>
          ))}
        </div>
        <div className="wrap foot__base">
          <p>&copy; {new Date().getFullYear()} ShipSourced. All rights reserved.</p>
          <p>Clovis, California &middot; Shenzhen, Guangdong</p>
        </div>
      </footer>
      
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────────────
   Everything is scoped under `.page` so this route cannot leak
   styling into the rest of the app.
   ───────────────────────────────────────────────────────────── */

function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

const CSS = `
.page{
  /* ── tokens ── */
  --ink:#17190F; --ink-2:#23261A;
  --paper:#F6F5F0; --white:#fff;
  --line:#E6E4D9; --line-soft:#F0EEE6;
  --text:#2B2E24; --muted:#6E7261;
  --accent:#5F6E3E; --accent-soft:#EEF1E4; --accent-line:#D6DCC2;
  --bad:#B4441F;
  --r:14px; --r-lg:20px;
  --shadow:0 1px 2px rgba(23,25,15,.04), 0 8px 24px -12px rgba(23,25,15,.10);

  background:var(--paper); color:var(--text);
  font-size:17px; line-height:1.65; letter-spacing:-0.006em;
  -webkit-font-smoothing:antialiased;
}
.page *{box-sizing:border-box;}
.page img{max-width:100%;}
.wrap{max-width:1140px;margin:0 auto;padding:0 28px;}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;letter-spacing:0;}
.muted{color:var(--muted);}
.accent{color:var(--accent);}
.bad{color:var(--bad);}

/* ── type scale ── */
.h2{font-size:clamp(1.95rem,3.4vw,2.85rem);font-weight:700;letter-spacing:-.032em;line-height:1.1;color:var(--ink);margin:0;}
.h2--ink{color:#fff;}
.h3{font-size:1.1rem;font-weight:650;letter-spacing:-.018em;line-height:1.35;color:var(--ink);margin:0 0 8px;}
.eyebrow{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.13em;color:var(--accent);margin:0 0 14px;}
.head{max-width:720px;margin:0 0 56px;}
.head__sub{color:var(--muted);margin:18px 0 0;max-width:52ch;}

/* ── buttons ── */
.btn{display:inline-flex;align-items:center;gap:9px;font-size:.94rem;font-weight:600;
  padding:13px 22px;border-radius:10px;text-decoration:none;transition:background .18s,border-color .18s,color .18s;}
.btn--solid{background:var(--ink);color:#fff;}
.btn--solid:hover{background:var(--accent);}
.btn--ghost{background:var(--white);color:var(--ink);border:1px solid var(--line);box-shadow:var(--shadow);}
.btn--ghost:hover{border-color:var(--accent);color:var(--accent);}
.arrow{width:18px;height:18px;flex:none;}
.link{display:inline-flex;align-items:center;gap:7px;color:var(--accent);font-weight:600;text-decoration:none;border-bottom:1px solid var(--accent-line);padding-bottom:2px;}

/* ── nav ── */
.nav{position:sticky;top:0;z-index:50;background:var(--ink);}
.nav__inner{height:72px;display:flex;align-items:center;justify-content:space-between;gap:32px;}
.brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-weight:700;font-size:1.06rem;letter-spacing:-.02em;}
.brand--dark{color:var(--ink);}
.brand__mark{height:26px;width:auto;border-radius:5px;}
.nav__links{display:flex;gap:30px;}
.nav__links a{color:rgba(255,255,255,.72);text-decoration:none;font-size:.92rem;font-weight:500;transition:color .15s;}
.nav__links a:hover{color:#fff;}
.nav__cta{display:flex;align-items:center;gap:18px;}
.nav__login{color:rgba(255,255,255,.72);text-decoration:none;font-size:.92rem;font-weight:500;}
.nav__login:hover{color:#fff;}
.nav .btn--ghost{padding:10px 18px;box-shadow:none;}
.nav__burger{display:none;flex-direction:column;gap:5px;background:none;border:0;padding:8px;cursor:pointer;}
.nav__burger span{width:20px;height:1.8px;background:#fff;border-radius:2px;}
.nav__drawer{display:none;flex-direction:column;gap:4px;padding:8px 28px 22px;background:var(--ink);}
.nav__drawer a{color:rgba(255,255,255,.8);text-decoration:none;padding:10px 0;font-size:.95rem;border-bottom:1px solid rgba(255,255,255,.07);}

/* ── hero ── */
.hero{padding:96px 0 0;text-align:center;
  background:
    radial-gradient(120% 70% at 50% 0%, #FBFAF6 0%, var(--paper) 60%);}
.hero__kicker{font-size:.86rem;font-weight:600;color:var(--muted);margin:0 0 22px;letter-spacing:.01em;}
.hero__h1{font-size:clamp(2.55rem,5.6vw,4.3rem);font-weight:800;letter-spacing:-.042em;line-height:1.04;color:var(--ink);margin:0;}
.hero__sub{max-width:60ch;margin:24px auto 0;color:var(--muted);font-size:1.08rem;}
.hero__cta{display:flex;gap:12px;justify-content:center;margin:34px 0 0;flex-wrap:wrap;}
.hero__cta--center{margin-top:28px;}

/* ── card ── */
.card{background:var(--white);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);}
.card--on{border-color:var(--accent-line);box-shadow:0 1px 2px rgba(23,25,15,.04),0 14px 34px -16px rgba(95,110,62,.35);}

/* ── flow diagram ──────────────────────────────────────────────────────
   One 15s loop drives every part of the journey. Each keyframe set is a
   window on that same timeline, so the legs, the plane, the nodes and the
   stage chips can never drift apart:

     4–14%   leg 1 wipes in      store → warehouse
     18–52%  arc wipes in + the plane flies it
     56–66%  leg 2 wipes in      destination → customer
     92–100% everything resets

   Animations are declared paused and only run once .is-live is set by the
   IntersectionObserver, so nothing animates off-screen.
   ──────────────────────────────────────────────────────────────────── */
.flow{position:relative;margin:64px 0 0;border-radius:var(--r-lg);padding:34px 40px 26px;text-align:left;}
.flow__track{position:absolute;inset:34px 40px auto;height:150px;pointer-events:none;}
.flow__svg{width:100%;height:150px;overflow:visible;}
.flow__veh{fill:var(--accent);opacity:0;offset-rotate:auto;offset-distance:0%;}

/* the walkers are drawn with strokes, not fills, so they read as figures
   rather than blobs at this size */
.flow__veh--walk{fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
.flow__veh--walk circle{fill:var(--accent);stroke:none;}
.fv-box{fill:var(--accent);stroke:none;}
.flow__veh--courier .fv-box{fill:none;stroke:var(--accent);stroke-width:1.8;}

/* one stride each way, fast enough to look like walking pace rather than a
   shuffle — the hip is the top of each leg's own box, so it swings from there */
.fv-leg{transform-box:fill-box;transform-origin:50% 0%;}
.fv-box--set{animation:fvSetBox 15s linear infinite;}
.fv-arm--set{transform-box:fill-box;transform-origin:0% 50%;animation:fvSetArm 15s linear infinite;}
.flow__dropped{fill:var(--accent);opacity:0;animation:flowDropped 15s linear infinite;}
.fv-leg--a{animation:fvStep .46s ease-in-out infinite;}
.fv-leg--b{animation:fvStep .46s ease-in-out infinite reverse;}
@keyframes fvStep{
  0%{transform:rotate(20deg);}
  50%{transform:rotate(-20deg);}
  100%{transform:rotate(20deg);}
}
@media (prefers-reduced-motion:reduce){.fv-leg{animation:none;}}

.flow__nodes{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;list-style:none;margin:150px 0 0;padding:0;text-align:center;}
.flow__node{display:flex;flex-direction:column;align-items:center;}
.flow__chip{position:relative;width:52px;height:52px;display:grid;place-items:center;border-radius:13px;
  margin-bottom:14px;background:var(--white);border:1px solid var(--line);color:var(--muted);}
.flow__chip svg{width:23px;height:23px;}
.flow__badge{position:absolute;right:-7px;bottom:-7px;width:21px;height:21px;border-radius:50%;
  background:var(--accent);color:#fff;display:grid;place-items:center;border:2px solid var(--white);transform:scale(0);}
.flow__badge svg{width:11px;height:11px;}
.flow__title{font-weight:650;font-size:.96rem;color:var(--ink);letter-spacing:-.015em;}
.flow__sub{font-size:.82rem;color:var(--muted);margin-top:3px;}
.flow__legend{display:flex;flex-wrap:wrap;justify-content:center;gap:26px;margin:44px 0 0;padding:20px 0 0;border-top:1px solid var(--line-soft);}
.legend{display:inline-flex;align-items:center;gap:8px;font-size:.82rem;color:#A9AC9C;}
.legend i{width:7px;height:7px;border-radius:50%;background:#D8D8CC;}

/* ── the 15s timeline ──────────────────────────────────────────────
   Each node lights at the exact percentage its traveller arrives, so the
   chip and the arrival land together rather than drifting apart:

     1–24%   walks the box over      warehouse lights at 24%
     27–52%  flies                   destination lights at 52%
     55–77%  courier walks it in     customer lights at 77%
     77–97%  everything holds lit — a full 3s before it starts again
     97–100% reset
   ──────────────────────────────────────────────────────────────── */
@keyframes flowDrive1{0%,1%{offset-distance:0%;opacity:0;}3%{opacity:1;}21%{opacity:1;}24%,100%{offset-distance:100%;opacity:0;}}
@keyframes flowFly   {0%,27%{offset-distance:0%;opacity:0;}29%{opacity:1;}50%{opacity:1;}52%,100%{offset-distance:100%;opacity:0;}}
@keyframes flowDrive2{0%,55%{offset-distance:0%;opacity:0;}57%{opacity:1;}75%{opacity:1;}77%,100%{offset-distance:100%;opacity:0;}}

/* the set-down, finishing exactly as he reaches the warehouse */
@keyframes fvSetBox{0%,18%{transform:translate(0,0);}24%,100%{transform:translate(1px,14px);}}
@keyframes fvSetArm{0%,18%{transform:rotate(0deg);}24%,100%{transform:rotate(46deg);}}
@keyframes flowDropped{0%,23%{opacity:0;}25%,29%{opacity:1;}32%,100%{opacity:0;}}

@keyframes flowPop{0%,77%{transform:scale(0);}80%,97%{transform:scale(1);}100%{transform:scale(0);}}

/* nodes light on arrival and every one stays lit through the 3s hold */
@keyframes flowChipA{0%{background:var(--white);border-color:var(--line);color:var(--muted);}2%,97%{background:var(--ink);border-color:var(--ink);color:#fff;}100%{background:var(--white);border-color:var(--line);color:var(--muted);}}
@keyframes flowChipB{0%,23%{background:var(--white);border-color:var(--line);color:var(--muted);}25%,97%{background:var(--ink);border-color:var(--ink);color:#fff;}100%{background:var(--white);border-color:var(--line);color:var(--muted);}}
@keyframes flowChipC{0%,51%{background:var(--white);border-color:var(--line);color:var(--muted);}53%,97%{background:var(--ink);border-color:var(--ink);color:#fff;}100%{background:var(--white);border-color:var(--line);color:var(--muted);}}
@keyframes flowChipD{0%,76%{background:var(--white);border-color:var(--line);color:var(--muted);}78%,97%{background:var(--ink);border-color:var(--ink);color:#fff;}100%{background:var(--white);border-color:var(--line);color:var(--muted);}}
@keyframes flowDotA{0%{color:#A9AC9C;}2%,97%{color:var(--text);}100%{color:#A9AC9C;}}
@keyframes flowDotB{0%,23%{color:#A9AC9C;}25%,97%{color:var(--text);}100%{color:#A9AC9C;}}
@keyframes flowDotC{0%,28%{color:#A9AC9C;}30%,97%{color:var(--text);}100%{color:#A9AC9C;}}
@keyframes flowDotD{0%,51%{color:#A9AC9C;}53%,97%{color:var(--text);}100%{color:#A9AC9C;}}
@keyframes flowDotE{0%,76%{color:#A9AC9C;}78%,97%{color:var(--text);}100%{color:#A9AC9C;}}
@keyframes flowDotFillA{0%{background:#D8D8CC;}2%,97%{background:var(--accent);}100%{background:#D8D8CC;}}
@keyframes flowDotFillB{0%,23%{background:#D8D8CC;}25%,97%{background:var(--accent);}100%{background:#D8D8CC;}}
@keyframes flowDotFillC{0%,28%{background:#D8D8CC;}30%,97%{background:var(--accent);}100%{background:#D8D8CC;}}
@keyframes flowDotFillD{0%,51%{background:#D8D8CC;}53%,97%{background:var(--accent);}100%{background:#D8D8CC;}}
@keyframes flowDotFillE{0%,76%{background:#D8D8CC;}78%,97%{background:var(--accent);}100%{background:#D8D8CC;}}

.flow .flow__veh,.flow .flow__chip,.flow .flow__badge,.flow .legend,.flow .legend i,
.flow .fv-box--set,.flow .fv-arm--set,.flow .flow__dropped{
  animation-duration:15s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:paused;}
.flow.is-live .flow__veh,.flow.is-live .flow__chip,
.flow.is-live .flow__badge,.flow.is-live .legend,.flow.is-live .legend i,
.flow.is-live .fv-box--set,.flow.is-live .fv-arm--set,.flow.is-live .flow__dropped{animation-play-state:running;}

.flow__veh--walk:not(.flow__veh--courier){animation-name:flowDrive1;}
.flow__veh--plane{animation-name:flowFly;}
.flow__veh--courier{animation-name:flowDrive2;}
.flow__badge{animation-name:flowPop;}
.flow__chip--1{animation-name:flowChipA;}
.flow__chip--2{animation-name:flowChipB;}
.flow__chip--3{animation-name:flowChipC;}
.flow__chip--4{animation-name:flowChipD;}
.legend--s1{animation-name:flowDotA;} .legend--s1 i{animation-name:flowDotFillA;}
.legend--s2{animation-name:flowDotB;} .legend--s2 i{animation-name:flowDotFillB;}
.legend--s3{animation-name:flowDotC;} .legend--s3 i{animation-name:flowDotFillC;}
.legend--s4{animation-name:flowDotD;} .legend--s4 i{animation-name:flowDotFillD;}
.legend--s5{animation-name:flowDotE;} .legend--s5 i{animation-name:flowDotFillE;}

/* Motion is explanatory here, not decorative — but it is still motion, so
   readers who ask for less get the finished state with nothing moving. */
@media (prefers-reduced-motion:reduce){
  .flow .flow__veh,.flow .flow__chip,.flow .flow__badge,.flow .legend,.flow .legend i,
  .flow .fv-box--set,.flow .fv-arm--set,.flow .flow__dropped{animation:none!important;}
    .flow__veh{display:none;}
  .flow__chip{background:var(--ink);border-color:var(--ink);color:#fff;}
  .flow__badge{transform:scale(1);}
  .legend{color:var(--text);} .legend i{background:var(--accent);}
}

/* ── sections ── */
.section{padding:104px 0;}
.section--light{background:var(--paper);}
.section--white{background:var(--white);border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);}
.section--ink{background:var(--ink);text-align:center;}

/* ── stats ── */
.statband{padding:56px 0;}
/* Three stats, not four — the orders-shipped figure was dropped. */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.stat{text-align:center;}
.stat__v{font-size:clamp(1.6rem,2.6vw,2.15rem);font-weight:750;letter-spacing:-.035em;color:var(--ink);margin:0;line-height:1.1;}
.stat__l{font-size:.87rem;color:var(--muted);margin:6px 0 0;}

/* ── timeline ── */
/* ── how it works: stepped cards ── */
/* The step cards keep the width they had when the video sat beside them: the
   wrap is 1140px less 56px padding = 1084px, and the old grid was
   1fr minmax(0,420px) with a 60px gap, so the cards were 604px. Dropping the
   video to a plain 1fr stretched them across the full 1084px, which is what
   "the boxes look wrong" was. Pinning 604px keeps them identical.
   To bring the video back: restore 1fr minmax(0,420px) and re-add HowVideo.
   NOTE: this whole block is a template literal — no backticks in comments. */
.how{display:grid;grid-template-columns:minmax(0,604px);gap:60px;align-items:start;}

.tl{list-style:none;margin:0;padding:0;position:relative;--p:0;}
/* the unlit rail */
.tl::before{content:"";position:absolute;left:100%;margin-left:30px;transform:translateX(-50%);top:12px;bottom:12px;width:2px;border-radius:2px;background:#DEDBCC;}
/* the lit rail, drawn to the current scroll progress */
.tl__fill{position:absolute;left:100%;margin-left:30px;transform:translateX(-50%);top:12px;width:2px;z-index:1;
  height:calc(var(--p) * (100% - 24px));background:var(--accent);border-radius:2px;
  transition:height .12s linear;pointer-events:none;}
/* the head of the line, so the drawing edge is easy to follow */
.tl__fill::after{content:"";position:absolute;left:50%;bottom:-5px;width:10px;height:10px;border-radius:50%;
  background:var(--accent);transform:translateX(-50%);opacity:calc(var(--p) * 4);
  box-shadow:0 0 0 4px var(--paper);}
.tl__item{position:relative;display:block;margin-bottom:40px;}
.tl__item:last-child{margin-bottom:0;}
.tl__node{position:absolute;left:100%;margin-left:30px;transform:translateX(-50%);top:30px;z-index:2;width:44px;height:44px;border-radius:50%;
  background:var(--white);border:1px solid var(--line);display:grid;place-items:center;color:var(--muted);z-index:2;
  transition:background .35s ease,border-color .35s ease,color .35s ease;}
.tl__item.is-lit .tl__node{background:var(--accent);border-color:var(--accent);color:#fff;}
.tl__node svg{width:19px;height:19px;}
.tl__card{overflow:hidden;}
.tl__body{padding:22px 24px 26px;}
.tl__when{font-size:.76rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin:0 0 9px;}
.tl__card .muted{font-size:.96rem;margin:0;}

/* ── scenes (illustrative panels inside timeline cards) ── */
.scene{background:#FAFAF6;border-bottom:1px solid var(--line-soft);padding:20px 22px;display:flex;flex-direction:column;gap:9px;min-height:132px;justify-content:center;}
.scene--center{align-items:center;justify-content:center;gap:14px;}
.scene__row{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--white);
  border:1px solid var(--line);border-radius:9px;padding:9px 13px;font-size:.85rem;color:var(--text);}
.scene__row--win{border-color:var(--accent-line);background:var(--accent-soft);font-weight:600;color:var(--accent);}
.scene__note{font-size:.79rem;color:var(--muted);margin:0;}
.tag{font-size:.7rem;font-weight:650;padding:2px 9px;border-radius:99px;}
.tag--ok{background:var(--accent-soft);color:var(--accent);}
.tag--wait{background:#F3EFE2;color:#8A7A44;}
.scale{display:flex;flex-direction:column;align-items:center;gap:8px;}
.scale__read{font-size:1.5rem;font-weight:700;letter-spacing:-.03em;color:var(--ink);}
.scale__read .mono{font-size:1em;}
.scale__plate{width:120px;height:9px;border-radius:3px;background:var(--ink);opacity:.85;}
.track{display:flex;flex-direction:column;gap:10px;width:100%;max-width:220px;}
.track__step{display:flex;align-items:center;gap:11px;font-size:.85rem;color:#A9AC9C;}
.track__step i{width:9px;height:9px;border-radius:50%;border:1.5px solid #D8D8CC;flex:none;}
.track__step--done{color:var(--text);}
.track__step--done i{background:var(--accent);border-color:var(--accent);}

/* ── compare ── */
.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:820px;}
.compare__col{padding:26px 28px 24px;}
.compare__label{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.11em;color:var(--muted);margin:0 0 18px;}
.compare__label--on{color:var(--accent);}
.compare__col dl{margin:0;}
.compare__row{display:flex;justify-content:space-between;gap:16px;padding:9px 0;font-size:.95rem;}
.compare__row dt,.compare__row dd{margin:0;}
.compare__row dd{font-variant-numeric:tabular-nums;font-weight:550;}
.compare__total{display:flex;align-items:baseline;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:1px solid var(--line);}
.compare__total span{font-size:.95rem;color:var(--muted);}
.compare__total strong{font-size:1.85rem;font-weight:750;letter-spacing:-.035em;}
.fineprint{font-size:.83rem;color:#9A9D8C;margin:22px 0 0;max-width:60ch;}

/* ── duo panels ── */
.duo{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.panel{overflow:hidden;display:flex;flex-direction:column;}
.panel__head{padding:26px 28px 22px;}
.panel__head .muted{margin:0;font-size:.96rem;}
.panel__art{flex:1;position:relative;background:#FAFAF6;border-top:1px solid var(--line-soft);min-height:286px;padding:30px;overflow:hidden;}
.lbl{position:absolute;background:var(--white);border:1px solid var(--line);border-radius:10px;padding:14px 16px;box-shadow:0 10px 26px -14px rgba(23,25,15,.4);}
.lbl--back{top:26px;left:26px;width:200px;transform:rotate(-6deg);opacity:.55;}
.lbl--front{top:96px;left:120px;width:228px;}
.lbl__from{font-size:.72rem;color:var(--muted);margin:0 0 6px;}
.lbl__brand{font-size:.63rem;font-weight:750;letter-spacing:.14em;color:#fff;background:var(--ink);display:inline-block;padding:3px 9px;border-radius:4px;margin:0 0 9px;}
.lbl__carrier{font-size:1.02rem;font-weight:700;letter-spacing:-.02em;color:var(--ink);margin:0 0 3px;}
.lbl__num{color:var(--muted);margin:0 0 10px;}
.barcode{height:26px;background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 4px,var(--ink) 4px 5px,transparent 5px 9px);opacity:.85;}
.panel__art--qc{display:grid;place-items:center;}
.qc{background:var(--white);border:1px solid var(--line);border-radius:12px;padding:18px 20px;box-shadow:var(--shadow);width:min(100%,272px);}
.qc__title{font-size:.78rem;font-weight:650;color:var(--muted);margin:0 0 13px;}
.qc__grid{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;}
.qc__cell{aspect-ratio:1;display:grid;place-items:center;border-radius:6px;background:var(--accent-soft);color:var(--accent);font-size:.72rem;}
.qc__cell--bad{background:#FBECE5;color:var(--bad);border:1px solid #EBC4B2;}
.qc__flag{font-size:.72rem;color:var(--bad);background:#FBECE5;border-radius:6px;padding:5px 9px;margin:11px 0 0;display:inline-block;}

/* ── capability cards ── */

/* ── faq ── */
.faqwrap{display:grid;grid-template-columns:minmax(0,340px) 1fr;gap:72px;}
.faqwrap__intro .muted{margin:20px 0 22px;font-size:.98rem;}
.faqgroup{margin-bottom:40px;}
.faqgroup:last-child{margin-bottom:0;}
.faqgroup__title{font-size:.95rem;font-weight:700;color:var(--accent);margin:0 0 6px;letter-spacing:-.01em;}
.faq{border-bottom:1px solid var(--line);}
.faq__q{display:flex;gap:14px;align-items:flex-start;width:100%;text-align:left;background:none;border:0;cursor:pointer;
  padding:17px 0;font:inherit;font-size:1rem;font-weight:550;color:var(--ink);letter-spacing:-.012em;}
.faq__sign{color:var(--accent);font-size:1.15rem;line-height:1.3;width:12px;flex:none;}
.faq__a{margin:0 0 20px 26px;color:var(--muted);font-size:.96rem;max-width:64ch;}

/* ── service lanes ── */
.lanes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:44px 0 0;}
.lane{padding:26px 24px 24px;display:flex;flex-direction:column;}
.lane__name{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.13em;color:var(--accent);margin:0 0 14px;}
.lane__lede{font-size:1.05rem;font-weight:650;letter-spacing:-.02em;color:var(--ink);margin:0 0 10px;line-height:1.35;}
.lane__body{font-size:.94rem;color:var(--muted);margin:0 0 18px;}
.lane__facts{list-style:none;margin:auto 0 0;padding:16px 0 0;border-top:1px solid var(--line-soft);display:flex;flex-direction:column;gap:8px;}
.lane__facts li{font-size:.86rem;color:var(--text);display:flex;align-items:flex-start;gap:9px;}
.lane__facts li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);flex:none;margin-top:7px;}

/* ── quote hand-off — a contained box rather than a full-width band ── */
.quote{display:flex;justify-content:center;margin:32px 0 0;}
.quote__box{width:min(100%,560px);text-align:center;padding:44px 40px 38px;border-radius:var(--r-lg);
  background:var(--accent-soft);border-color:var(--accent-line);}
.quote__h{font-size:clamp(1.35rem,2.2vw,1.75rem);font-weight:700;letter-spacing:-.03em;color:var(--ink);margin:0;line-height:1.2;}
.quote__p{color:var(--muted);margin:16px auto 0;max-width:44ch;font-size:.96rem;}
.wabtn{display:inline-flex;align-items:center;gap:10px;margin:26px 0 0;padding:14px 26px;border-radius:11px;
  background:#25D366;color:#fff;font-weight:650;font-size:.98rem;text-decoration:none;
  box-shadow:0 8px 20px -10px rgba(37,211,102,.7);transition:background .18s ease,transform .18s ease;}
.wabtn:hover{background:#1EBE5B;transform:translateY(-1px);}
.wa{width:20px;height:20px;flex:none;}
.quote__note{font-size:.82rem;color:#8E927E;margin:16px 0 0;}

/* ── portal preview ── */
.portal{max-width:1060px;}
.portal__frame{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff;
  box-shadow:0 26px 64px rgba(0,0,0,.10);}
.portal__bar{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--paper);
  border-bottom:1px solid var(--line);}
.portal__dots{display:inline-flex;gap:6px;flex:none;}
.portal__dots i{width:10px;height:10px;border-radius:50%;background:var(--line);}
.portal__url{font-size:.72rem;color:var(--muted);font-family:ui-monospace,Menlo,monospace;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.portal__pop{margin-left:auto;flex:none;font-size:.72rem;font-weight:600;color:var(--accent);text-decoration:none;}
.portal__pop:hover{text-decoration:underline;}
/* Fixed height: the embedded route is a full app shell, so it needs a viewport to lay out in.
   Its own breakpoints (1100/820px) make it collapse sensibly at this width. */
.portal__inner{display:block;width:100%;height:760px;border:0;background:#fff;}
@media (max-width:820px){
  /* Two problems on a phone, both from embedding a live app in a small box:
     1. A scrollable iframe inside a scrolling page traps touch — you drag to
        scroll the page and scroll the dashboard instead. pointer-events:none
        makes it a live picture: the page scrolls normally and the "Open full
        screen" link in the chrome bar is how you actually use it.
     2. It was squeezed into the wrap's padding. Bleeding 20px either side gives
        the dashboard its full 393px on an iPhone instead of 353px. */
  .portal{margin-inline:-20px;}
  .portal__frame{border-radius:10px;}
  .portal__inner{height:560px;pointer-events:none;}
  .portal__pop{pointer-events:auto;}
}
.cta-word{color:var(--accent);font-weight:700;}
.wave{display:inline-block;}
.wave span{display:inline-block;animation:waveLift 4.2s ease-in-out infinite;}
@keyframes waveLift{
  0%,58%,100%{transform:translateY(0);}
  64%{transform:translateY(-4px);}
  70%{transform:translateY(0);}
}
@media (prefers-reduced-motion:reduce){.wave span{animation:none;}}

/* ── nav Ask AI — summons the assistant ── */
.nav__ask{background:none;border:0;cursor:pointer;color:var(--accent);font-weight:700;font-size:.95rem;
  padding:0;display:inline-flex;align-items:center;gap:5px;}
.nav__ask:hover{color:var(--ink);}
.nav__ask--drawer{display:block;width:100%;text-align:left;padding:10px 0;font-size:1.05rem;
  border-bottom:1px solid var(--line-soft);border-radius:0;}

/* ── stacked warehousing cards ──────────────────────────────────────
   Each card is pulled up under the one above so the run reads as one
   continuous block. z-index ascends in the markup so later cards sit on
   top of the card they overlap.
   ──────────────────────────────────────────────────────────────── */
.stack{margin:88px 0 0;padding:56px 34px 90px;border-radius:26px;background:#EFEEE6;border:1px solid var(--line);overflow:visible;}
.stack__lede{font-size:clamp(1.7rem,3vw,2.5rem);font-weight:750;letter-spacing:-.034em;line-height:1.12;
  color:var(--ink);text-align:center;margin:0 auto 46px;}
.stack__lede span{display:block;font-size:.98rem;font-weight:400;letter-spacing:-.005em;color:var(--muted);
  max-width:44ch;margin:18px auto 0;line-height:1.6;}
/* Each card sticks at its own offset, so as you scroll the next one rides up
   and covers the one before it — leaving a 16px sliver of every card already
   stacked. The gap below each card is what gives the cover its travel. */
.stack__card{position:sticky;display:grid;grid-template-columns:1fr 1.05fr;gap:44px;align-items:center;
  padding:46px 46px;border-radius:24px;margin:0 0 30px;
  box-shadow:0 -14px 30px -20px rgba(23,25,15,.34), 0 10px 26px -18px rgba(23,25,15,.16);}
.stack__card:last-child{margin-bottom:0;}
.stack__num{font-size:.8rem;font-weight:700;letter-spacing:.14em;color:var(--accent);margin:0 0 14px;}
.stack__h{font-size:clamp(1.15rem,1.9vw,1.5rem);letter-spacing:-.025em;margin-bottom:12px;}
.stack__text .muted{margin:0;font-size:.96rem;}
.stack__art{min-width:0;}

/* the panels inside those cards */
.wa-art{background:#FAFAF6;border:1px solid var(--line);border-radius:14px;padding:16px 18px;
  display:flex;flex-direction:column;gap:9px;}
.wa-art--weigh{align-items:center;gap:14px;padding:24px 18px;}
.wa-weigh{display:flex;align-items:baseline;gap:6px;}
.wa-weigh__num{font-size:2.1rem;font-weight:750;letter-spacing:-.04em;color:var(--ink);}
.wa-weigh__u{font-size:1rem;color:var(--muted);font-weight:600;}
.wa-photo{display:flex;gap:8px;}
.wa-photo span{width:56px;height:56px;border-radius:8px;overflow:hidden;background:var(--white);
  border:1px solid var(--line);display:block;}
.wa-photo img{width:100%;height:100%;object-fit:cover;display:block;}
.wa-cap{font-size:.78rem;color:var(--muted);margin:0;}

.wa-tbl{width:100%;border-collapse:collapse;font-size:.84rem;}
.wa-tbl th{text-align:right;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
  color:var(--muted);padding:0 0 9px;border-bottom:1px solid var(--line);}
.wa-tbl th:first-child,.wa-tbl td:first-child{text-align:left;}
.wa-tbl td{text-align:right;padding:9px 0;border-bottom:1px solid var(--line-soft);color:var(--text);}
.wa-tbl tr:last-child td{border-bottom:0;}
.wa-tbl b{color:var(--accent);}
.wa-tbl b.low{color:var(--bad);}

.wa-row{display:flex;align-items:center;gap:12px;background:var(--white);border:1px solid var(--line);
  border-radius:10px;padding:10px 13px;font-size:.85rem;}
.wa-row__sku{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.wa-row__m{color:var(--muted);margin-left:auto;font-variant-numeric:tabular-nums;}
.wa-tote{font-weight:700;color:var(--ink);background:var(--accent-soft);border-radius:6px;padding:2px 8px;font-size:.78rem;}
.wa-pill{font-size:.72rem;font-weight:650;padding:3px 10px;border-radius:99px;white-space:nowrap;}
.wa-pill--go{background:var(--accent-soft);color:var(--accent);}
.wa-pill--wait{background:#F3EFE2;color:#8A7A44;}
.wa-pill--bad{background:#FBECE5;color:var(--bad);}
.wa-row--win{border-color:var(--accent-line);background:var(--accent-soft);font-weight:600;color:var(--accent);}

/* ── affiliate band ── */
.aff{text-align:left;padding:96px 0;}
.aff__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,520px);gap:56px;align-items:center;}
.aff__eyebrow{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.13em;color:#9DAD7B;margin:0 0 18px;}
.aff__h{line-height:1.14;}
.aff__sub{color:rgba(255,255,255,.6);max-width:56ch;margin:22px 0 0;}
.aff__cta{display:flex;gap:14px;align-items:center;margin:34px 0 0;flex-wrap:wrap;}
.aff .btn--ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.28);box-shadow:none;}
.aff .btn--ghost:hover{border-color:#fff;color:#fff;}
.aff__client{color:rgba(255,255,255,.55);font-size:.9rem;margin:18px 0 0;}
.aff__client a{color:#fff;font-weight:600;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:2px;display:inline-flex;align-items:center;gap:5px;}
.aff__client a:hover{border-color:#fff;}
.aff__client .arrow{width:15px;height:15px;}
.aff__steps{list-style:none;margin:36px 0 0;padding:28px 0 0;border-top:1px solid rgba(255,255,255,.12);display:grid;gap:18px;}
.aff__steps li{display:flex;gap:14px;align-items:flex-start;}
.aff__steps strong{display:block;color:#fff;font-weight:650;letter-spacing:-.012em;font-size:.98rem;}
.aff__steps p{margin:3px 0 0;color:rgba(255,255,255,.55);font-size:.9rem;line-height:1.5;}
.aff__n{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.25);color:#C9D3AE;font-size:.76rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;margin-top:1px;}
.aff__more{text-align:center;margin:48px 0 0;}
.aff__link{display:inline-flex;align-items:center;gap:7px;color:#fff;font-weight:600;text-decoration:none;
  border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:3px;font-size:.94rem;}
.aff__link:hover{border-color:#fff;}

/* dashboard preview — a still of the real partner dashboard */
.affdash{background:#fff;color:var(--text);border-radius:var(--r-lg);box-shadow:0 30px 60px -30px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08);overflow:hidden;font-size:.84rem;line-height:1.4;}
.affdash__top{display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--line-soft);background:#FAFAF7;}
.affdash__dots{display:inline-flex;gap:5px;}
.affdash__dots i{width:9px;height:9px;border-radius:50%;background:#E3E1D6;display:block;}
.affdash__title{font-weight:650;color:var(--ink);font-size:.82rem;letter-spacing:-.01em;}
.affdash__tag{margin-left:auto;font-size:.66rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:2px 8px;}
.affdash__link{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 14px 0;padding:12px 14px;border:1px solid var(--accent-line);background:var(--accent-soft);border-radius:12px;}
.affdash__label{margin:0;font-size:.7rem;font-weight:600;color:var(--muted);}
.affdash__url{margin:3px 0 0;color:var(--ink);font-size:.82rem;word-break:break-all;}
.affdash__url b{color:var(--accent);}
.affdash__copy{flex:none;background:var(--ink);color:#fff;font-weight:600;font-size:.76rem;padding:7px 11px;border-radius:8px;}
.affdash__kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 14px 0;}
.affdash__kpi{border:1px solid var(--line-soft);border-radius:10px;padding:10px 11px;min-width:0;}
.affdash__value{margin:4px 0 0;font-size:1.15rem;font-weight:700;letter-spacing:-.02em;color:var(--ink);font-variant-numeric:tabular-nums;}
.affdash__sub{margin:3px 0 0;font-size:.68rem;color:var(--muted);line-height:1.35;}
.affdash__row{display:grid;grid-template-columns:1.2fr 1fr;gap:10px;margin:12px 14px 14px;}
.affdash__chart{border:1px solid var(--line-soft);border-radius:10px;padding:11px 12px 10px;}
.affdash__chart-head{display:flex;justify-content:space-between;align-items:baseline;font-size:.72rem;color:var(--muted);}
.affdash__chart-head b{color:var(--ink);font-size:.9rem;font-variant-numeric:tabular-nums;}
.affdash__bars{display:flex;align-items:flex-end;gap:2px;height:84px;margin-top:10px;border-bottom:1px solid var(--line);}
.affdash__bars i{flex:1;background:var(--accent);border-radius:2px 2px 0 0;opacity:.85;display:block;}
.affdash__funnel{list-style:none;margin:0;padding:11px 12px 10px;border:1px solid var(--line-soft);border-radius:10px;display:grid;gap:8px;align-content:start;}
.affdash__frow{display:flex;justify-content:space-between;gap:8px;font-size:.72rem;color:var(--text);}
.affdash__frow b{color:var(--ink);font-variant-numeric:tabular-nums;}
.affdash__frow small{color:var(--muted);font-size:.66rem;}
.affdash__track{height:5px;border-radius:999px;background:var(--line-soft);margin-top:4px;overflow:hidden;}
.affdash__track div{height:100%;border-radius:999px;background:var(--accent);}

/* ── rewards ── */
/* One programme now, but the card keeps the width it had in the 3-up grid so it
   holds the same shape: the wrap is 1084px inside its padding and three cards
   with 18px gaps were (1084-36)/3 = 349px each. */
.rewards{display:grid;grid-template-columns:repeat(2,minmax(0,349px));justify-content:center;gap:18px;}
.reward{padding:28px 26px 30px;display:flex;flex-direction:column;}
.reward__who{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin:0 0 14px;}
.reward__name{font-size:1.1rem;font-weight:650;letter-spacing:-.02em;color:var(--ink);margin:0 0 12px;}
.reward__rate{display:flex;align-items:baseline;gap:9px;margin:0 0 16px;padding:0 0 16px;border-bottom:1px solid var(--line-soft);
  font-size:2.3rem;font-weight:750;letter-spacing:-.04em;color:var(--accent);}
.reward__rate span{font-size:.86rem;font-weight:500;letter-spacing:-.005em;color:var(--muted);}
.reward__body{font-size:.94rem;margin:0;}

/* ── questions asked ── */
.asked{display:grid;grid-template-columns:minmax(0,320px) 1fr;gap:66px;margin:76px 0 0;padding:56px 0 0;border-top:1px solid var(--line);}
.asked__h{font-size:clamp(1.6rem,2.6vw,2.1rem);}
.asked__intro .muted{margin:16px 0 0;font-size:.96rem;}

/* ── closer ── */
.closer{padding:104px 0;}
.closer__sub{color:rgba(255,255,255,.6);max-width:48ch;margin:20px auto 0;}

/* ── footer ── */
.foot{background:var(--white);border-top:1px solid var(--line);padding:64px 0 30px;}
.foot__inner{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;}
.foot__brand .muted{font-size:.92rem;margin:16px 0 0;max-width:34ch;}
.foot__h{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.11em;color:var(--ink);margin:0 0 16px;}
.foot__col a{display:block;color:var(--muted);text-decoration:none;font-size:.93rem;padding:5px 0;}
.foot__col a:hover{color:var(--accent);}
.foot__base{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:52px;padding-top:24px;border-top:1px solid var(--line-soft);}
.foot__base p{margin:0;font-size:.86rem;color:#9A9D8C;}

/* ── responsive ── */
@media (max-width:900px){
  .nav__links,.nav__cta{display:none;}
  .nav__burger{display:flex;}
  .nav__drawer{display:flex;}
  .flow{padding:34px 22px 22px;}
  .flow__track{display:none;}
  .flow__nodes{grid-template-columns:repeat(2,1fr);gap:28px;margin-top:0;}
  /* The travelling vehicle is desktop-only: its SVG path is drawn for the
     4-across layout, so in a 2x2 it would cut across the wrong places. The track
     stays hidden.
     The CHIPS are position-independent though — they just light in turn — and in
     a 2x2 that runs top-left -> top-right -> bottom-left -> bottom-right, which is
     reading order and journey order at once. So the progression survives on a
     phone; only the vehicle is lost. Previously every chip was forced dark, which
     killed the one piece of motion that still worked here.
     prefers-reduced-motion still stops all of it — that block is untouched. */
  .flow .legend,.flow .legend i,.flow .flow__badge{animation:none!important;}
  .flow__badge{transform:scale(1);}
  .legend{color:var(--text);} .legend i{background:var(--accent);}
  /* 3 items in a 2-up grid orphans the last one, so keep them 3 across. */
  .stats{grid-template-columns:repeat(3,1fr);gap:16px;}
  .how{gap:36px;}
  .tl::before,.tl__fill{left:21px;margin-left:0;transform:none;}
  .tl__node{left:22px;margin-left:0;transform:translateX(-50%);}
  .tl__card{margin-left:58px;}
  .tl__node{top:26px;}
  .compare,.duo,.lanes,.rewards{grid-template-columns:1fr;}
  .asked{grid-template-columns:1fr;gap:30px;margin-top:52px;padding-top:40px;}
  .aff{padding:64px 0;}
  .aff__grid{grid-template-columns:1fr;gap:40px;}
  .affdash__kpis{grid-template-columns:repeat(2,1fr);}
  .affdash__row{grid-template-columns:1fr;}
  .stack__card{grid-template-columns:1fr;gap:26px;padding:30px 22px;margin-bottom:22px;border-radius:18px;}
  .stack{margin-top:60px;padding:34px 14px 26px;border-radius:20px;}
  .quote__box{padding:32px 22px 28px;}
  .faqwrap{grid-template-columns:1fr;gap:36px;}
  .foot__inner{grid-template-columns:1fr 1fr;}
  .section{padding:76px 0;}
  .hero{padding-top:64px;}
}
@media (max-width:560px){
  .wrap{padding:0 20px;}
  /* Keep the 2x2 from the 900px breakpoint instead of collapsing to one column.
     Four across is what the laptop shows, but at 393px that is ~90px a column and
     the labels stop being readable; one across made the section four screens tall.
     2x2 keeps the shape of the journey and halves the scroll. The gap tightens so
     each node still gets ~145px at iPhone width:
       393 - 40 (wrap) - 44 (flow padding) - 16 (gap) = 293 / 2 */
  .flow__nodes{grid-template-columns:repeat(2,1fr);gap:22px 16px;}
  .foot__inner{grid-template-columns:1fr;}
}
`;
