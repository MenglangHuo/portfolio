import { BOOK_PAGES, BookPageData } from "./bookData";

export interface ThemeColors {
  paperBg: string;
  pageBorder: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  earth: string;
  accentBg: string;
  gridLine: string;
  boxBg: string;
}

export function getBookThemeColors(isDark: boolean): ThemeColors {
  if (isDark) {
    return {
      paperBg: "#161514",
      pageBorder: "#2e2b27",
      ink: "#f5f0e6",
      inkSoft: "rgba(245, 240, 230, 0.76)",
      inkFaint: "rgba(245, 240, 230, 0.44)",
      earth: "#f59e0b",
      accentBg: "rgba(245, 158, 11, 0.14)",
      gridLine: "rgba(255, 255, 255, 0.04)",
      boxBg: "rgba(32, 30, 28, 0.8)",
    };
  }
  return {
    paperBg: "#faf7f0",
    pageBorder: "#e0d9ca",
    ink: "#23201d",
    inkSoft: "rgba(35, 32, 29, 0.75)",
    inkFaint: "rgba(35, 32, 29, 0.45)",
    earth: "#b45309",
    accentBg: "rgba(180, 83, 9, 0.10)",
    gridLine: "rgba(0, 0, 0, 0.035)",
    boxBg: "rgba(244, 239, 230, 0.85)",
  };
}

