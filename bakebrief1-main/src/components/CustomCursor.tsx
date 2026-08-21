import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktops)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      document.body.classList.add('has-custom-cursor');
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if target or parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setHoverLabel(cursorTarget.getAttribute('data-cursor') || null);
        setIsHovered(true);
      } else {
        const interactive = target?.closest('a, button, input, select, textarea, [role="button"]');
        if (interactive) {
          setHoverLabel(null);
          setIsHovered(true);
        } else {
          setHoverLabel(null);
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#C5A059] flex items-center justify-center transition-opacity duration-300 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (hoverLabel ? 76 : 52) : 32,
          height: isHovered ? (hoverLabel ? 76 : 52) : 32,
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.12)' : 'rgba(197, 160, 89, 0.03)',
          backdropFilter: isHovered ? 'blur(4px)' : 'none',
          boxShadow: isHovered ? '0 0 20px rgba(197, 160, 89, 0.3)' : 'none',
          scale: isClicking ? 0.85 : 1,
        }}
      >
        {hoverLabel && (
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#FFF8DC] font-bold text-center px-1 animate-pulse">
            {hoverLabel}
          </span>
        )}
      </motion.div>

      {/* Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 0 : isClicking ? 1.5 : 1,
        }}
      />
    </div>
  );
}
