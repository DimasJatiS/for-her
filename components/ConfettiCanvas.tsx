'use client';

import { useEffect, useRef } from 'react';

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
}

type ConfettiCanvasProps = {
  trigger: boolean;
  palette?: string[];
};

export default function ConfettiCanvas({ trigger, palette }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = palette ?? ['#FFB6C1', '#FFD700', '#FF69B4', '#FFA07A', '#FFE4E1'];
    const particles: ConfettiParticle[] = [];

    // Create confetti burst
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -10 - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3; // Gravity
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      // Continue until all particles are off screen
      const stillVisible = particles.some(
        (p) => p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20
      );

      if (stillVisible) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [trigger, palette]);

  if (!trigger) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
