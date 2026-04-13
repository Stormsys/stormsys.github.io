import React, { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 100;
const CONNECT_DISTANCE = 160;
const PARTICLE_COLOR = "124, 146, 176";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const runningRef = useRef(false);

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }
    return particles;
  }, []);

  const draw = useCallback(() => {
    if (!runningRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.08;
          ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    for (const p of particles) {
      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.o})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runningRef.current = true;
          draw();
        } else {
          runningRef.current = false;
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.1 }
    );

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}

export default ParticleCanvas;
