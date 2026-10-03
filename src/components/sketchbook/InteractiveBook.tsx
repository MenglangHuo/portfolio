"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, BookOpen, Layers } from "lucide-react";
import { useTheme } from "next-themes";
import { BOOK_PAGES } from "./bookData";
import { generateSpreadSvg, generateSinglePageSvg } from "./bookRenderer";

interface InteractiveBookProps {
  locale?: string;
}

export default function InteractiveBook({ locale = "en" }: InteractiveBookProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isKh = locale === "kh";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  // References for desktop 3D system
  const stageRef = useRef<HTMLDivElement>(null);
  const sb3dRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const zoomWrapRef = useRef<HTMLDivElement>(null);
  const zoomInnerRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);

  // State refs for animation loops without React re-render lag
  const stateRef = useRef({
    idx: 0,
    turn: null as { dir: "next" | "prev"; from: number; to: number; t: number } | null,
    strips: [] as HTMLDivElement[],
    spreadUrls: [] as string[],
    singleUrls: [] as string[],
    view: { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 },
    viewActive: false,
    lastZ: 1,
    drag: null as { dir: "next" | "prev"; x0: number; w: number; moved: number; vel: number; tPrev: number } | null,
    spring: null as any,
    raf: null as number | null,
    lastTime: 0,
    loupeOn: false,
    lx: null as number | null,
    ly: null as number | null,
    lgrab: null as { cx: number; cy: number; lx0: number; ly0: number } | null,
    lTarget: null as { x: number; y: number } | null,
  });

  const N = 18;
  const SPAN = 0.449;
  const BETA = 0.60;
  const TILT_X = 4.2;
  const TILT_Y = 6.5;
  const ZOOM_MIN = 0.9;
  const ZOOM_MAX = 1.45;
  const MAG = 2.1;
  const totalPages = BOOK_PAGES.length;

  // Responsive screen detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate SVG data URLs on language or theme change
  useEffect(() => {
    stateRef.current.spreadUrls = BOOK_PAGES.map((p) => generateSpreadSvg(p, isKh, isDark));
    stateRef.current.singleUrls = BOOK_PAGES.map((p) => generateSinglePageSvg(p, isKh, isDark));
    if (!isMobile) {
      paint();
    }
  }, [isKh, isDark, isMobile]);

  // Keep stateRef in sync with index
  useEffect(() => {
    stateRef.current.idx = currentIndex;
  }, [currentIndex]);

  const kick = useCallback(() => {
    if (stateRef.current.raf === null) {
      stateRef.current.lastTime = performance.now();
      stateRef.current.raf = requestAnimationFrame(tick);
    }
  }, []);

  const applyView = useCallback(() => {
    const sb3d = sb3dRef.current;
    if (!sb3d) return;
    const { view, lastZ } = stateRef.current;
    sb3d.style.setProperty("--rx", `${view.rx.toFixed(2)}deg`);
    sb3d.style.setProperty("--ry", `${view.ry.toFixed(2)}deg`);
    sb3d.style.setProperty("--zoom", view.z.toFixed(3));
    if (view.z !== lastZ) {
      stateRef.current.lastZ = view.z;
      placeLoupe();
    }
  }, []);

  const setView = useCallback((rx: number, ry: number, z: number) => {
    const { view } = stateRef.current;
    view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
    view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
    view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    stateRef.current.viewActive = true;
    setZoomPercent(Math.round(view.tz * 100));
    kick();
  }, [kick]);

  const applyTurn = useCallback((t: number) => {
    const sb3d = sb3dRef.current;
    if (!sb3d) return;
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / N;
    sb3d.style.setProperty("--tt", `${(tt * D).toFixed(2)}deg`);
    sb3d.style.setProperty("--td", `${(td * D).toFixed(3)}deg`);
    sb3d.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));

    const { strips } = stateRef.current;
    for (let i = 0; i < strips.length; i++) {
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      const st = strips[i].style;
      st.setProperty("--lit", l1.toFixed(3));
      st.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
      st.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
    }
  }, []);

  const buildCurl = useCallback((dir: "next" | "prev", from: number, to: number) => {
    const urls = stateRef.current.spreadUrls;
    stateRef.current.strips = [];
    const c = document.createElement("div");
    c.className = `curl ${dir}`;
    c.style.setProperty("--n", String(N));
    c.style.setProperty("--span", String(SPAN));

    let host = c;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("div");
      s.className = "strip";
      s.style.setProperty("--i", String(i));
      const gut = "calc(var(--bw) * 0.5)";
      const sw = `calc(var(--bw) * ${SPAN} / ${N})`;
      const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
      const B = `calc(${i + 1} * ${sw} - ${gut})`;

      const f = document.createElement("div");
      f.className = "face front";
      const b = document.createElement("div");
      b.className = "face back";

      f.style.backgroundImage = `url(${urls[from] || ""})`;
      f.style.backgroundPositionX = dir === "next" ? A : B;

      b.style.backgroundImage = `url(${urls[to] || ""})`;
      b.style.backgroundPositionX = dir === "next" ? B : A;

      const fSh = document.createElement("div");
      fSh.className = "sh";
      const fGl = document.createElement("div");
      fGl.className = "gl";
      f.appendChild(fSh);
      f.appendChild(fGl);

      const bSh = document.createElement("div");
      bSh.className = "sh";
      const bGl = document.createElement("div");
      bGl.className = "gl";
      b.appendChild(bSh);
      b.appendChild(bGl);

      s.appendChild(f);
      s.appendChild(b);
      if (i === N - 1) s.classList.add("edge");
      host.appendChild(s);
      host = s;
      stateRef.current.strips.push(s);
    }
    return c;
  }, []);

  const syncZoomLayer = useCallback(() => {
    const zoomInner = zoomInnerRef.current;
    const book = bookRef.current;
    if (!zoomInner || !book) return;
    zoomInner.textContent = "";
    for (const c of Array.from(book.children)) {
      if (c.classList.contains("sb-zone")) continue;
      zoomInner.appendChild(c.cloneNode(true));
    }
  }, []);

  const loupeSize = useCallback(() => {
    const book = bookRef.current;
    if (!book) return 220;
    return Math.round(Math.max(160, Math.min(250, book.clientWidth * 0.24)));
  }, []);

  const placeLoupe = useCallback(() => {
    const { lx, ly, loupeOn, view } = stateRef.current;
    const loupe = loupeRef.current;
    const zoomWrap = zoomWrapRef.current;
    const zoomInner = zoomInnerRef.current;
    const book = bookRef.current;
    if (lx === null || ly === null || !loupe || !zoomWrap || !zoomInner || !book) return;

    const bw = book.clientWidth;
    const bh = book.clientHeight;
    if (!bw) return;

    const R = loupeSize() / 2;
    const bez = R * 2 * 0.058;
    loupe.style.setProperty("--lr", `${R * 2}px`);
    loupe.style.transform = `translate3d(${(lx - R).toFixed(1)}px, ${(ly - R).toFixed(1)}px, 0)`;
    loupe.classList.toggle("on", loupeOn);

    const z = view.z;
    const cx = bw / 2;
    const cy = bh / 2;
    const x0 = cx + (bw * 0.05 - cx) * z;
    const x1 = cx + (bw * 0.95 - cx) * z;
    const y0 = cy + (bh * 0.20 - cy) * z;
    const y1 = cy + (bh * 0.80 - cy) * z;

    const nx = Math.max(x0, Math.min(lx, x1));
    const ny = Math.max(y0, Math.min(ly, y1));
    const inside =
      lx > x0 && lx < x1 && ly > y0 && ly < y1
        ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
        : -Math.hypot(lx - nx, ly - ny);
    const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

    zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
    if (k <= 0.002) return;

    const r = (R - bez).toFixed(1);
    const mask = `radial-gradient(circle ${r}px at ${lx.toFixed(1)}px ${ly.toFixed(1)}px, #000 calc(100% - 1px), transparent 100%)`;
    zoomWrap.style.webkitMaskImage = mask;
    zoomWrap.style.maskImage = mask;

    const px = cx + (lx - cx) / z;
    const py = cy + (ly - cy) / z;
    const s = MAG * z;
    zoomInner.style.transform = `translate(${(lx - px * s).toFixed(1)}px, ${(ly - py * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  }, [loupeSize]);

  const restLoupe = useCallback(() => {
    const book = bookRef.current;
    if (!book) return;
    stateRef.current.lx = book.clientWidth * 0.84;
    stateRef.current.ly = book.clientHeight * 0.82;
    placeLoupe();
  }, [placeLoupe]);

  const paint = useCallback(() => {
    const book = bookRef.current;
    const sb3d = sb3dRef.current;
    if (!book || !sb3d) return;
    const { idx, turn, spreadUrls } = stateRef.current;
    book.textContent = "";

    if (!turn) {
      const f = document.createElement("div");
      f.className = "sb-full";
      const im = new Image();
      im.src = spreadUrls[idx] || "";
      im.alt = `Plate ${idx + 1}`;
      im.draggable = false;
      im.style.width = "100%";
      im.style.height = "auto";
      im.style.display = "block";
      f.appendChild(im);
      book.appendChild(f);
      sb3d.style.setProperty("--shade", "0");
    } else {
      const next = turn.dir === "next";
      const leftPage = document.createElement("div");
      leftPage.className = "sb-half left";
      const leftImg = new Image();
      leftImg.src = spreadUrls[next ? turn.from : turn.to] || "";
      leftImg.className = "sb-half-img left";
      leftImg.style.width = "200%";
      leftImg.style.display = "block";
      leftPage.appendChild(leftImg);
      const lShade = document.createElement("div");
      lShade.className = "gutter-shade left";
      leftPage.appendChild(lShade);
      book.appendChild(leftPage);

      const rightPage = document.createElement("div");
      rightPage.className = "sb-half right";
      const rightImg = new Image();
      rightImg.src = spreadUrls[next ? turn.to : turn.from] || "";
      rightImg.className = "sb-half-img right";
      rightImg.style.width = "200%";
      rightImg.style.marginLeft = "-100%";
      rightImg.style.display = "block";
      rightPage.appendChild(rightImg);
      const rShade = document.createElement("div");
      rShade.className = "gutter-shade right";
      rightPage.appendChild(rShade);
      book.appendChild(rightPage);

      book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
    }

    // Touch and click zones for page turns
    const a = document.createElement("button");
    a.className = "sb-zone sb-prev";
    a.setAttribute("aria-label", "Previous page");
    const b = document.createElement("button");
    b.className = "sb-zone sb-next";
    b.setAttribute("aria-label", "Next page");
    book.appendChild(a);
    book.appendChild(b);

    sb3d.style.setProperty("--bw", `${book.clientWidth}px`);
    syncZoomLayer();
    placeLoupe();
  }, [applyTurn, buildCurl, placeLoupe, syncZoomLayer]);

  const animateTo = useCallback((target: number, onDone: () => void, stiff = 150, damp = 22) => {
    stateRef.current.spring = {
      kind: "spring",
      v: 0,
      target,
      done: onDone,
      k: stiff,
      c: damp,
    };
    kick();
  }, [kick]);

  const tick = useCallback((now: number) => {
    stateRef.current.raf = null;
    const dt = Math.min(0.032, (now - stateRef.current.lastTime) / 1000 || 0.016);
    stateRef.current.lastTime = now;

    const { spring, turn, view } = stateRef.current;
    if (spring && turn) {
      const x = turn.t - spring.target;
      spring.v += (-spring.k * x - spring.c * spring.v) * dt;
      turn.t += spring.v * dt;
      if (Math.abs(turn.t - spring.target) < 0.002 && Math.abs(spring.v) < 0.02) {
        turn.t = spring.target;
        stateRef.current.spring = null;
        applyTurn(turn.t);
        spring.done?.();
      } else {
        applyTurn(turn.t);
      }
    }

    // View spring for 3D tilt
    const e = 0.14;
    let moved = false;
    for (const [k, tKey] of [["rx", "trx"], ["ry", "try_"], ["z", "tz"]] as const) {
      const d = (view as any)[tKey] - (view as any)[k];
      if (Math.abs(d) > 0.0006) {
        (view as any)[k] += d * e;
        moved = true;
      } else {
        (view as any)[k] = (view as any)[tKey];
      }
    }
    if (moved) applyView();
    stateRef.current.viewActive = moved;

    if ((stateRef.current.spring || stateRef.current.viewActive) && stateRef.current.raf === null) {
      stateRef.current.raf = requestAnimationFrame(tick);
    }
  }, [applyTurn, applyView, kick]);

  const startTurn = useCallback((dir: "next" | "prev", t = 0) => {
    stateRef.current.spring = null;
    if (stateRef.current.turn) {
      stateRef.current.idx = stateRef.current.turn.to;
      stateRef.current.turn = null;
    }
    const from = stateRef.current.idx;
    const to = dir === "next" ? (from + 1) % totalPages : (from - 1 + totalPages) % totalPages;
    stateRef.current.turn = { dir, from, to, t };
    paint();
  }, [paint, totalPages]);

  const commit = useCallback(() => {
    const { turn } = stateRef.current;
    if (!turn) return;
    animateTo(1, () => {
      const nextIdx = turn.to;
      stateRef.current.idx = nextIdx;
      stateRef.current.turn = null;
      setCurrentIndex(nextIdx);
      paint();
    });
    kick();
  }, [animateTo, kick, paint]);

  const cancel = useCallback(() => {
    if (!stateRef.current.turn) return;
    animateTo(0, () => {
      stateRef.current.turn = null;
      paint();
    });
    kick();
  }, [animateTo, kick, paint]);

  const step = useCallback((dir: "next" | "prev") => {
    setHintVisible(false);
    if (isMobile) {
      setCurrentIndex((prev) => {
        if (dir === "next") return (prev + 1) % totalPages;
        return (prev - 1 + totalPages) % totalPages;
      });
      return;
    }
    if (stateRef.current.turn) {
      stateRef.current.idx = stateRef.current.turn.to;
      stateRef.current.turn = null;
    }
    startTurn(dir, 0);
    commit();
  }, [commit, isMobile, startTurn, totalPages]);

  // Pointer interactions for desktop 3D tilt & page turn drag
  useEffect(() => {
    if (isMobile) return;
    const stage = stageRef.current;
    const book = bookRef.current;
    if (!stage || !book) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || stateRef.current.drag) return;
      const r = book.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, stateRef.current.view.tz);
    };

    const handlePointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, stateRef.current.view.tz);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [isMobile, setView]);

  // Page turning pointer drag events (Desktop)
  useEffect(() => {
    if (isMobile) return;
    const stage = stageRef.current;
    const book = bookRef.current;
    if (!stage || !book) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (!target.closest(".sb-zone")) return;

      e.preventDefault();
      stage.setPointerCapture(e.pointerId);
      setHintVisible(false);

      const r = book.getBoundingClientRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
      startTurn(dir, 0);
      stateRef.current.drag = {
        dir,
        x0: e.clientX,
        w: r.width,
        moved: 0,
        vel: 0,
        tPrev: performance.now(),
      };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const drag = stateRef.current.drag;
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (stateRef.current.turn?.t || 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (stateRef.current.turn) {
        stateRef.current.turn.t = t;
        applyTurn(t);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const drag = stateRef.current.drag;
      if (!drag) return;
      stateRef.current.drag = null;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (!stateRef.current.turn) return;
      if (drag.moved < 6) {
        commit();
        return;
      }
      const go = stateRef.current.turn.t > 0.40 || drag.vel > 1.1;
      if (go) commit();
      else cancel();
    };

    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerup", handlePointerUp);
    stage.addEventListener("pointercancel", handlePointerUp);

    return () => {
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", handlePointerUp);
      stage.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [applyTurn, cancel, commit, isMobile, startTurn]);

  // Initial layout & resize
  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      const book = bookRef.current;
      const sb3d = sb3dRef.current;
      if (!book || !sb3d) return;
      sb3d.style.setProperty("--bw", `${book.clientWidth}px`);
      restLoupe();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, restLoupe]);

  const currentPage = BOOK_PAGES[currentIndex];

  return (
    <div className="w-full flex flex-col items-center select-none my-6">
      {/* ================= MOBILE VIEW (1 PAGE) ================= */}
      {isMobile ? (
        <div className="w-full max-w-[480px] px-2 flex flex-col items-center">
          {/* Card Frame */}
          <div className="relative w-full aspect-[880/1200] rounded-xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-neutral-800 bg-[#faf7f0] dark:bg-[#161514] transition-all duration-300">
            {/* SVG Page Graphic */}
            <img
              src={stateRef.current.singleUrls[currentIndex] || generateSinglePageSvg(currentPage, isKh, isDark)}
              alt={`Page ${currentIndex + 1}`}
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Tap areas for Prev / Next on Mobile */}
            <button
              onClick={() => step("prev")}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-10 opacity-0"
              aria-label="Previous page"
            />
            <button
              onClick={() => step("next")}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-10 opacity-0"
              aria-label="Next page"
            />
          </div>

          {/* Mobile Navigation Bar */}
          <div className="flex items-center justify-between w-full mt-4 px-4 py-2 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 shadow-md">
            <button
              onClick={() => step("prev")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-neutral-700 dark:text-neutral-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-800 dark:text-neutral-200">
                PAGE {currentPage.number} / 04
              </span>
            </div>

            <button
              onClick={() => step("next")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-neutral-700 dark:text-neutral-300"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-2 font-mono text-[11px] text-neutral-500 text-center">
            {isKh ? "ប៉ះផ្នែកខាងឆ្វេង ឬស្តាំ ដើម្បីប្តូរទំព័រ" : "Tap left or right edge to flip pages"}
          </p>
        </div>
      ) : (
        /* ================= DESKTOP & TABLET VIEW (2 PAGES SPREAD) ================= */
        <div className="sb-wrap w-full max-w-[1000px] flex flex-col items-center">
          <div className="sb-stage flex items-center justify-center w-full relative" ref={stageRef}>
            {/* Left Page Turn Button */}
            <button
              className="sb-arrow mr-2 lg:mr-4 hover:scale-110 active:scale-95 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
              onClick={() => step("prev")}
              aria-label="Previous spread"
            >
              <ChevronLeft className="w-9 h-9" />
            </button>

            {/* 3D Perspective Box */}
            <div className="sb-3d relative flex-1 max-w-[880px]" ref={sb3dRef}>
              <div className="sb-tilt relative" id="sbTilt">
                {/* Ambient Shadows */}
                <div className="sb-cast ambient" aria-hidden="true" />
                <div className="sb-cast contact" aria-hidden="true" />
                <div className="sb-cast hair" aria-hidden="true" />

                {/* The 2-Page Book Spread */}
                <div className="sb-book" ref={bookRef} />

                {/* Draggable Magnifier Loupe */}
                <div className="zoomwrap" ref={zoomWrapRef} aria-hidden="true">
                  <div className="zoominner" ref={zoomInnerRef} />
                </div>

                <div className="loupe" ref={loupeRef}>
                  <span className="grip" />
                  <span className="ring">
                    <span className="lens" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Page Turn Button */}
            <button
              className="sb-arrow ml-2 lg:ml-4 hover:scale-110 active:scale-95 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
              onClick={() => step("next")}
              aria-label="Next spread"
            >
              <ChevronRight className="w-9 h-9" />
            </button>
          </div>

          {/* Tactile View Controls Toolbar */}
          <div className="sb-tools mt-4 flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg">
            <button
              className="tool p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              onClick={() => setView(stateRef.current.view.trx, stateRef.current.view.try_, stateRef.current.view.tz / 1.15)}
              disabled={zoomPercent <= Math.round(ZOOM_MIN * 100)}
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span
              className="zoom-read font-mono text-xs font-semibold px-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setView(0, 0, 1)}
              title="Reset Zoom"
            >
              {zoomPercent}%
            </span>

            <button
              className="tool p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              onClick={() => setView(stateRef.current.view.trx, stateRef.current.view.try_, stateRef.current.view.tz * 1.15)}
              disabled={zoomPercent >= Math.round(ZOOM_MAX * 100)}
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <span className="tool-sep w-px h-4 bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />

            <div className="flex items-center gap-1.5 px-2">
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-800 dark:text-neutral-200">
                SPREAD {currentPage.number} / 04
              </span>
            </div>

            <span className="tool-sep w-px h-4 bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />

            <button
              className={`tool p-1.5 rounded-full transition-colors ${
                isLoupeActive
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              }`}
              onClick={() => {
                const nextVal = !isLoupeActive;
                setIsLoupeActive(nextVal);
                stateRef.current.loupeOn = nextVal;
                loupeRef.current?.classList.toggle("on", nextVal);
                if (nextVal && stateRef.current.lx === null) restLoupe();
                else placeLoupe();
              }}
              title="Toggle Loupe Magnifier"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Hint */}
          <p className={`sb-hint font-mono text-xs text-neutral-500 mt-2 transition-opacity ${!hintVisible ? "opacity-0" : "opacity-100"}`}>
            {isKh ? "អូស ឬចុចលើគែមទំព័រដើម្បីត្រឡប់ទំព័រ · រំកិលកណ្ដុរដើម្បីបង្វិល 3D" : "Click or drag page edge to turn · Move mouse to tilt in 3D"}
          </p>
        </div>
      )}
    </div>
  );
}
