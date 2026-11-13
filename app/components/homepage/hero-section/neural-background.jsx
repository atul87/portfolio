"use client";

import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let isTabActive = true;

    // Mouse tracking relative to canvas
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      radius: 150,
      active: false,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3D Neural Nodes & Edges
    let particles = [];
    let pulses = []; // Neural activation signal packets traveling on edges
    const FOV = 280;
    const Z_MIN = 80;
    const Z_MAX = 400;

    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 30 : 60;
      particles = [];
      pulses = [];

      for (let i = 0; i < count; i++) {
        // ~22% active hub nodes (Mint #16f2b3), ~78% synaptic relay nodes (Violet #8b5cf6 / Slate)
        const isHub = Math.random() < 0.22;
        particles.push({
          x: (Math.random() - 0.5) * width * 1.25,
          y: (Math.random() - 0.5) * height * 1.25,
          z: Math.random() * (Z_MAX - Z_MIN) + Z_MIN,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          vz: (Math.random() - 0.5) * 0.25,
          isHub,
          baseRadius: isHub ? 2.6 : 1.4,
          // Color tuples
          color: isHub ? "22, 242, 179" : "139, 92, 246",
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }

      // Initialize 8-12 neural forward-propagation signal packets
      const pulseCount = isMobile ? 5 : 10;
      for (let p = 0; p < pulseCount; p++) {
        pulses.push({
          fromIndex: Math.floor(Math.random() * count),
          toIndex: Math.floor(Math.random() * count),
          progress: Math.random(),
          speed: Math.random() * 0.012 + 0.008,
          active: true,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 720;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    // Pause when scrolled off screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    let tick = 0;

    const render = () => {
      if (!isVisible || !isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      tick += 0.02;

      // Smooth mouse coordinate lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Project 3D positions to 2D
      const projected = [];
      const boundX = (width * 1.25) / 2;
      const boundY = (height * 1.25) / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // 3D toroidal boundary bounce/wrap
          if (p.x < -boundX) p.x = boundX;
          if (p.x > boundX) p.x = -boundX;
          if (p.y < -boundY) p.y = boundY;
          if (p.y > boundY) p.y = -boundY;
          if (p.z < Z_MIN) p.z = Z_MAX;
          if (p.z > Z_MAX) p.z = Z_MIN;
        }

        // Perspective 3D calculation
        const scale = FOV / p.z;
        const screenX = cx + p.x * scale;
        const screenY = cy + p.y * scale;

        // Subtle mouse repulsion
        let offsetX = 0;
        let offsetY = 0;
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 28;
            offsetX = (dx / dist) * force;
            offsetY = (dy / dist) * force;
          }
        }

        const finalX = screenX + offsetX;
        const finalY = screenY + offsetY;

        projected.push({
          x: finalX,
          y: finalY,
          scale,
          isHub: p.isHub,
          color: p.color,
          radius: p.baseRadius,
          pulse: Math.sin(tick * 1.5 + p.pulseOffset) * 0.25 + 0.75,
        });
      }

      // Collect connected edges for synaptic lines and signal pulse traversal
      const activeEdges = [];
      const maxDist = width < 768 ? 95 : 135;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            activeEdges.push({ from: i, to: j, dist });

            // Either endpoint being a hub enhances the connection color
            const connectsHub = p1.isHub || p2.isHub;
            const alpha = (1 - dist / maxDist) * (connectsHub ? 0.38 : 0.22) * Math.min(p1.scale, p2.scale);

            ctx.beginPath();
            ctx.strokeStyle = connectsHub
              ? `rgba(22, 242, 179, ${alpha.toFixed(3)})`
              : `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = connectsHub ? 1.1 * p1.scale : 0.7 * p1.scale;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Cursor Constellation Web: Connect mouse pointer to nearby nodes
      if (mouse.x > 0 && mouse.y > 0 && mouse.active) {
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45 * p.scale;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(22, 242, 179, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.0;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // Neural Forward Propagation Signal Packets (glowing pips moving along active edges)
      if (!prefersReducedMotion && activeEdges.length > 0) {
        for (let k = 0; k < pulses.length; k++) {
          const pulse = pulses[k];
          pulse.progress += pulse.speed;

          // If reached target, re-bind to a random active edge
          if (pulse.progress >= 1 || pulse.fromIndex >= projected.length || pulse.toIndex >= projected.length) {
            const randomEdge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
            if (randomEdge) {
              pulse.fromIndex = randomEdge.from;
              pulse.toIndex = randomEdge.to;
              pulse.progress = 0;
              pulse.speed = Math.random() * 0.015 + 0.008;
            }
          }

          const p1 = projected[pulse.fromIndex];
          const p2 = projected[pulse.toIndex];

          if (p1 && p2) {
            const pipX = p1.x + (p2.x - p1.x) * pulse.progress;
            const pipY = p1.y + (p2.y - p1.y) * pulse.progress;
            const pipScale = (p1.scale + p2.scale) * 0.5;

            // Draw glowing pulse packet
            ctx.beginPath();
            ctx.arc(pipX, pipY, 2.2 * pipScale, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#16f2b3";
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
          }
        }
      }

      // Draw Neural Nodes (Mint Hubs & Violet Relays)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(1.2, p.radius * p.scale * p.pulse);
        const alpha = Math.min(0.9, (p.isHub ? 0.75 : 0.45) * p.scale * p.pulse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (p.isHub) {
          // Hub glow halo
          ctx.fillStyle = `rgba(22, 242, 179, ${alpha.toFixed(3)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(22, 242, 179, 0.7)";
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        } else {
          // Standard synaptic node
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 -top-20 pointer-events-none overflow-hidden -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] opacity-85"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
