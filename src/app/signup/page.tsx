'use client';

/* Prototype Version 2 — Sign Up page.
   Frozen copy for the CSCI 253 usability study. NOTHING here is real:
   the form saves nothing and no account, quote or message is created.

   Changes vs. the baseline (old) sign-up page, from our study:
   • "Get your quote instantly" box + WhatsApp number sits ON the sign-up page,
     so a visitor never has to remember a quote from another page.
   • Two service choices, each with a plain sentence under it (no jargon).
   • One password field (8+ characters) instead of Password + Confirm.
   • Videos moved out of sign-up to a separate Tutorials page.
   • Short "Here's what happens next" notes along the way. */

import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const sans = localFont({ src: '../fonts/PlusJakartaSansVariable.woff2', weight: '200 800', display: 'swap' });

const WA_LINK = `https://wa.me/15592038158?text=${encodeURIComponent("Hi ShipSourced — I'd like a quote on my product.")}`;

type Service = 'dropship' | 'us3pl';

export default function SignupPage() {
  const [service, setService] = useState<Service | null>(null);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwOk = password.length >= 8;
  const formOk = !!service && name.trim() !== '' && emailOk && pwOk;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (formOk) setDone(true); // prototype: nothing is sent anywhere
  }

  if (done) {
    return (
      <main className={`${sans.className} su`}>
        <Styles />
        <Header />
        <section className="card card--done">
          <div className="check" aria-hidden="true">✓</div>
          <h1>Account created</h1>
          <p className="muted">Welcome, {name.split(' ')[0]}. (Prototype — nothing was saved.)</p>
          <div className="next">
            <h3>Here&rsquo;s what happens next</h3>
            <ol>
              <li><b>Choose a plan</b> — see every fee before you pay anything.</li>
              <li><b>Connect your store</b> — Shopify, WooCommerce or TikTok Shop.</li>
              <li><b>Send us your stock</b> — {service === 'dropship' ? 'or let us source it for you in China.' : 'to our warehouse in Clovis, CA.'}</li>
              <li><b>Go live</b> — new orders ship automatically.</li>
            </ol>
          </div>
          <div className="row">
            <Link className="btn btn--solid" href="/">Back to homepage</Link>
            <Link className="btn btn--ghost" href="/tutorials">Watch the tutorials</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`${sans.className} su`}>
      <Styles />
      <Header />
      <section className="card">
        <p className="eyebrow">Sign Up</p>
        <h1>Create your ShipSourced account</h1>
        <p className="muted">Pick a center, drop your number — done. Takes about 2 minutes.</p>

        <div className="quote">
          <h2>Get your quote instantly</h2>
          <p>Message us on WhatsApp and we&rsquo;ll price your product — no call required.</p>
          <a className="wabtn" href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp (559) 203-8158</a>
        </div>

        <form onSubmit={submit} noValidate>
          <h3 className="step">1 · How do you want to fulfill your orders?</h3>
          <div className="choices">
            <button type="button" className={`choice ${service === 'dropship' ? 'is-on' : ''}`} onClick={() => setService('dropship')} aria-pressed={service === 'dropship'}>
              <b>Dropshipping</b>
              <span>We source &amp; ship straight to your customers — no inventory.</span>
            </button>
            <button type="button" className={`choice ${service === 'us3pl' ? 'is-on' : ''}`} onClick={() => setService('us3pl')} aria-pressed={service === 'us3pl'}>
              <b>US 3PL</b>
              <span>Your inventory in our US warehouse — we pick, pack &amp; ship.</span>
            </button>
          </div>
          {tried && !service && <p className="err">Choose one option to continue.</p>}
          {service && (
            <p className="hint">Here&rsquo;s what happens next: after this form you&rsquo;ll choose a plan, then connect your store. You can change this choice later.</p>
          )}

          <h3 className="step">2 · Your details</h3>
          <label>Full name
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Maria Lopez" autoComplete="name" />
          </label>
          {tried && !name.trim() && <p className="err">Enter your name.</p>}

          <label>Business name <em>(optional)</em>
            <input value={business} onChange={e => setBusiness(e.target.value)} placeholder="Glow Botanicals" />
          </label>

          <label>Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourstore.com" autoComplete="email" />
          </label>
          {(tried || email) && !emailOk && <p className="err">Enter an email like you@yourstore.com.</p>}

          <label>Password
            <span className="pw">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPw(v => !v)}>{showPw ? 'Hide' : 'Show'}</button>
            </span>
          </label>
          {password && !pwOk
            ? <p className="err">Use at least 8 characters (you have {password.length}).</p>
            : tried && !pwOk
              ? <p className="err">Choose a password with at least 8 characters.</p>
              : <p className="hint">At least 8 characters.</p>}

          <button type="submit" className="btn btn--solid btn--wide">Create account</button>
          <p className="skip">No quote right now? That&rsquo;s fine — you can skip it and just create your account.</p>
          <p className="muted small">Already have an account? <Link href="/login">Sign in</Link></p>
        </form>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="hd">
      <Link href="/" className="brand"><img src="/logo-icon.png" alt="" /> ShipSourced</Link>
      <nav><Link href="/tutorials">Tutorials</Link><Link href="/login">Sign in</Link></nav>
    </header>
  );
}

