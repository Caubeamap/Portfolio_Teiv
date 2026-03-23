import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const { Engine, Runner, Bodies, Body, Composite, Constraint } = Matter;

const CARD_W = 270;
const CARD_H = 460;
const ROPE_SEGMENTS = 6;
const ROPE_SEG_LEN = 14;

export default function Lanyard({ children }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const cardBodyRef = useRef(null);
  const cardOverlayRef = useRef(null);
  const animRef = useRef(null);
  const draggingRef = useRef(false);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const anchPosRef = useRef({ x: 0, y: 0 });
  const [cursor, setCursor] = useState('grab');

  // SVG Refs
  const pathRef = useRef(null); // Used for textPath
  const pathShadowRef = useRef(null);
  const pathBaseRef = useRef(null);
  const pathStitchRef = useRef(null);
  const anchorClipRef = useRef(null);
  const anchorHoleRef = useRef(null);
  const cardClipRef = useRef(null);
  
  // Text Animation Refs
  const textPathRef = useRef(null);
  const textOffsetRef = useRef(100);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let w = container.clientWidth;
    let h = container.clientHeight;

    // Engine
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    engineRef.current = engine;

    const anchorX = w / 2;
    const anchorY = 30;
    anchPosRef.current = { x: anchorX, y: anchorY };

    // Anchor (fixed)
    const anchor = Bodies.circle(anchorX, anchorY, 6, {
      isStatic: true,
      collisionFilter: { group: -1 },
    });

    // Rope segments
    const segs = [];
    for (let i = 0; i < ROPE_SEGMENTS; i++) {
      const seg = Bodies.circle(
        anchorX,
        anchorY + (i + 1) * ROPE_SEG_LEN,
        5,
        {
          mass: 0.05,
          frictionAir: 0.08,
          restitution: 0.02,
          collisionFilter: { group: -1 },
        }
      );
      segs.push(seg);
    }

    // Card body
    const lastSegY = anchorY + ROPE_SEGMENTS * ROPE_SEG_LEN;
    const cardBody = Bodies.rectangle(
      anchorX,
      lastSegY + ROPE_SEG_LEN + CARD_H / 2,
      CARD_W * 0.4,
      CARD_H * 0.4,
      {
        mass: 0.3,
        frictionAir: 0.04,
        restitution: 0.05,
        collisionFilter: { group: -1 },
      }
    );
    cardBodyRef.current = cardBody;

    // Invisible walls
    const wallThickness = 40;
    const walls = [
      Bodies.rectangle(w / 2, h + wallThickness / 2, w, wallThickness, { isStatic: true, collisionFilter: { group: -1 } }), // bottom
      Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, collisionFilter: { group: -1 } }), // left
      Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, collisionFilter: { group: -1 } }), // right
    ];

    // Constraints
    const stiff = { stiffness: 0.6, damping: 0.04 };
    const consts = [];

    // Anchor → first seg
    consts.push(Constraint.create({ bodyA: anchor, bodyB: segs[0], length: ROPE_SEG_LEN, ...stiff }));

    // Chain
    for (let i = 0; i < ROPE_SEGMENTS - 1; i++) {
      consts.push(Constraint.create({ bodyA: segs[i], bodyB: segs[i + 1], length: ROPE_SEG_LEN, ...stiff }));
    }

    // Last seg → card top
    consts.push(Constraint.create({
      bodyA: segs[ROPE_SEGMENTS - 1],
      bodyB: cardBody,
      pointB: { x: 0, y: -CARD_H * 0.47 },
      length: ROPE_SEG_LEN,
      ...stiff,
    }));

    Composite.add(engine.world, [anchor, ...segs, cardBody, ...walls, ...consts]);

    // Runner
    const runner = Runner.create();
    let isVisible = true;

    // --- DRAW LOOP (SVG Update) ---
    const draw = () => {
      // Handle drag
      if (draggingRef.current && draggingRef.current.active) {
        const { mx, my } = draggingRef.current;
        Body.setPosition(cardBody, {
          x: mx - mouseOffsetRef.current.x,
          y: my - mouseOffsetRef.current.y,
        });
        Body.setVelocity(cardBody, { x: 0, y: 0 });
        Body.setAngularVelocity(cardBody, 0);
      }

      // Build points
      const aP = anchPosRef.current;
      const cardTopX = cardBody.position.x + Math.sin(cardBody.angle) * (-CARD_H * 0.47);
      const cardTopY = cardBody.position.y - Math.cos(cardBody.angle) * (CARD_H * 0.47);

      const pts = [
        aP,
        ...segs.map(s => ({ x: s.position.x, y: s.position.y })),
        { x: cardTopX, y: cardTopY },
      ];

      // Build string for SVG path
      let d = `M ${pts[0].x} ${pts[0].y}`;
      if (pts.length > 2) {
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          d += ` Q ${pts[i].x} ${pts[i].y} ${xc} ${yc}`;
        }
        d += ` L ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
      } else {
        d += ` L ${pts[1].x} ${pts[1].y}`;
      }

      // Update paths
      if (pathRef.current) pathRef.current.setAttribute('d', d);
      if (pathShadowRef.current) pathShadowRef.current.setAttribute('d', d);
      if (pathBaseRef.current) pathBaseRef.current.setAttribute('d', d);
      if (pathStitchRef.current) pathStitchRef.current.setAttribute('d', d);

      if (anchorClipRef.current) {
        anchorClipRef.current.setAttribute('cx', aP.x);
        anchorClipRef.current.setAttribute('cy', aP.y);
      }

      if (anchorHoleRef.current) {
        anchorHoleRef.current.setAttribute('cx', aP.x);
        anchorHoleRef.current.setAttribute('cy', aP.y);
      }
      
      if (cardClipRef.current) {
        cardClipRef.current.setAttribute('cx', cardTopX);
        cardClipRef.current.setAttribute('cy', cardTopY);
      }

      // Animate Text Scroll
      textOffsetRef.current -= 0.4; // Speed of scrolling (moves upwards)
      if (textOffsetRef.current <= -20) {
        textOffsetRef.current = 120; // Wrap around to the bottom
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${textOffsetRef.current}%`);
      }

      // Position card HTML overlay
      const el = cardOverlayRef.current;
      if (el) {
        el.style.left = `${cardBody.position.x - CARD_W / 2}px`;
        el.style.top = `${cardBody.position.y - CARD_H / 2}px`;
        el.style.transform = `rotate(${cardBody.angle}rad)`;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            Runner.run(runner, engine);
            draw();
          }
        } else {
          isVisible = false;
          Runner.stop(runner);
          cancelAnimationFrame(animRef.current);
        }
      });
    }, { threshold: 0.0 });
    
    observer.observe(container);

    Runner.run(runner, engine);
    draw();

    // --- MOUSE / TOUCH ---
    const getPos = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    };

    const hitTest = (mx, my) => {
      const b = cardBody;
      const dx = mx - b.position.x;
      const dy = my - b.position.y;
      const cos = Math.cos(-b.angle);
      const sin = Math.sin(-b.angle);
      const lx = dx * cos - dy * sin;
      const ly = dx * sin + dy * cos;
      return Math.abs(lx) < CARD_W * 0.55 && Math.abs(ly) < CARD_H * 0.55;
    };

    const onDown = (e) => {
      const pos = getPos(e);
      if (hitTest(pos.x, pos.y)) {
        Body.setStatic(cardBody, true);
        mouseOffsetRef.current = {
          x: pos.x - cardBody.position.x,
          y: pos.y - cardBody.position.y,
        };
        draggingRef.current = { active: true, mx: pos.x, my: pos.y };
        setCursor('grabbing');
        e.preventDefault();
      }
    };

    const onMove = (e) => {
      if (!draggingRef.current?.active) return;
      const pos = getPos(e);
      draggingRef.current = { active: true, mx: pos.x, my: pos.y };
      e.preventDefault();
    };

    const onUp = () => {
      if (!draggingRef.current?.active) return;
      draggingRef.current = { active: false };
      Body.setStatic(cardBody, false);
      setCursor('grab');
    };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    // Resize
    const onResize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      const newAnchorX = w / 2;
      Body.setPosition(anchor, { x: newAnchorX, y: 30 });
      anchPosRef.current = { x: newAnchorX, y: 30 };
      Body.setPosition(walls[0], { x: w / 2, y: h + wallThickness / 2 });
      Body.setPosition(walls[1], { x: -wallThickness / 2, y: h / 2 });
      Body.setPosition(walls[2], { x: w + wallThickness / 2, y: h / 2 });
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      container.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      cancelAnimationFrame(animRef.current);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor,
        overflow: 'hidden',
        minHeight: 650,
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <defs>
          <path id="lanyard-path" ref={pathRef} fill="none" stroke="transparent" />
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Lanyard Shadow */}
        <path ref={pathShadowRef} fill="none" stroke="#000" strokeWidth="26" opacity="0.3" filter="url(#shadow)" />
        
        {/* Lanyard Base Ribbon */}
        <path ref={pathBaseRef} fill="none" stroke="#0f172a" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Inner Stitching/Decor */}
        <path ref={pathStitchRef} fill="none" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />

        {/* Scrolling Text */}
        <text fontSize="14" fontWeight="900" fill="#38bdf8" letterSpacing="4">
          <textPath ref={textPathRef} href="#lanyard-path" startOffset="100%" textAnchor="middle">
            HCMUS
          </textPath>
        </text>

        {/* Anchor Point details */}
        <circle ref={anchorClipRef} r="9" fill="#334155" stroke="#94a3b8" strokeWidth="2" filter="url(#shadow)" />
        <circle ref={anchorHoleRef} r="4" fill="#0f172a" />

        {/* Card Mount details */}
        <circle ref={cardClipRef} r="7" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" filter="url(#shadow)" />
      </svg>
      
      <div
        ref={cardOverlayRef}
        style={{
          position: 'absolute',
          width: CARD_W,
          height: CARD_H,
          pointerEvents: 'none',
          transformOrigin: 'center center',
          willChange: 'transform, left, top',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
}
