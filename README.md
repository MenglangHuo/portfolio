# Huo Menglang - Personal Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.3.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://www.menglanghuo.online)

Modern, high-performance personal portfolio website built with **Next.js 15 (App Router & Turbopack)**, **React 19**, **Tailwind CSS**, and **Framer Motion**. Features bilingual localization (English & Khmer), interactive 3D sketchbook & journal, protected photo gallery with slideshow theater, ambient background audio, and complete SEO with JSON-LD schema.

* **Live Website**: [https://www.menglanghuo.online](https://www.menglanghuo.online)
* **GitHub Repository**: [https://github.com/MenglangHuo/portfolio](https://github.com/MenglangHuo/portfolio)

---

## 🌟 Key Features

* **Bilingual Support (i18n)**: Seamless English (`/en`) and Khmer (`/kh`) localization powered by `next-intl`.
* **Artisan Visual Scrapbook**: 23-moment curated photography gallery with lightbox theater, Ken Burns subtle motion, zoom controls, and slideshow engine.
* **3D Sketchbook & Journal**: Tactile real paper book component with realistic 3D page flip interactions.
* **Ambient Sound Experience**: Background audio player with mastered volume levels and auto-play prevention.
* **Complete Search Engine Optimization (SEO)**:
  * Dynamic `sitemap.xml` with multilingual `hreflang` alternates (`/en`, `/kh`).
  * Dynamic `robots.txt` crawler directives.
  * Schema.org `Person`, `WebSite`, and `ProfilePage` JSON-LD structured data for Google Knowledge Graph.
  * Targeted keywords: `menglang`, `lang`, `mrlang`, `huomenglang`, `menglanghuo`.
* **Vercel Analytics & Speed Insights**: Real-time Core Web Vitals and visitor metrics tracking.

---

## 📋 Prerequisites

Before starting, ensure your local development environment has:

* **Node.js**: `v18.18.0` or `>= v20.x.x` (LTS recommended)
  * Verify: `node -v`
* **npm**: `v9.x` or `>= v10.x` (or `pnpm` / `yarn`)
  * Verify: `npm -v`
* **Git**: Installed and configured with your GitHub account
  * Verify: `git --version`
* A **[GitHub](https://github.com/)** account
* A **[Vercel](https://vercel.com/)** account

---

## 🚀 Step 1: Local Setup & Installation

### 1. Clone the Repository
Clone the project from GitHub to your local machine:

```bash
git clone https://github.com/MenglangHuo/portfolio.git
cd portfolio
```

*(If your project is cloned inside a subfolder, navigate directly into the folder containing `package.json`).*

### 2. Install Dependencies
Install all required packages:

```bash
npm install
```

### 3. Run the Development Server
Start the local development server with Next.js Turbopack:

```bash
npm run dev
```

By default, the application runs on:
* **Local**: [http://localhost:3000](http://localhost:3000) (or `http://localhost:4001` if specified with `-p 4001`)
* Open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/kh](http://localhost:3000/kh) in your browser.

---

## 🧪 Step 2: Test Production Build Locally

Before deploying, always verify that the production build compiles without errors:

```bash
# 1. Type-check TypeScript code
npx tsc --noEmit

# 2. Build production bundle
npm run build

# 3. Start local production server
npm run start
```

If the build outputs `✓ Compiled successfully` and generates static routes (including `/sitemap.xml` and `/robots.txt`), your project is ready for deployment.

---

## 📤 Step 3: Push Your Code to GitHub

Make sure all your latest changes are committed and pushed to GitHub:

```bash
# Check changed files
git status

# Stage all changes
git add .

# Commit your changes
git commit -m "feat: complete portfolio enhancements and SEO setup"

# Push to your main branch
git push origin main
```

---

## ☁️ Step 4: Deploy to Vercel (Step-by-Step Guide)

### Method A: Deploy via Vercel Dashboard (Recommended)

1. **Log in to Vercel**:
   * Go to [https://vercel.com](https://vercel.com) and log in using your GitHub account.

2. **Add a New Project**:
   * On your Vercel Dashboard, click the **"Add New..."** button (top right) and select **"Project"**.

3. **Import GitHub Repository**:
   * Under **"Import Git Repository"**, find `MenglangHuo/portfolio`.
   * Click **"Import"**.

4. **Configure Project Settings**:
   * **Project Name**: `portfolio` (or your preferred name).
   * **Framework Preset**: `Next.js` *(automatically detected)*.
   * **Root Directory**: `./` *(leave default as root)*.
   * **Build and Output Settings**:
     * **Build Command**: `next build` *(default)*
     * **Output Directory**: `.next` *(default)*
     * **Install Command**: `npm install` *(default)*
   * **Environment Variables**: None required by default.

5. **Deploy**:
   * Click the blue **"Deploy"** button.
   * Vercel will clone your repository, install dependencies, run `npm run build`, and deploy your application.
   * In ~1 to 2 minutes, you will see the **"Congratulations!"** screen with a live `.vercel.app` preview URL.

---

### Method B: Deploy via Vercel CLI (Alternative)

If you prefer using the terminal:

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Preview**:
   ```bash
   vercel
   ```
   Follow the interactive prompts (select your team and project settings).

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🌐 Step 5: Setup Your Custom Domain (`www.menglanghuo.online`)

To link your custom domain to Vercel:

### 1. Add Domain in Vercel
1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Settings** (top navigation bar) -> **Domains** (left sidebar).
3. Type `www.menglanghuo.online` into the input field and click **Add**.
4. Vercel will recommend adding both:
   * `www.menglanghuo.online`
   * `menglanghuo.online` (with redirect to `www.menglanghuo.online`)
   Select this recommended option.

### 2. Configure DNS Records with Your Domain Registrar
Log in to your domain registrar (e.g. Namecheap, GoDaddy, Hostinger, Cloudflare) and open the **DNS Management / Advanced DNS** page:

| Type | Name / Host | Target / Value | TTL | Note |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic / 60m | Points root domain to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 60m | Points www subdomain to Vercel |

### 3. Verify DNS & SSL
* Return to the **Domains** page in Vercel and click **Refresh**.
* Once the DNS propagates (usually 1–15 minutes), Vercel will automatically issue a free **SSL certificate** (HTTPS).
* Both `https://www.menglanghuo.online` and `https://menglanghuo.online` will now be live!

---

## 📊 Step 6: Enable Vercel Web Analytics & Speed Insights

The code already includes `@vercel/analytics/next` and `@vercel/speed-insights/next` in the root layout. To view live metrics:

1. Open your project on [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on the **Analytics** tab -> Click **"Enable Web Analytics"** (Free on Hobby tier).
3. Click on the **Speed Insights** tab -> Click **"Enable Speed Insights"**.
4. Real-time visitor counts, top pages (`/en`, `/kh`), devices, countries, and Core Web Vitals (LCP, FID, CLS) will now be tracked automatically!

---

## 📂 Project Structure

```text
personal-portfolio-app/
├── public/                     # Static public assets
│   ├── assets/
│   │   ├── audio/              # Ambient background sound (sound-background.mp3)
│   │   └── images/             # Gallery photography and portfolio avatar
│   ├── favicons/               # App icons and browser favicons
│   └── manifest.json           # Progressive Web App (PWA) manifest
├── src/
│   ├── app/
│   │   ├── [locale]/           # Dynamic localized routing (en, kh)
│   │   │   ├── (main)/         # Main pages (about, skills, experience, education)
│   │   │   ├── layout.tsx      # Root layout with SEO, JSON-LD, fonts, Analytics
│   │   │   └── globals.css     # Global styles & luxury aesthetic classes
│   │   ├── sitemap.ts          # Automatic sitemap.xml generator
│   │   ├── robots.ts           # Automatic robots.txt crawler directives
│   │   └── icon.tsx            # Dynamic Next.js Lotus icon generator
│   ├── components/
│   │   ├── common/             # PhotoGallery, BackgroundAudio, etc.
│   │   ├── icons/              # Custom SVGs (LotusIcon, etc.)
│   │   ├── partials/           # Header, Nav, LangSwitcher, Buttons
│   │   ├── sketchbook/         # RealPaperBook 3D interactive component
│   │   └── ui/                 # Accessible Radix UI components (Dialog, Button)
│   ├── data/                   # JSON content databases (en/ & kh/)
│   ├── i18n/                   # next-intl configuration & routing
│   └── shared/                 # Navigation links, constants, TypeScript types
├── next.config.ts              # Next.js configuration (turbopack, images, i18n)
├── tailwind.config.ts          # Tailwind CSS palette & antique typography
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack |
| `npm run build` | Compiles and optimizes the application for production |
| `npm run start` | Runs the compiled production server locally |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |
| `npx tsc --noEmit` | Runs TypeScript compiler to verify all types |

---

## 🔄 Automatic Continuous Deployment (CI/CD)

Whenever you push new commits to your GitHub repository's `main` branch:
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```
Vercel will **automatically trigger a new production build** and deploy the updates to [https://www.menglanghuo.online](https://www.menglanghuo.online) with zero downtime!

---

## 👤 Author

* **Name**: Huo Menglang (Menglang Huo / MrLang)
* **Website**: [https://www.menglanghuo.online](https://www.menglanghuo.online)
* **GitHub**: [@MenglangHuo](https://github.com/MenglangHuo)
* **LinkedIn**: [Huo Menglang](https://www.linkedin.com/in/menglang-huo-651741284)
* **Telegram**: [@Menglang_HUO](https://t.me/Menglang_HUO)
* **Email**: [huomenglang@gmail.com](mailto:huomenglang@gmail.com)

---

## 📄 License

This project is personal intellectual property. All rights reserved.
