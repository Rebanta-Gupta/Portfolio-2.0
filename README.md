# Rebanta Gupta — Portfolio

Modern, interactive portfolio built with **React + Vite + TypeScript + TailwindCSS v4**.

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## EmailJS Contact Form Setup (5 minutes)

The contact form uses [EmailJS](https://www.emailjs.com) — no server required.

1. Sign up at https://www.emailjs.com (free tier is enough)
2. **Add a Service:** Connect your Gmail account → copy the **Service ID**
3. **Create a Template:** Use these exact variable names in the template body:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — message body
   - Copy the **Template ID**
4. Go to **Account → API Keys** → copy your **Public Key**
5. Open `src/components/sections/Contact.tsx` and replace the three placeholders at the top:

```ts
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

All messages will be delivered to `guptarebanta816@gmail.com` (set in your EmailJS template).

---

## Resume / CV Download

To enable the CV download button:

1. Drop your PDF into `/public/` — e.g. `resume.pdf`
2. Open `src/content/portfolioData.ts`
3. Confirm these two lines match your file:

```ts
resumeEnabled: true,   // ← set to false to hide the button everywhere
resumePath: 'resume.pdf',
```

To **disable** the button entirely, set `resumeEnabled: false`. No component edits needed.

---

## Deploy to Vercel

```bash
# One-time setup
npm install -g vercel
vercel login
vercel

# Every subsequent deploy on git push (after linking repo):
# Settings → Git → connect your GitHub repo → auto-deploys on push
```

`vercel.json` is already configured to handle SPA routing correctly.

---

## Updating Content

All content lives in one file: **`src/content/portfolioData.ts`**

- Add/remove projects by editing the `projects` array
- Filter categories: `'software' | 'hardware' | 'games' | 'hackathon'`
- Add a new skill: find the right group in `skills` and append to `items`
- Change hero taglines: edit the `taglines` array (typewriter cycles through them)

---

## Swapping the 3D Particle Field

The particle component is at `src/components/effects/ParticleField.tsx`.

To replace it with anything else (e.g. a different Three.js scene):
1. Edit or replace `ParticleField.tsx`
2. The component accepts `count?: number` and `className?: string`
3. It is used in `Hero.tsx` — drop your replacement in the same slot

To disable it entirely, delete the `<ParticleField />` line in `src/components/sections/Hero.tsx`.

---

## Easter Egg

Type the **Konami Code** on any page:

```
↑ ↑ ↓ ↓ ← → ← → B A
```

An amber lab-mode overlay fires for 3.5 seconds and a message prints to the browser console.

---

## Theme

The site defaults to **system preference** (dark/light). The toggle in the navbar persists the choice to `localStorage`.

CSS variables for both themes are in `src/styles/style.css` under `:root` (dark) and `[data-theme="light"]`.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.7 |
| Styling | TailwindCSS v4 |
| 3D / Particles | Three.js |
| Animation | GSAP |
| Routing | React Router v7 |
| Contact | EmailJS |
| Icons | Lucide React |
| Deploy | Vercel |

---

## Build for Production

```bash
npm run build
# Output → /dist
```