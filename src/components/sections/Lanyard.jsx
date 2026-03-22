import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const { Engine, Runner, Bodies, Body, Composite, Constraint } = Matter;

const CARD_W = 210;
const CARD_H = 310;
const ROPE_SEGMENTS = 6;
const ROPE_SEG_LEN = 16;

export default function Lanyard({ children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const cardBodyRef = useRef(null);
  const ropeSegsRef = useRef([]);
  const cardOverlayRef = useRef(null);
  const animRef = useRef(null);
  const draggingRef = useRef(false);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const anchPosRef = useRef({ x: 0, y: 0 });
  const [cursor, setCursor] = useState('grab');

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

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

    // Rope segments — start hanging downward in a straight line
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
    ropeSegsRef.current = segs;

    // Card body — positioned right below the last rope segment
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

    // Invisible walls to keep card in bounds
    const wallThickness = 40;
    const walls = [
      Bodies.rectangle(w / 2, h + wallThickness / 2, w, wallThickness, { isStatic: true, render: { visible: false }, collisionFilter: { group: -1 } }), // bottom
      Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, render: { visible: false }, collisionFilter: { group: -1 } }), // left
      Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, render: { visible: false }, collisionFilter: { group: -1 } }), // right
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
      pointB: { x: 0, y: -CARD_H * 0.2 },
      length: ROPE_SEG_LEN,
      ...stiff,
    }));

    Composite.add(engine.world, [anchor, ...segs, cardBody, ...walls, ...consts]);

    // Runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // --- DRAW LOOP ---
    let cW = w;
    let cH = h;

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

      // Clear
      const curCtx = canvas.getContext('2d');
      curCtx.save();
      curCtx.setTransform(1, 0, 0, 1, 0, 0);
      curCtx.clearRect(0, 0, canvas.width, canvas.height);
      curCtx.restore();

      // Build points: anchor → segments → card top
      const aP = anchPosRef.current;
      const cardTopX = cardBody.position.x + Math.sin(cardBody.angle) * (-CARD_H * 0.2);
      const cardTopY = cardBody.position.y - Math.cos(cardBody.angle) * (CARD_H * 0.2);

      const pts = [
        aP,
        ...segs.map(s => ({ x: s.position.x, y: s.position.y })),
        { x: cardTopX, y: cardTopY },
      ];

      // Draw smooth rope
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      if (pts.length > 2) {
        // Smooth quadratic Bézier through midpoints
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      } else {
        ctx.lineTo(pts[1].x, pts[1].y);
      }

      // Rope stroke with gradient
      const grad = ctx.createLinearGradient(aP.x, aP.y, cardTopX, cardTopY);
      grad.addColorStop(0, '#64748b');
      grad.addColorStop(1, '#94a3b8');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Anchor clip (bigger, metallic)
      ctx.beginPath();
      ctx.arc(aP.x, aP.y, 7, 0, Math.PI * 2);
      const anchorGrad = ctx.createRadialGradient(aP.x - 2, aP.y - 2, 1, aP.x, aP.y, 7);
      anchorGrad.addColorStop(0, '#9ca3af');
      anchorGrad.addColorStop(1, '#4b5563');
      ctx.fillStyle = anchorGrad;
      ctx.fill();

      // Card clip
      ctx.beginPath();
      ctx.arc(cardTopX, cardTopY, 5, 0, Math.PI * 2);
      const clipGrad = ctx.createRadialGradient(cardTopX - 1, cardTopY - 1, 1, cardTopX, cardTopY, 5);
      clipGrad.addColorStop(0, '#d1d5db');
      clipGrad.addColorStop(1, '#6b7280');
      ctx.fillStyle = clipGrad;
      ctx.fill();

      // Position card HTML overlay
      const el = cardOverlayRef.current;
      if (el) {
        el.style.left = `${cardBody.position.x - CARD_W / 2}px`;
        el.style.top = `${cardBody.position.y - CARD_H / 2}px`;
        el.style.transform = `rotate(${cardBody.angle}rad)`;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

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
      cW = container.clientWidth;
      cH = container.clientHeight;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cW * d;
      canvas.height = cH * d;
      canvas.style.width = `${cW}px`;
      canvas.style.height = `${cH}px`;
      const c = canvas.getContext('2d');
      c.scale(d, d);
      const newAnchorX = cW / 2;
      Body.setPosition(anchor, { x: newAnchorX, y: 30 });
      anchPosRef.current = { x: newAnchorX, y: 30 };
      // Update wall positions
      Body.setPosition(walls[0], { x: cW / 2, y: cH + wallThickness / 2 });
      Body.setPosition(walls[1], { x: -wallThickness / 2, y: cH / 2 });
      Body.setPosition(walls[2], { x: cW + wallThickness / 2, y: cH / 2 });
    };
    window.addEventListener('resize', onResize);

    return () => {
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
        minHeight: 520,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
      <div
        ref={cardOverlayRef}
        style={{
          position: 'absolute',
          width: CARD_W,
          height: CARD_H,
          pointerEvents: 'none',
          transformOrigin: 'center center',
          willChange: 'transform, left, top',
        }}
      >
        {children}
      </div>
    </div>
  );
}
