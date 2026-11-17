import Link from 'next/link';

/* Prototype: the onboarding videos were moved OUT of sign-up to this page,
   because two baseline participants had trouble hearing them mid-task. */

const videos = [
  { t: 'What ShipSourced does for your store', d: '2 min · how orders flow from your store to our warehouse to your customer' },
  { t: 'Connecting Shopify', d: '3 min · approve the app and your orders start syncing' },
  { t: 'Sending your first stock', d: '4 min · packing, labelling and booking an inbound shipment' },
];

export default function Tutorials() {
  return (
    <main style={{ minHeight: '100vh', background: '#F6F5F0', color: '#2B2E24', padding: '24px 16px 64px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Link href="/" style={{ color: '#5F6E3E', textDecoration: 'none', fontWeight: 600 }}>← ShipSourced</Link>
        <h1 style={{ fontSize: 32, margin: '20px 0 6px', color: '#17190F' }}>Tutorials</h1>
        <p style={{ color: '#6E7261', marginTop: 0 }}>Watch these any time, with captions. You don&rsquo;t need them to sign up.</p>
        {videos.map(v => (
          <div key={v.t} style={{ background: '#fff', border: '1px solid #E6E4D9', borderRadius: 16, padding: 20, marginTop: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div aria-hidden="true" style={{ width: 120, height: 68, borderRadius: 10, background: '#17190F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>▶</div>
            <div>
              <b style={{ color: '#17190F' }}>{v.t}</b>
              <div style={{ color: '#6E7261', fontSize: 14, marginTop: 4 }}>{v.d} · CC</div>
            </div>
          </div>
        ))}
        <p style={{ color: '#6E7261', fontSize: 13, marginTop: 24 }}>Prototype: video placeholders only.</p>
        <Link href="/signup" style={{ display: 'inline-block', marginTop: 8, background: '#17190F', color: '#fff', padding: '12px 20px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
      </div>
    </main>
  );
}
