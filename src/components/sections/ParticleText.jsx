import { useEffect, useRef } from 'react';

export default function ParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 80 };
    let isVisible = true;
    let resizeTimer;

    const init = () => {
      const parent = canvas.parentElement;
      const width = Math.max(parent.clientWidth, 280);
      const w = window.innerWidth;
      const isDesktop = w >= 1024;

      canvas.width = width;

      let fontSize = isDesktop
        ? Math.min(150, Math.max(112, width * 0.22))
        : Math.min(76, Math.max(58, width * 0.24));
      let lineHeight = fontSize * 1.08;
      let gap = 5;

      if (w < 640) {
        gap = 3;
        mouse.radius = 50;
      } else if (w < 1024) {
        fontSize = Math.min(108, Math.max(84, width * 0.2));
        lineHeight = fontSize * 1.08;
        gap = 4;
        mouse.radius = 60;
      } else {
        mouse.radius = 80;
      }

      const xPos = isDesktop ? 0 : canvas.width / 2;
      const firstLine = 'Việt';
      const secondLine = 'Hoàng.';

      ctx.textBaseline = 'top';
      ctx.textAlign = isDesktop ? 'left' : 'center';
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;

      const maxTextWidth = canvas.width * (isDesktop ? 0.98 : 0.92);
      const widestText = Math.max(
        ctx.measureText(firstLine).width,
        ctx.measureText(secondLine).width,
      );

      if (widestText > maxTextWidth) {
        fontSize *= maxTextWidth / widestText;
        lineHeight = fontSize * 1.08;
        ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      }

      canvas.height = Math.ceil((lineHeight * 2) + (w < 640 ? 32 : 56));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textBaseline = 'top';
      ctx.textAlign = isDesktop ? 'left' : 'center';
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = '#2563eb';
      ctx.fillText(firstLine, xPos, 10);

      const textWidth = ctx.measureText(secondLine).width;
      const gradient = ctx.createLinearGradient(
        isDesktop ? xPos : xPos - textWidth / 2,
        0,
        isDesktop ? xPos + textWidth : xPos + textWidth / 2,
        0,
      );
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#0ea5e9');

      ctx.fillStyle = gradient;
      ctx.fillText(secondLine, xPos, 10 + lineHeight);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = [];
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imageData.data[index + 3];
          if (alpha > 128) {
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            particles.push({
              x: x + (Math.random() - 0.5) * 20,
              y: y + (Math.random() - 0.5) * 20,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              color: `rgb(${r},${g},${b})`,
              size: gap * 0.75,
            });
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowColor = 'rgba(37, 99, 235, 0.28)';
      ctx.shadowBlur = 3;

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < mouse.radius) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = forceDirectionX * force * 5;
          const directionY = forceDirectionY * force * 5;
          p.vx -= directionX;
          p.vy -= directionY;
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        const springDx = p.baseX - p.x;
        const springDy = p.baseY - p.y;
        p.x += springDx * 0.08;
        p.y += springDy * 0.08;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animate();
          }
        } else {
          isVisible = false;
        }
      });
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const initTimer = setTimeout(init, 100);
    animate();

    const handleReInit = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 250);
    };

    window.addEventListener('resize', handleReInit);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = () => {
      particles.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 40;
        p.vy += (Math.random() - 0.5) * 40;
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleReInit);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full cursor-crosshair touch-pan-y"
      style={{ display: 'block', margin: '0 auto' }}
      title="Click or hover to scatter the particles!"
    />
  );
}
