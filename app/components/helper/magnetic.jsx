"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Magnetic button wrapper that smoothly pulls toward the cursor on hover.
 * Uses hardware-accelerated transform3d with spring easing and respects
 * prefers-reduced-motion and touch device capabilities.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  maxOffset = 14,
  className = "",
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isReducedMotion = useRef(false);
  const isPointerFine = useRef(true);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isPointerFine.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current || isReducedMotion.current || !isPointerFine.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp maximum displacement
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => {
    if (isReducedMotion.current || !isPointerFine.current) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.5s cubic-bezier(0.25, 1.25, 0.5, 1)",
        willChange: isHovered ? "transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
