const fs = require('fs');

const html = fs.readFileSync('C:/Users/berna/Downloads/github-heatmap-logo.html', 'utf8');

const bgMatch = html.match(/<script id="bg-data" type="application\/json">([^<]+)<\/script>/);
const logoMatch = html.match(/<script id="logo-data" type="application\/json">([^<]+)<\/script>/);

const bgData = bgMatch[1];
const logoData = logoMatch[1];

const componentCode = `"use client";

import React, { useRef, useEffect, useState } from "react";

const BG_POINTS = ${bgData};
const LOGO_POINTS = ${logoData};

const SRC_W = 1400;
const SRC_H = 800;

const LEVELS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function GithubBanner() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const mouseRef = useRef({x: -9999, y: -9999, active: false});
  const bgDotsRef = useRef([]);
  const logoDotsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const rnd = mulberry32(1337);

    bgDotsRef.current = BG_POINTS.map(([x, y]) => ({
      bx: x, by: y, ox: 0, oy: 0, tx: 0, ty: 0,
    }));

    logoDotsRef.current = LOGO_POINTS.map(([x, y]) => {
      const r = rnd();
      let level = 1;
      if (r > 0.82) level = 4;
      else if (r > 0.55) level = 3;
      else if (r > 0.22) level = 2;
      else level = 1;
      return {
        bx: x, by: y, ox: 0, oy: 0, tx: 0, ty: 0,
        level,
        phase: rnd() * Math.PI * 2,
        speed: 0.4 + rnd() * 0.6,
      };
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let currentScale = 1;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    const resize = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Calculate scale and offsets to center the content
      const s = Math.max(rect.width / SRC_W, rect.height / SRC_H);
      currentScale = s;
      currentOffsetX = (rect.width - SRC_W * s) / 2;
      currentOffsetY = (rect.height - SRC_H * s) / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Map mouse coordinates to the scaled SRC coordinate system
      mouseRef.current = {
        x: (e.clientX - rect.left - currentOffsetX) / currentScale,
        y: (e.clientY - rect.top - currentOffsetY) / currentScale,
        active: true,
      };
    };
    const handleLeave = () => { mouseRef.current.active = false; };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handleMove({clientX: t.clientX, clientY: t.clientY});
      }
    }, {passive: true});
    canvas.addEventListener("touchend", handleLeave);

    const REPEL_RADIUS = 90;
    const MAX_PUSH = 34;
    const EASE = 0.14;

    let t0 = performance.now();

    const applyRepel = (d, mx, my, active) => {
      if (active) {
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.001) {
          const force = (1 - dist / REPEL_RADIUS);
          const eased = force * force;
          d.tx = (dx / dist) * eased * MAX_PUSH;
          d.ty = (dy / dist) * eased * MAX_PUSH;
        } else {
          d.tx = 0; d.ty = 0;
        }
      } else {
        d.tx = 0; d.ty = 0;
      }
      d.ox += (d.tx - d.ox) * EASE;
      d.oy += (d.ty - d.oy) * EASE;
    };

    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    const draw = (now) => {
      const elapsed = (now - t0) / 1000;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const s = currentScale;
      const ox = currentOffsetX;
      const oy = currentOffsetY;
      const {x: mx, y: my, active} = mouseRef.current;

      // background grid dots
      ctx.save();
      for (const d of bgDotsRef.current) {
        applyRepel(d, mx, my, active);
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = active && dist < REPEL_RADIUS;
        const px = ox + (d.bx + d.ox) * s;
        const py = oy + (d.by + d.oy) * s;
        const r = (near ? 3.2 : 2.4) * s;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(r, 0.6), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? \`rgba(210,214,219,\${0.16 + 0.22 * (1 - dist / REPEL_RADIUS)})\`
          : "rgba(210,214,219,0.05)";
        ctx.fill();
      }
      ctx.restore();

      // logo squares
      const size = 9 * s;
      for (const d of logoDotsRef.current) {
        applyRepel(d, mx, my, active);
        const pulse = 0.85 + 0.15 * Math.sin(elapsed * d.speed + d.phase);
        const color = LEVELS[d.level];
        const px = ox + (d.bx + d.ox) * s;
        const py = oy + (d.by + d.oy) * s;

        if (d.level >= 3) {
          ctx.save();
          ctx.shadowColor = d.level === 4 ? "rgba(57,211,83,0.45)" : "rgba(38,166,65,0.3)";
          ctx.shadowBlur = 8 * s * pulse;
          ctx.fillStyle = color;
          roundRect(ctx, px - size / 2, py - size / 2, size, size, 2 * s);
          ctx.globalAlpha = pulse;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.restore();
        } else {
          ctx.fillStyle = color;
          ctx.globalAlpha = pulse;
          roundRect(ctx, px - size / 2, py - size / 2, size, size, 2 * s);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full bg-[#0a0d13]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0d1117]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
          <span className="text-[#6e7681] text-xs font-semibold">Less</span>
          <span className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-white/10"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#0e4429]"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#006d32]"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#26a641]"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#39d353]"></span>
          <span className="text-[#6e7681] text-xs font-semibold">More</span>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('C:/Users/berna/Desktop/Mee-Channel/components/GithubBanner.tsx', componentCode);
console.log('Done');
