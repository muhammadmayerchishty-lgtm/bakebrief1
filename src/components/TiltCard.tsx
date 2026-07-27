import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  dataCursor?: string;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  dataCursor,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative rounded-2xl glass-reflection ${className}`}
    >
      {/* Dynamic Cursor Light Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
          opacity: glarePos.opacity,
        }}
      />
      {children}
    </motion.div>
  );
}
