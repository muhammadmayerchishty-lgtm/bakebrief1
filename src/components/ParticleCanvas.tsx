import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const particles: Particle[] = [];
    const count = Math.min(Math.floor(width / 30), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Subtle move toward/away from mouse parallax
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.x -= (dx / dist) * force * 0.6;
          p.y -= (dy / dist) * force * 0.6;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${Math.max(0.08, Math.min(0.6, p.opacity))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
