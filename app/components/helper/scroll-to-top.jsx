"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!isVisible) return null;

  return (
    <button
      className="fixed bottom-22 right-6 z-40 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-3.5 hover:scale-110 shadow-lg shadow-violet-900/50 transition-all duration-300 ease-out cursor-pointer text-white"
      onClick={onClickBtn}
      aria-label="Scroll back to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
