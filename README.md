# ShipSourced Onboarding Prototype — CSCI 253

Prototype for our CSCI 253 (User Interaction) usability study of ShipSourced's client onboarding.
By Parjinder & Niranjan.

- **Version 1: Homepage** (`/`). Every sign-up button says "Sign Up". The pricing calculator and
  "Lock in this rate" are gone, replaced by one "Get your quote instantly" box with the WhatsApp number.
- **Version 2: Sign Up page** (`/signup`). The quote box stays visible during sign-up, the two service
  choices are explained in plain words, there is one password field (8+ characters) with
  feedback as you type, short "Here's what happens next" notes appear along the way, and the videos
  have moved to a separate **Tutorials** page (`/tutorials`).

This is a frozen standalone copy. **Nothing is real:** the form saves nothing and creates no account.
(The "Software" section embeds ShipSourced's public sample dashboard, so that part needs internet.)

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open **http://localhost:3253** (homepage), or go straight to **http://localhost:3253/signup**.

Built with Next.js 14 and React 18. No Figma was used: the prototype is coded directly.
