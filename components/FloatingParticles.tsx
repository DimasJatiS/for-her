'use client';

import { useEffect, useRef } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/constants';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

type FloatingParticlesProps = {
  /**
   * RGB triplet as string: "r, g, b".
   * Example: "242, 153, 74" for warm orange.
   */
  rgb?: string;
};

export default function FloatingParticles({ rgb = '255, 182, 193' }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.5 - 0.2,
        life: Math.random() * ANIMATION_DURATIONS.particleLife,
        maxLife: ANIMATION_DURATIONS.particleLife,
        size: Math.random() * 3 + 2,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 16; // Assuming 60fps

        // Reset if out of bounds or life ended
        if (
          particle.y < -10 ||
          particle.x < -10 ||
          particle.x > canvas.width + 10 ||
          particle.life > particle.maxLife
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + 10;
          particle.life = 0;
        }

        // Draw particle
        const opacity = 1 - particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(${rgb}, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [rgb]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
