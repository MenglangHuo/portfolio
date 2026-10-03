"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/* ─── Bird types ──────────────────────────────────────────────── */
type BirdType = "swallow" | "sparrow" | "heron";

interface Bird {
  x: number;
  y: number;
  speedX: number;       // can be negative (fly right-to-left)
  speedY: number;       // slight vertical drift
  scale: number;
  wingAngle: number;
  wingSpeed: number;
  glidePhase: number;
  glideDuration: number;
  isGliding: boolean;
  altitudeBase: number;
  yAmplitude: number;
  yFrequency: number;
  angle: number;
  opacity: number;
  type: BirdType;
}

interface CloudMist {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
  waveFreq: number;
  waveAmp: number;
}

interface WindStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
}

export default function AncientAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 30;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    /* ── Helper: random flight direction ────────────────────────── */
    const randomDir = (): { sx: number; sy: number } => {
      const dirs = [
        { sx: 0.18 + Math.random() * 0.22, sy: 0 },              // L→R fast
        { sx: 0.10 + Math.random() * 0.12, sy: 0 },              // L→R slow
        { sx: -(0.12 + Math.random() * 0.18), sy: 0 },           // R→L
        { sx: 0.14 + Math.random() * 0.14, sy: 0.03 + Math.random() * 0.04 }, // L→R + drift down
        { sx: -(0.10 + Math.random() * 0.12), sy: -(0.02 + Math.random() * 0.03) }, // R→L + drift up
      ];
      return dirs[Math.floor(Math.random() * dirs.length)];
    };

    /* ── Spawn a bird at random start position ──────────────────── */
    const spawnBird = (i: number, total: number): Bird => {
      const types: BirdType[] = ["swallow", "sparrow", "heron"];
      const type = types[i % 3] as BirdType;
      const { sx, sy } = randomDir();
      // Start off-screen on the appropriate side
      const startX = sx > 0
        ? (i / total) * (width + 400) - 200
        : width + 100 + Math.random() * 300;

      // Scale: smaller than before (divide by ~2.5)
      const baseScale = type === "heron" ? 0.22 + Math.random() * 0.18
        : type === "sparrow" ? 0.14 + Math.random() * 0.12
        : 0.16 + Math.random() * 0.14;

      return {
        x: startX,
        y: Math.random() * (height * 0.65) + height * 0.04,
        speedX: sx,
        speedY: sy,
        scale: baseScale,
        wingAngle: Math.random() * Math.PI * 2,
        wingSpeed: type === "heron"
          ? 0.018 + Math.random() * 0.012   // slow beats
          : type === "sparrow"
          ? 0.055 + Math.random() * 0.03    // fast beats
          : 0.035 + Math.random() * 0.02,
        glidePhase: 0,
        glideDuration: type === "heron"
          ? 120 + Math.random() * 180
          : 60 + Math.random() * 100,
        isGliding: Math.random() > 0.5,
        altitudeBase: Math.random() * (height * 0.55) + height * 0.04,
        yAmplitude: type === "heron" ? 6 + Math.random() * 8 : 10 + Math.random() * 14,
        yFrequency: 0.002 + Math.random() * 0.003,
        angle: 0,
        opacity: 0.18 + Math.random() * 0.28,
        type,
      };
    };

    const birdCount = 14;
    const birds: Bird[] = Array.from({ length: birdCount }, (_, i) => spawnBird(i, birdCount));

    /* ── Mist banks ─────────────────────────────────────────────── */
    const mistBanks: CloudMist[] = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.60) + 20,
      width: 320 + Math.random() * 380,
      height: 45 + Math.random() * 35,
      speed: 0.12 + Math.random() * 0.14,
      opacity: 0.05 + Math.random() * 0.07,
      waveFreq: 0.003 + Math.random() * 0.003,
      waveAmp: 8 + Math.random() * 12,
    }));

    /* ── Wind streaks ───────────────────────────────────────────── */
    const windStreaks: WindStreak[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.65) + 30,
      length: 90 + Math.random() * 150,
      speed: 0.6 + Math.random() * 0.8,
      opacity: 0.04 + Math.random() * 0.06,
      thickness: 0.6 + Math.random() * 0.7,
    }));

    let time = 0;

    /* ─────────────────────────────────────────────────────────────
       DRAW: Type A — Swallow (forked tail, swept wings)
    ───────────────────────────────────────────────────────────── */
    const drawSwallow = (b: Bird, ink: string, px: number, py: number) => {
      ctx.save();
      const drawX = b.x + px * (b.scale * 0.7);
      const drawY = b.y + py * (b.scale * 0.7);
      ctx.translate(drawX, drawY);
      if (b.speedX < 0) ctx.scale(-1, 1); // flip for right-to-left
      ctx.rotate(b.angle);
      ctx.scale(b.scale, b.scale);
      ctx.fillStyle = ink;
      ctx.globalAlpha = b.opacity;

      const flap = b.isGliding ? 0.02 : Math.sin(b.wingAngle) * 0.55;

      // Slender body
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.bezierCurveTo(-6, -1.5, 5, -2, 12, 0);
      ctx.bezierCurveTo(5, 2, -6, 1.5, -14, 0);
      ctx.fill();

      // Swept upper wing
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.quadraticCurveTo(6, -10 - flap * 14, -6, -18 - flap * 20);
      ctx.quadraticCurveTo(-1, -9 - flap * 9, -7, -1);
      ctx.fill();

      // Swept lower wing
      ctx.beginPath();
      ctx.moveTo(1, 1);
      ctx.quadraticCurveTo(5, 9 + flap * 12, -7, 16 + flap * 18);
      ctx.quadraticCurveTo(-2, 8 + flap * 8, -6, 1);
      ctx.fill();

      // Forked tail
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-22, -4);
      ctx.lineTo(-16, -0.5);
      ctx.lineTo(-22, 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    /* ─────────────────────────────────────────────────────────────
       DRAW: Type B — Sparrow (round body, short tail)
    ───────────────────────────────────────────────────────────── */
    const drawSparrow = (b: Bird, ink: string, px: number, py: number) => {
      ctx.save();
      const drawX = b.x + px * (b.scale * 0.7);
      const drawY = b.y + py * (b.scale * 0.7);
      ctx.translate(drawX, drawY);
      if (b.speedX < 0) ctx.scale(-1, 1);
      ctx.rotate(b.angle);
      ctx.scale(b.scale, b.scale);
      ctx.fillStyle = ink;
      ctx.globalAlpha = b.opacity;

      const flap = b.isGliding ? 0.01 : Math.sin(b.wingAngle) * 0.65;

      // Rounded body
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Short beak
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(15, 0.5);
      ctx.lineTo(10, 1.5);
      ctx.fill();

      // Round upper wing
      ctx.beginPath();
      ctx.moveTo(2, -2);
      ctx.quadraticCurveTo(10, -10 - flap * 18, -2, -16 - flap * 22);
      ctx.quadraticCurveTo(0, -8 - flap * 10, -6, -2);
      ctx.fill();

      // Round lower wing
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.quadraticCurveTo(8, 10 + flap * 16, -3, 15 + flap * 20);
      ctx.quadraticCurveTo(0, 8 + flap * 9, -5, 2);
      ctx.fill();

      // Fan tail
      ctx.beginPath();
      ctx.moveTo(-8, -1);
      ctx.lineTo(-16, -3);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-16, 3);
      ctx.lineTo(-8, 1);
      ctx.fill();

      ctx.restore();
    };

    /* ─────────────────────────────────────────────────────────────
       DRAW: Type C — Heron (long neck, long wings)
    ───────────────────────────────────────────────────────────── */
    const drawHeron = (b: Bird, ink: string, px: number, py: number) => {
      ctx.save();
      const drawX = b.x + px * (b.scale * 0.7);
      const drawY = b.y + py * (b.scale * 0.7);
      ctx.translate(drawX, drawY);
      if (b.speedX < 0) ctx.scale(-1, 1);
      ctx.rotate(b.angle);
      ctx.scale(b.scale, b.scale);
      ctx.fillStyle = ink;
      ctx.strokeStyle = ink;
      ctx.globalAlpha = b.opacity;

      const flap = b.isGliding ? 0.01 : Math.sin(b.wingAngle) * 0.38;

      // Long body
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.bezierCurveTo(-6, -2, 8, -2.5, 18, -1);
      ctx.bezierCurveTo(8, 2.5, -6, 2, -18, 0);
      ctx.fill();

      // Long neck + head
      ctx.beginPath();
      ctx.moveTo(14, -1);
      ctx.bezierCurveTo(18, -5, 22, -7, 26, -5);
      ctx.bezierCurveTo(24, -4, 20, -3, 16, 0);
      ctx.fill();

      // Long beak
      ctx.beginPath();
      ctx.moveTo(26, -5);
      ctx.lineTo(34, -5.5);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Long upper wing
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.quadraticCurveTo(8, -16 - flap * 12, -8, -26 - flap * 18);
      ctx.quadraticCurveTo(-2, -14 - flap * 8, -12, -2);
      ctx.fill();

      // Long lower wing
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.quadraticCurveTo(6, 14 + flap * 10, -9, 24 + flap * 16);
      ctx.quadraticCurveTo(-3, 12 + flap * 7, -10, 2);
      ctx.fill();

      // Trailing legs (thin lines)
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-10, 2);
      ctx.lineTo(-20, 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-13, 1);
      ctx.lineTo(-23, 7);
      ctx.stroke();

      ctx.restore();
    };

    /* ── Mist ribbon ─────────────────────────────────────────── */
    const drawMistRibbon = (m: CloudMist, t: number, color: string) => {
      ctx.save();
      const wave = Math.sin(t * m.waveFreq) * m.waveAmp;
      const grad = ctx.createRadialGradient(
        m.x + m.width * 0.5, m.y + wave, 0,
        m.x + m.width * 0.5, m.y + wave, m.width * 0.5
      );
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.globalAlpha = m.opacity;
      ctx.beginPath();
      ctx.ellipse(m.x + m.width * 0.5, m.y + wave, m.width * 0.5, m.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* ── Wind streak ──────────────────────────────────────────── */
    const drawWindStream = (w: WindStreak, color: string) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = w.thickness;
      ctx.globalAlpha = w.opacity;
      ctx.beginPath();
      ctx.moveTo(w.x, w.y);
      ctx.quadraticCurveTo(w.x + w.length * 0.5, w.y - 4, w.x + w.length, w.y + 2);
      ctx.stroke();
      ctx.restore();
    };

    /* ── Animation loop ────────────────────────────────────────── */
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const inkColor  = isDark ? "#ffffff" : "#24201c";
      const mistColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(140,130,115,0.45)";
      const windColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(110,100,85,0.4)";

      // 1. Mist
      for (const m of mistBanks) {
        m.x += m.speed;
        if (m.x > width + m.width * 0.5) {
          m.x = -m.width;
          m.y = Math.random() * (height * 0.60) + 20;
        }
        drawMistRibbon(m, time, mistColor);
      }

      // 2. Wind
      for (const w of windStreaks) {
        w.x += w.speed;
        if (w.x > width + w.length) {
          w.x = -w.length;
          w.y = Math.random() * (height * 0.65) + 30;
        }
        drawWindStream(w, windColor);
      }

      // 3. Birds
      for (const b of birds) {
        b.x += b.speedX;
        b.y += b.speedY;
        b.y = b.altitudeBase + Math.sin(time * b.yFrequency) * b.yAmplitude + (b.speedY * time * 0.01);

        // Wing beat cycle
        b.glidePhase++;
        if (b.glidePhase > b.glideDuration) {
          b.isGliding = !b.isGliding;
          b.glidePhase = 0;
          b.glideDuration = b.isGliding
            ? 80 + Math.random() * 140
            : 40 + Math.random() * 80;
        }
        if (!b.isGliding) b.wingAngle += b.wingSpeed;

        // Natural banking angle
        const dy = Math.cos(time * b.yFrequency) * b.yAmplitude * b.yFrequency;
        b.angle = Math.atan2(dy, Math.abs(b.speedX)) * 0.38;

        // Offscreen wrap — respawn from opposite edge
        const offRight  = b.x > width + 80;
        const offLeft   = b.x < -80;
        const offTop    = b.y < -40;
        const offBottom = b.y > height + 40;

        if (offRight || offLeft || offTop || offBottom) {
          const { sx, sy } = randomDir();
          b.speedX = sx;
          b.speedY = sy;
          b.x = sx > 0 ? -60 : width + 60;
          b.altitudeBase = Math.random() * (height * 0.60) + height * 0.04;
          b.y = b.altitudeBase;
          b.opacity = 0.18 + Math.random() * 0.26;
        }

        // Draw
        if (b.type === "swallow")      drawSwallow(b, inkColor, mouseX, mouseY);
        else if (b.type === "sparrow") drawSparrow(b, inkColor, mouseX, mouseY);
        else                           drawHeron(b, inkColor, mouseX, mouseY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <>
      <div className="wash" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}
