import teivPhoto from '../../assets/teiv.jpg';

export default function StudentCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#111827',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b, #334155)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', color: '#94a3b8', textTransform: 'uppercase' }}>
          FIT@HCMUS
        </span>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
      </div>

      {/* Photo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 24px 12px' }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.15)',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <img
            src={teivPhoto}
            alt="Việt Hoàng"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            draggable={false}
          />
        </div>

        {/* Name & Role */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 6 }}>
            Data Engineer · Analyst
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Việt Hoàng
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div
        style={{
          background: '#1e293b',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase' }}>
          Intern
        </span>
        {/* QR code placeholder */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            background: '#ffffff',
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 1,
            padding: 3,
          }}
        >
          {[1,1,1,0,1, 0,1,0,1,0, 1,0,1,0,1, 0,1,0,1,0, 1,0,1,1,1].map((v, i) => (
            <div key={i} style={{ borderRadius: 1, background: v ? '#111827' : '#e5e7eb' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
