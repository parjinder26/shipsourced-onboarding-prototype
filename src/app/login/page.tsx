import Link from 'next/link';

export default function Login() {
  return (
    <main style={{ minHeight: '100vh', background: '#F6F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#fff', border: '1px solid #E6E4D9', borderRadius: 20, padding: 32, maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 8px', color: '#17190F' }}>Sign in</h1>
        <p style={{ color: '#6E7261' }}>Sign-in is not part of this prototype.</p>
        <Link href="/signup" style={{ color: '#5F6E3E', fontWeight: 600 }}>New here? Sign Up</Link>
        <br /><br />
        <Link href="/" style={{ color: '#6E7261' }}>← Back to homepage</Link>
      </div>
    </main>
  );
}
