import { useState } from "react";

/* ── Ambient background orbs + grid ── */
export function ParticleBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Orbs */}
      {[
        { w: 600, h: 600, top: "5%",  left: "-15%", c: "rgba(139,92,246,0.12)", d: "0s",  dur: "20s" },
        { w: 400, h: 400, top: "55%", right:"-10%",  c: "rgba(244,63,94,0.08)",  d: "-8s", dur: "25s" },
        { w: 300, h: 300, top: "30%", left: "45%",   c: "rgba(20,184,166,0.07)", d: "-14s",dur: "18s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.h,
          top: o.top, left: o.left, right: o.right,
          background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
          borderRadius: "50%",
          animation: `orbDrift ${o.dur} ${o.d} ease-in-out infinite`,
        }} />
      ))}
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse at center, transparent 10%, black 75%)",
      }} />
      {/* Noise grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "120px",
      }} />
    </div>
  );
}

/* ── Model Card ── */
const MODEL_COLORS = ["#8b5cf6","#f43f5e","#14b8a6","#f59e0b","#3b82f6","#a3e635","#ec4899","#06b6d4"];

export function ModelCard({ model, tall, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(model.likes || Math.floor(Math.random() * 4000 + 800));
  const [hov, setHov] = useState(false);
  const color = model.color || MODEL_COLORS[index % MODEL_COLORS.length];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="card"
      style={{
        overflow: "hidden", cursor: "pointer",
        gridRow: tall ? "span 2" : "span 1",
        borderColor: hov ? "rgba(139,92,246,0.35)" : "var(--border)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.3s",
      }}
    >
      {/* Visual area */}
      <div style={{
        height: tall ? 260 : 130,
        background: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Rotating shape */}
        <div style={{
          width: 64, height: 64,
          border: `2px solid ${color}`,
          borderRadius: 4,
          transform: hov ? "rotate(45deg) scale(1.2)" : "rotate(12deg)",
          transition: "transform 0.5s ease",
          opacity: 0.85,
        }} />
        {/* Pulse rings */}
        <div style={{
          position: "absolute", width: 80, height: 80,
          borderRadius: "50%", border: `1px solid ${color}55`,
          animation: "pulseRing 2.5s ease-out infinite",
        }} />
        {tall && (
          <div style={{
            position: "absolute", width: 120, height: 120,
            borderRadius: "50%", border: `1px solid ${color}33`,
            animation: "pulseRing 2.5s 0.8s ease-out infinite",
          }} />
        )}
        {/* Category badge */}
        <div className="badge" style={{
          position: "absolute", top: 12, left: 12,
          background: `${color}18`, border: `1px solid ${color}44`,
          color: color,
        }}>{model.category || model.cat}</div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--cream)", marginBottom: 3 }}>
            {model.name || model.prompt?.slice(0, 28) + "..."}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1 }}>
            {model.userName || "DKN Team"}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); setCount(c => liked ? c - 1 : c + 1); }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: 4 }}
        >
          <span style={{ fontSize: 16, color: liked ? "#f43f5e" : "var(--muted)", transform: liked ? "scale(1.3)" : "scale(1)", transition: "all 0.2s", display: "block" }}>♥</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)" }}>{count.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 52px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)" }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--cream)" }}>
          Vox<span style={{ color: "var(--purple)" }}>Dim</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>
          Built for DekNek 3D · 2025
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
        contact@deknek3d.in
      </div>
    </footer>
  );
}