function Styles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

const CSS = `
.su{--ink:#17190F;--paper:#F6F5F0;--line:#E6E4D9;--text:#2B2E24;--muted:#6E7261;--accent:#5F6E3E;--accent-soft:#EEF1E4;--accent-line:#D6DCC2;--bad:#B4441F;
  min-height:100vh;background:var(--paper);color:var(--text);padding:0 16px 64px;}
.su *{box-sizing:border-box;}
.hd{max-width:760px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:20px 0;}
.brand{display:flex;align-items:center;gap:8px;font-weight:700;font-size:18px;color:var(--ink);text-decoration:none;}
.brand img{width:24px;height:24px;}
.hd nav{display:flex;gap:20px;}
.hd nav a{color:var(--muted);text-decoration:none;font-weight:500;}
.hd nav a:hover{color:var(--accent);}
.card{max-width:760px;margin:0 auto;background:#fff;border:1px solid var(--line);border-radius:20px;padding:36px;box-shadow:0 1px 2px rgba(23,25,15,.04),0 8px 24px -12px rgba(23,25,15,.10);}
.eyebrow{color:var(--accent);font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;margin:0 0 8px;}
h1{font-size:30px;line-height:1.15;margin:0 0 8px;color:var(--ink);letter-spacing:-.02em;}
.muted{color:var(--muted);margin:0 0 24px;}
.small{font-size:14px;margin:16px 0 0;text-align:center;}
.small a{color:var(--accent);}
.quote{background:#F6F7F1;border:1px solid var(--accent-line);border-radius:16px;padding:22px 24px;margin-bottom:28px;}
.quote h2{margin:0 0 6px;font-size:20px;color:var(--ink);}
.quote p{margin:0 0 14px;color:var(--muted);}
.wabtn{display:inline-block;background:#25D366;color:#fff;font-weight:700;padding:12px 18px;border-radius:10px;text-decoration:none;}
.wabtn:hover{filter:brightness(.95);}
.step{font-size:17px;margin:24px 0 12px;color:var(--ink);}
.choices{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media (max-width:640px){.choices{grid-template-columns:1fr;}.card{padding:24px 18px;}}
.choice{text-align:left;font:inherit;background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:18px;cursor:pointer;display:flex;flex-direction:column;gap:6px;}
.choice b{font-size:17px;color:var(--ink);font-weight:600;}
.choice span{color:var(--muted);font-size:14px;}
.choice:hover{border-color:var(--accent-line);}
.choice.is-on{border-color:var(--accent);background:var(--accent-soft);box-shadow:0 0 0 3px var(--accent-line);}
label{display:block;font-weight:600;font-size:14px;color:var(--ink);margin:14px 0 0;}
label em{font-weight:400;color:var(--muted);font-style:normal;}
input{display:block;width:100%;margin-top:6px;font:inherit;font-weight:400;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--text);}
input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft);}
.pw{display:flex;gap:8px;align-items:center;}
.pw input{flex:1;}
.pw button{margin-top:6px;font:inherit;font-size:14px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:12px 14px;cursor:pointer;}
.err{color:var(--bad);font-size:14px;margin:6px 0 0;}
.hint{color:var(--muted);font-size:14px;margin:6px 0 0;}
.btn{display:inline-flex;justify-content:center;align-items:center;font:inherit;font-weight:600;padding:13px 22px;border-radius:12px;text-decoration:none;cursor:pointer;border:1px solid transparent;}
.btn--solid{background:var(--ink);color:#fff;}
.btn--solid:hover{background:var(--accent);}
.btn--ghost{background:#fff;color:var(--ink);border-color:var(--line);}
.btn--ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn--wide{width:100%;margin-top:28px;font-size:16px;}
.skip{text-align:center;color:var(--muted);font-size:14px;margin:14px 0 0;}
.card--done{text-align:center;}
.check{width:64px;height:64px;border-radius:50%;background:var(--accent);color:#fff;font-size:32px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.next{text-align:left;background:var(--accent-soft);border-radius:14px;padding:18px 22px;margin:8px 0 24px;}
.next h3{margin:0 0 8px;color:var(--ink);}
.next ol{margin:0;padding-left:20px;line-height:1.8;}
.row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
`;