function escapeXml(unsafe: string): string {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates an SVG 2-page spread for desktop/tablet (1760 x 1200)
 */
export function generateSpreadSvg(page: BookPageData, isKh: boolean, isDark: boolean): string {
  const c = getBookThemeColors(isDark);
  const category = isKh ? page.categoryKh : page.categoryEn;
  const title = isKh ? page.titleKh : page.titleEn;
  const subtitle = isKh ? page.subtitleKh : page.subtitleEn;
  const badge = `PLATE ${page.number}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1200" width="1760" height="1200">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=JetBrains+Mono:wght@400;500;600;700&amp;family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&amp;display=swap');
      .title { font-family: 'Instrument Serif', Georgia, serif; font-size: 46px; fill: ${c.ink}; font-weight: normal; }
      .mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.14em; fill: ${c.inkFaint}; text-transform: uppercase; }
      .serif-body { font-family: 'Newsreader', Georgia, serif; font-size: 20px; line-height: 1.55; fill: ${c.inkSoft}; }
      .serif-bold { font-family: 'Newsreader', Georgia, serif; font-size: 22px; font-weight: 600; fill: ${c.ink}; }
      .badge-txt { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; fill: ${c.earth}; }
      .tag-txt { font-family: 'JetBrains Mono', monospace; font-size: 13px; fill: ${c.inkSoft}; }
    </style>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
    </pattern>
    <linearGradient id="gutterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.22)" />
      <stop offset="50%" stop-color="rgba(0,0,0,0.02)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.22)" />
    </linearGradient>
  </defs>

  <!-- Left Page Background -->
  <rect x="0" y="0" width="880" height="1200" fill="${c.paperBg}" />
  <rect x="0" y="0" width="880" height="1200" fill="url(#grid)" />
  <rect x="60" y="60" width="760" height="1080" rx="8" fill="none" stroke="${c.pageBorder}" stroke-width="1.6" />
  <rect x="68" y="68" width="744" height="1064" rx="6" fill="none" stroke="${c.pageBorder}" stroke-dasharray="3 4" stroke-width="1" opacity="0.6" />

  <!-- Right Page Background -->
  <rect x="880" y="0" width="880" height="1200" fill="${c.paperBg}" />
  <rect x="880" y="0" width="880" height="1200" fill="url(#grid)" />
  <rect x="940" y="60" width="760" height="1080" rx="8" fill="none" stroke="${c.pageBorder}" stroke-width="1.6" />
  <rect x="948" y="68" width="744" height="1064" rx="6" fill="none" stroke="${c.pageBorder}" stroke-dasharray="3 4" stroke-width="1" opacity="0.6" />

  <!-- Center Gutter Spine & Shadow -->
  <rect x="850" y="0" width="60" height="1200" fill="url(#gutterGrad)" opacity="0.9" />
  <line x1="880" y1="0" x2="880" y2="1200" stroke="${c.pageBorder}" stroke-width="2.5" />
  <line x1="877" y1="0" x2="877" y2="1200" stroke="${c.pageBorder}" stroke-width="0.8" opacity="0.5" />
  <line x1="883" y1="0" x2="883" y2="1200" stroke="${c.pageBorder}" stroke-width="0.8" opacity="0.5" />

  <!-- ==================== LEFT PAGE: EDITORIAL ==================== -->
  <!-- Top Header Metadata -->
  <text x="110" y="130" class="mono">PLATE ${page.number} / 04 · ${escapeXml(category)}</text>
  <text x="770" y="130" text-anchor="end" class="mono">HUO MENGLANG</text>
  <line x1="110" y1="150" x2="770" y2="150" stroke="${c.pageBorder}" stroke-width="1.2" />

  <!-- Badge Ribbon -->
  <rect x="110" y="180" width="130" height="32" rx="16" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1.2" />
  <text x="175" y="201" text-anchor="middle" class="badge-txt">${escapeXml(badge)}</text>

  <!-- Title & Subtitle -->
  <text x="110" y="270" class="title">${escapeXml(title)}</text>
  <text x="110" y="312" class="serif-bold" fill="${c.earth}">${escapeXml(subtitle)}</text>

  <!-- Sections (Headings + Body) -->
  <g transform="translate(110, 350)">
    ${page.sections.map((sec, idx) => {
      const heading = isKh ? sec.headingKh : sec.headingEn;
      const body = isKh ? sec.bodyKh : sec.bodyEn;
      const yOffset = idx * 260;
      return `
      <g transform="translate(0, ${yOffset})">
        <rect x="0" y="0" width="660" height="230" rx="10" fill="${c.boxBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
        <circle cx="32" cy="38" r="8" fill="${c.earth}" />
        <circle cx="32" cy="38" r="14" fill="none" stroke="${c.earth}" stroke-width="1" opacity="0.4" />
        <text x="58" y="44" class="mono" font-weight="600" fill="${c.earth}">${escapeXml(heading)}</text>
        <line x1="28" y1="68" x2="632" y2="68" stroke="${c.pageBorder}" stroke-width="1" opacity="0.7" />
        <foreignObject x="28" y="80" width="604" height="135">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Newsreader',Georgia,serif; font-size:19px; line-height:1.55; color:${c.inkSoft};">
            ${escapeXml(body)}
          </div>
        </foreignObject>
      </g>
      `;
    }).join('')}
  </g>

  <!-- Tags Container -->
  <g transform="translate(110, 960)">
    <text x="0" y="0" class="mono">CORE ATTRIBUTES</text>
    <g transform="translate(0, 16)">
      ${page.tags.slice(0, 5).map((tag, idx) => `
        <g transform="translate(${idx * 132}, 0)">
          <rect x="0" y="0" width="122" height="34" rx="6" fill="${c.boxBg}" stroke="${c.pageBorder}" stroke-width="1" />
          <text x="61" y="22" text-anchor="middle" class="tag-txt">${escapeXml(tag)}</text>
        </g>
      `).join('')}
    </g>
  </g>

  <!-- Page Number Stamp Left -->
  <text x="110" y="1090" class="mono">HUO MENGLANG · SKETCHBOOK</text>
  <text x="770" y="1090" text-anchor="end" class="mono">P. ${page.number}</text>

  <!-- ==================== RIGHT PAGE: TECHNICAL EXHIBIT ==================== -->
  <!-- Top Right Header -->
  <text x="990" y="130" class="mono">TECHNICAL EXHIBIT // SPECIFICATION</text>
  <text x="1650" y="130" text-anchor="end" class="mono">FIG. ${page.number}</text>
  <line x1="990" y1="150" x2="1650" y2="150" stroke="${c.pageBorder}" stroke-width="1.2" />

  <!-- The Visual Diagram / Plate Artifact -->
  <g transform="translate(990, 180)">
    <rect x="0" y="0" width="660" height="840" rx="10" fill="${c.boxBg}" stroke="${c.pageBorder}" stroke-width="1.8" />
    <rect x="12" y="12" width="636" height="816" rx="8" fill="none" stroke="${c.earth}" stroke-width="0.8" opacity="0.35" />

    ${renderIllustration(page.illustrationType, c, isKh)}
  </g>

  <!-- Page Number Stamp Right -->
  <text x="990" y="1090" class="mono">VERIFIED ARCHITECTURE &amp; ATTRIBUTES</text>
  <text x="1650" y="1090" text-anchor="end" class="mono">P. ${String(parseInt(page.number, 10) * 2)}</text>
</svg>
`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an SVG 1-page layout for mobile viewports (880 x 1200)
 */
export function generateSinglePageSvg(page: BookPageData, isKh: boolean, isDark: boolean): string {
  const c = getBookThemeColors(isDark);
  const category = isKh ? page.categoryKh : page.categoryEn;
  const title = isKh ? page.titleKh : page.titleEn;
  const subtitle = isKh ? page.subtitleKh : page.subtitleEn;
  const badge = `PLATE ${page.number}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 1200" width="880" height="1200">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=JetBrains+Mono:wght@400;500;600;700&amp;family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&amp;display=swap');
      .title { font-family: 'Instrument Serif', Georgia, serif; font-size: 46px; fill: ${c.ink}; font-weight: normal; }
      .mono { font-family: 'JetBrains Mono', monospace; font-size: 14px; letter-spacing: 0.12em; fill: ${c.inkFaint}; text-transform: uppercase; }
      .serif-body { font-family: 'Newsreader', Georgia, serif; font-size: 21px; line-height: 1.58; fill: ${c.inkSoft}; }
      .serif-bold { font-family: 'Newsreader', Georgia, serif; font-size: 22px; font-weight: 600; fill: ${c.ink}; }
      .badge-txt { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; fill: ${c.earth}; }
      .tag-txt { font-family: 'JetBrains Mono', monospace; font-size: 13px; fill: ${c.inkSoft}; }
    </style>
    <pattern id="gridMobile" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${c.gridLine}" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Page Background -->
  <rect x="0" y="0" width="880" height="1200" fill="${c.paperBg}" />
  <rect x="0" y="0" width="880" height="1200" fill="url(#gridMobile)" />
  <rect x="40" y="40" width="800" height="1120" rx="10" fill="none" stroke="${c.pageBorder}" stroke-width="1.8" />
  <rect x="48" y="48" width="784" height="1104" rx="8" fill="none" stroke="${c.pageBorder}" stroke-dasharray="3 4" stroke-width="1" opacity="0.6" />

  <!-- Top Header Metadata -->
  <text x="80" y="105" class="mono">PLATE ${page.number} / 04 · ${escapeXml(category)}</text>
  <text x="800" y="105" text-anchor="end" class="mono">HUO MENGLANG</text>
  <line x1="80" y1="125" x2="800" y2="125" stroke="${c.pageBorder}" stroke-width="1.2" />

  <!-- Badge Ribbon -->
  <rect x="80" y="150" width="130" height="32" rx="16" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1.2" />
  <text x="145" y="171" text-anchor="middle" class="badge-txt">${escapeXml(badge)}</text>

  <!-- Title & Subtitle -->
  <text x="80" y="235" class="title">${escapeXml(title)}</text>
  <text x="80" y="275" class="serif-bold" fill="${c.earth}">${escapeXml(subtitle)}</text>

  <!-- Sections (Headings + Body) -->
  <g transform="translate(80, 310)">
    ${page.sections.map((sec, idx) => {
      const heading = isKh ? sec.headingKh : sec.headingEn;
      const body = isKh ? sec.bodyKh : sec.bodyEn;
      const yOffset = idx * (page.sections.length > 2 ? 210 : 280);
      const boxHeight = page.sections.length > 2 ? 195 : 255;
      return `
      <g transform="translate(0, ${yOffset})">
        <rect x="0" y="0" width="720" height="${boxHeight}" rx="10" fill="${c.boxBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
        <circle cx="32" cy="35" r="8" fill="${c.earth}" />
        <circle cx="32" cy="35" r="14" fill="none" stroke="${c.earth}" stroke-width="1" opacity="0.4" />
        <text x="58" y="41" class="mono" font-weight="600" fill="${c.earth}">${escapeXml(heading)}</text>
        <line x1="28" y1="62" x2="692" y2="62" stroke="${c.pageBorder}" stroke-width="1" opacity="0.7" />
        <foreignObject x="28" y="74" width="664" height="${boxHeight - 85}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Newsreader',Georgia,serif; font-size:20px; line-height:1.55; color:${c.inkSoft};">
            ${escapeXml(body)}
          </div>
        </foreignObject>
      </g>
      `;
    }).join('')}
  </g>

  <!-- Tags Container -->
  <g transform="translate(80, 970)">
    <text x="0" y="0" class="mono">CORE ATTRIBUTES</text>
    <g transform="translate(0, 16)">
      ${page.tags.slice(0, 5).map((tag, idx) => `
        <g transform="translate(${idx * 144}, 0)">
          <rect x="0" y="0" width="134" height="36" rx="6" fill="${c.boxBg}" stroke="${c.pageBorder}" stroke-width="1" />
          <text x="67" y="23" text-anchor="middle" class="tag-txt">${escapeXml(tag)}</text>
        </g>
      `).join('')}
    </g>
  </g>

  <!-- Page Number Stamp Left -->
  <text x="80" y="1100" class="mono">HUO MENGLANG · SKETCHBOOK</text>
  <text x="800" y="1100" text-anchor="end" class="mono">P. ${page.number} OF 04</text>
</svg>
`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function renderIllustration(type: BookPageData['illustrationType'], c: ThemeColors, isKh: boolean): string {
  switch (type) {
    case 'engineering':
      return `
        <!-- Microservices & Core Banking Engine Diagram -->
        <g transform="translate(40, 50)">
          <text x="290" y="30" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="${c.earth}">ENTERPRISE DISTRIBUTED CORE BLUEPRINT</text>

          <!-- Client / Channel Tier -->
          <rect x="40" y="60" width="500" height="90" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.5" />
          <text x="60" y="94" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">01 // INTERFACE &amp; CLIENT CHANNELS</text>
          <text x="60" y="124" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">Next.js SSR · Responsive Modern Web · REST Client</text>

          <!-- Arrow -->
          <line x1="290" y1="150" x2="290" y2="195" stroke="${c.earth}" stroke-width="2" stroke-dasharray="4 4" />
          <polygon points="290,203 284,191 296,191" fill="${c.earth}" />

          <!-- High-Performance Microservices Engine -->
          <rect x="40" y="205" width="500" height="135" rx="8" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="2" />
          <text x="60" y="240" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">02 // HIGH-PERFORMANCE MICROSERVICES (SPRING BOOT)</text>
          <text x="60" y="275" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">Stateless REST APIs · Resilient Circuit Breakers · JWT Auth</text>
          <text x="60" y="308" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">Sub-millisecond Internal RPC · Transaction Auditing</text>

          <!-- Arrow -->
          <line x1="290" y1="340" x2="290" y2="385" stroke="${c.earth}" stroke-width="2" stroke-dasharray="4 4" />
          <polygon points="290,393 284,381 296,381" fill="${c.earth}" />

          <!-- System Architecture / ACID Database Layer -->
          <rect x="40" y="395" width="500" height="110" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.5" />
          <text x="60" y="430" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">03 // TRANSACTIONAL PERSISTENCE &amp; CACHE</text>
          <text x="60" y="465" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">PostgreSQL ACID Ledger · Redis In-Memory State</text>

          <!-- Storage Badges -->
          <g transform="translate(40, 535)">
            <rect x="0" y="0" width="235" height="80" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
            <text x="117" y="35" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="${c.ink}">PostgreSQL</text>
            <text x="117" y="60" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-size="15" fill="${c.inkSoft}">Strict Data Integrity</text>

            <rect x="265" y="0" width="235" height="80" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
            <text x="382" y="35" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="${c.ink}">Redis Cache</text>
            <text x="382" y="60" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-size="15" fill="${c.inkSoft}">High-Speed Session</text>
          </g>

          <!-- Signature Seal -->
          <g transform="translate(100, 650)">
            <line x1="0" y1="0" x2="380" y2="0" stroke="${c.pageBorder}" stroke-width="1" />
            <text x="190" y="40" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="24" font-style="italic" fill="${c.inkSoft}">
              "Resilient engineering, scalable foundation"
            </text>
            <text x="190" y="68" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="${c.inkFaint}">
              VERIFIED ARCHITECTURAL SPECIFICATION
            </text>
          </g>
        </g>
      `;

    case 'cloud':
      return `
        <!-- Infrastructure, Cloud & Automated DevOps Pipeline -->
        <g transform="translate(40, 50)">
          <text x="290" y="30" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="${c.earth}">CLOUD CLUSTER &amp; DEVOPS RUNTIME</text>

          <g transform="translate(20, 65)">
            <!-- Box 1: Container Orchestration -->
            <rect x="0" y="0" width="540" height="115" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
            <text x="24" y="35" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">01 / CONTAINERIZATION &amp; ORCHESTRATION</text>
            <text x="24" y="68" font-family="'Newsreader', Georgia, serif" font-size="19" font-weight="600" fill="${c.ink}">Docker Containers &amp; Kubernetes Clusters</text>
            <text x="24" y="96" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">Pod Scheduling · Auto-healing · Ingress Routing</text>

            <!-- Box 2: Cloud Infrastructure -->
            <rect x="0" y="135" width="540" height="115" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
            <text x="24" y="170" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">02 / AWS CLOUD INFRASTRUCTURE</text>
            <text x="24" y="203" font-family="'Newsreader', Georgia, serif" font-size="19" font-weight="600" fill="${c.ink}">Amazon EC2 · EKS · S3 · RDS Deployments</text>
            <text x="24" y="231" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">VPC Isolation · IAM Security Policies · High Availability</text>

            <!-- Box 3: Automated CI/CD -->
            <rect x="0" y="270" width="540" height="115" rx="8" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1.5" />
            <text x="24" y="305" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">03 / MODERN DEVOPS AUTOMATION</text>
            <text x="24" y="338" font-family="'Newsreader', Georgia, serif" font-size="19" font-weight="600" fill="${c.ink}">Automated Build, Test &amp; Zero-Downtime Deploy</text>
            <text x="24" y="366" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">GitHub Actions · Webhooks · Blue-Green Rollouts</text>

            <!-- Box 4: Big Data & AI -->
            <rect x="0" y="405" width="540" height="115" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />
            <text x="24" y="440" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">04 / BIG DATA &amp; AI WORKFLOW INTEGRATION</text>
            <text x="24" y="473" font-family="'Newsreader', Georgia, serif" font-size="19" font-weight="600" fill="${c.ink}">Distributed Pipelines &amp; Autonomous Agents</text>
            <text x="24" y="501" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">Modern LLM Embeddings · Stream Processing · Analytics</text>

            <!-- Collaboration Stamp -->
            <rect x="0" y="540" width="540" height="85" rx="8" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1" />
            <text x="270" y="575" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">
              AUTONOMOUS PROBLEM-SOLVER &amp; COLLABORATIVE CONTRIBUTOR
            </text>
            <text x="270" y="605" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-size="16" fill="${c.inkSoft}">
              Driving cross-functional execution from conception to production
            </text>
          </g>
        </g>
      `;

    case 'vitality':
      return `
        <!-- Karate-Do & Mindfulness Art Piece -->
        <g transform="translate(60, 50)">
          <!-- Circular Zen Enso Circle & Karate Symbol -->
          <circle cx="270" cy="120" r="85" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="2.5" stroke-dasharray="12 6" />
          <circle cx="270" cy="120" r="72" fill="none" stroke="${c.pageBorder}" stroke-width="1.5" />
          
          <!-- Martial Arts Emblem -->
          <path d="M 270 55 C 230 55, 230 185, 270 185 C 310 185, 310 55, 270 55 Z" fill="none" stroke="${c.earth}" stroke-width="2" />
          <circle cx="270" cy="90" r="10" fill="${c.earth}" />
          <circle cx="270" cy="150" r="10" fill="${c.earth}" />

          <text x="270" y="235" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="34" fill="${c.ink}">Karate-Do &amp; Mindfulness</text>
          <text x="270" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.1em" fill="${c.inkSoft}">DISCIPLINE · MENTAL CLARITY · VITALITY</text>

          <!-- Core Pillars -->
          <g transform="translate(10, 300)">
            <rect x="0" y="0" width="520" height="350" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />

            <g transform="translate(25, 45)">
              <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">01. EARLY MORNING CONTEMPLATION</text>
              <text x="0" y="28" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">Reading &amp; Mindful Reflection</text>
              <text x="0" y="56" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">Starting each day with centered focus, gratitude, and vision</text>
            </g>

            <line x1="25" y1="125" x2="495" y2="125" stroke="${c.pageBorder}" stroke-width="1" />

            <g transform="translate(25, 160)">
              <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">02. PHYSICAL &amp; MENTAL RESILIENCE</text>
              <text x="0" y="28" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">Karate-Do Practice</text>
              <text x="0" y="56" font-family="'JetBrains Mono', monospace" font-size="13" fill="${c.inkSoft}">Physical endurance, precision, humility, and steady consistency</text>
            </g>

            <line x1="25" y1="240" x2="495" y2="240" stroke="${c.pageBorder}" stroke-width="1" />

            <g transform="translate(25, 275)">
              <rect x="0" y="0" width="470" height="45" rx="6" fill="${c.accentBg}" />
              <text x="235" y="28" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">
                INNER HARMONY FOSTERS HIGH-LEVEL CRAFTSMANSHIP
              </text>
            </g>
          </g>
        </g>
      `;

    case 'philosophy':
    default:
      return `
        <!-- Community & Philosophy Emblem -->
        <g transform="translate(60, 50)">
          <!-- Lotus / Giving Hands Emblem -->
          <circle cx="270" cy="110" r="75" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="2" />
          <path d="M 230 130 C 250 80, 290 80, 310 130 C 285 145, 255 145, 230 130 Z" fill="none" stroke="${c.earth}" stroke-width="2" />
          <circle cx="270" cy="95" r="8" fill="${c.earth}" />

          <text x="270" y="220" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="36" fill="${c.ink}">Purpose &amp; Giving</text>
          <text x="270" y="250" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.1em" fill="${c.inkSoft}">COMMUNITY · CONNECTION · UNCONDITIONAL SUPPORT</text>

          <!-- Framed Philosophy Scroll -->
          <g transform="translate(10, 280)">
            <rect x="0" y="0" width="520" height="380" rx="8" fill="${c.paperBg}" stroke="${c.pageBorder}" stroke-width="1.2" />

            <text x="25" y="45" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">WEEKEND INTENTIONAL CONNECTIONS</text>
            <text x="25" y="75" font-family="'Newsreader', Georgia, serif" font-size="18" fill="${c.ink}">Meaningful dialogue on life, technology, and mutual growth</text>

            <line x1="25" y1="105" x2="495" y2="105" stroke="${c.pageBorder}" stroke-width="1" />

            <text x="25" y="145" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="${c.earth}">CORE LIFE PHILOSOPHY</text>
            
            <g transform="translate(25, 170)">
              <rect x="0" y="0" width="470" height="110" rx="8" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1.2" />
              <foreignObject x="20" y="15" width="430" height="85">
                <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Instrument Serif',Georgia,serif; font-size:24px; font-style:italic; line-height:1.45; text-align:center; color:${c.ink};">
                  "I believe genuine fulfillment comes from giving without expecting returns, quietly supporting the happiness of those around me."
                </div>
              </foreignObject>
            </g>

            <!-- Seal & Signature -->
            <g transform="translate(25, 310)">
              <circle cx="45" cy="30" r="24" fill="${c.accentBg}" stroke="${c.earth}" stroke-width="1.5" />
              <text x="45" y="35" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="${c.earth}">真</text>
              <text x="85" y="26" font-family="'Newsreader', Georgia, serif" font-size="20" font-weight="600" fill="${c.ink}">Huo Menglang</text>
              <text x="85" y="48" font-family="'JetBrains Mono', monospace" font-size="12" fill="${c.inkFaint}">PHNOM PENH, CAMBODIA · VERIFIED 2026</text>
            </g>
          </g>
        </g>
      `;
  }
}
