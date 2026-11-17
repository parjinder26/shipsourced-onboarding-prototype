import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShipSourced Onboarding Prototype (CSCI 253)',
  description: 'Prototype Version 1 (homepage) and Version 2 (sign up) for a CSCI 253 usability study. Not the live site.',
  icons: { icon: '/logo-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
