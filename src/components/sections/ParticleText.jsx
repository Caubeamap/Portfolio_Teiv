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

    const init = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 360; 
      
      const w = window.innerWidth;
      
      // Increased font sizes significantly
      let fontSize = 160;
      let lineHeight = 155;
      let gap = 5;
      
      if (w < 640) {
        fontSize = 75; lineHeight = 80; gap = 3;
        mouse.radius = 50;
        canvas.height = 200;
      } else if (w < 1024) {
        fontSize = 110; lineHeight = 115; gap = 4;
        mouse.radius = 60;
        canvas.height = 280;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textBaseline = 'top';
      
      const isDesktop = w >= 1024;
      ctx.textAlign = isDesktop ? 'left' : 'center';
      const xPos = isDesktop ? 0 : canvas.width / 2;

      // Use stronger contrast for light theme background
      ctx.fillStyle = '#2563eb';
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      ctx.fillText('Việt', xPos, 10);

      const textWidth = ctx.measureText('Hoàng.').width;
      const gradient = ctx.createLinearGradient(
        isDesktop ? xPos : xPos - textWidth/2, 
        0, 
        isDesktop ? xPos + textWidth : xPos + textWidth/2, 
        0
      );
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#0ea5e9');
      
      ctx.fillStyle = gradient;
      ctx.fillText('Hoàng.', xPos, 10 + lineHeight);

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
              size: gap * 0.75
            });
          }
        }
      }
    };

    const animate = () => {
      if (!isVisible) return; // Pause animation when off-screen

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowColor = 'rgba(37, 99, 235, 0.28)';
      ctx.shadowBlur = 3;

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
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

    // Use IntersectionObserver to pause off-screen rendering (Massive FPS boost)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
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

    setTimeout(init, 100);
    animate();

    const handleReInit = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(init, 300);
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
      particles.forEach(p => {
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
      className="w-full cursor-crosshair touch-none" 
      style={{ display: 'block', margin: '0 auto' }}
      title="Click or hover to scatter the particles!"
    />
  );
}
