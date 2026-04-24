import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ParticleBg, ModelCard, Footer } from "../components/Shared";

const SAMPLE_MODELS = [
  { name: "Void Wyvern", category: "Creatures",    likes: 4821, color: "#8b5cf6" },
  { name: "Mech Overlord", category: "Characters",  likes: 3912, color: "#f43f5e" },
  { name: "Crystal Spire", category: "Architecture",likes: 2340, color: "#14b8a6" },
  { name: "Plasma Katana", category: "Weapons",     likes: 5103, color: "#f59e0b" },
  { name: "Chrome Drifter", category: "Vehicles",    likes: 2891, color: "#3b82f6" },
  { name: "Stone Titan",  category: "Characters",   likes: 3344, color: "#a3e635" },
];

function AnimatedNumber({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.ceil(target / 60);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(cur);
      if (cur >= target) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, [target]);
  return <span>{val.toLocaleString()}</span>;
}

export default function HomePage() {
  const { user } = useAuth();
  const ticks = ["Void Wyvern · 4.8K", "Plasma Katana · 5.1K", "Mech Overlord · 3.9K", "Crystal Spire · 2.3K", "Chrome Drifter · 2.9K", "Stone Titan · 3.3K"];

  return (
    <div>
      <ParticleBg />

      {/* ─── HERO ─── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 52px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>

        {/* Decorative rings */}
        <div style={{ position: "absolute", width: 640, height: 640, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.1)", animation: "rotateCW 32s linear infinite", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -6, left: "50%", width: 12, height: 12, borderRadius: "50%", background: "var(--purple)", transform: "translateX(-50%)", boxShadow: "0 0 12px var(--purple)" }} />
        </div>
        <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(244,63,94,0.08)", animation: "rotateCCW 22s linear infinite", pointerEvents: "none" }}>
          <div style={{ position: "absolute", bottom: -5, left: "50%", width: 10, height: 10, borderRadius: "50%", background: "var(--rose)", transform: "translateX(-50%)" }} />
        </div>
        <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(20,184,166,0.12)", animation: "rotateCW 14s linear infinite", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "var(--purple2)", marginBottom: 28, animation: "slideUp 0.6s ease both", display: "flex", alignItems: "center", gap: 14, zIndex: 1 }}>
          <div style={{ width: 36, height: 1, background: "var(--purple)" }} />
          Powered by DekNek 3D
          <div style={{ width: 36, height: 1, background: "var(--purple)" }} />
        </div>

        <h1 style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 112px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: -2, marginBottom: 10, animation: "slideUp 0.7s 0.1s ease both" }}>
          <div style={{ color: "var(--cream)" }}>Sculpt Your</div>
          <div style={{ color: "var(--purple2)", fontStyle: "italic" }}>Imagination</div>
          <div style={{ WebkitTextStroke: "1.5px var(--cream3)", color: "transparent" }}>Into 3D</div>
        </h1>

        <p style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--cream3)", maxWidth: 480, lineHeight: 1.75, margin: "28px auto 48px", fontWeight: 300, animation: "slideUp 0.7s 0.2s ease both" }}>
          Submit a text prompt or reference image. DekNek 3D's AI and expert artists transform your vision into a professional 3D model — fast.
        </p>

        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "slideUp 0.7s 0.3s ease both" }}>
          <Link to="/submit" className="btn-primary" style={{ textDecoration: "none", fontSize: 11, letterSpacing: 3 }}>
            ✦ Forge My Idea
          </Link>
          <Link to="/gallery" className="btn-outline" style={{ textDecoration: "none", fontSize: 11, letterSpacing: 3 }}>
            Browse Gallery
          </Link>
        </div>

        {/* Floating chips */}
        <div style={{ position: "absolute", left: "4%", top: "36%", zIndex: 1, animation: "floatA 5s ease-in-out infinite" }}>
          <div style={{ background: "var(--surf)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 16px", backdropFilter: "blur(10px)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Latest Upload</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--cream)" }}>Void Wyvern</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--purple2)", marginTop: 2 }}>♥ 4,821 likes</div>
          </div>
        </div>
        <div style={{ position: "absolute", right: "4%", top: "44%", zIndex: 1, animation: "floatB 6s 1.5s ease-in-out infinite" }}>
          <div style={{ background: "var(--surf)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 16px", backdropFilter: "blur(10px)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)", animation: "glowPulse 1.5s infinite" }} />
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--cream)" }}>12 models in progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surf)", padding: "12px 0" }}>
        <div style={{ display: "flex", gap: 52, width: "max-content", animation: "ticker 26s linear infinite" }}>
          {[...ticks, ...ticks].map((t, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: i % 2 === 0 ? "var(--purple)" : "var(--rose)" }}>◆</span>{t} likes
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid var(--border)" }}>
        {[
          { label: "Models Created", val: 12480, color: "var(--purple2)" },
          { label: "Members",        val: 8320,  color: "var(--rose2)" },
          { label: "Requests Done",  val: 5940,  color: "var(--teal2)" },
          { label: "Categories",     val: 24,    color: "var(--cream2)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "32px 44px", borderRight: i < 3 ? "1px solid var(--border)" : "none", transition: "background 0.2s", cursor: "default" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surf)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 700, color: s.color, lineHeight: 1 }}>
              <AnimatedNumber target={s.val} />
              {i < 3 ? "+" : ""}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── FEATURED ─── */}
      <section style={{ padding: "88px 52px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
          <div>
            <div className="section-eyebrow">Community</div>
            <div className="section-title">Featured <span style={{ color: "var(--purple2)" }}>Works</span></div>
          </div>
          <Link to="/gallery" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: 2, textDecoration: "none", textTransform: "uppercase" }}>
            View all →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {SAMPLE_MODELS.map((m, i) => <ModelCard key={i} model={m} tall={i === 0 || i === 4} index={i} />)}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{ padding: "80px 52px", background: "var(--surf)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", zIndex: 1 }}>
        <div className="section-eyebrow">Process</div>
        <div className="section-title" style={{ marginBottom: 52 }}>From <span style={{ color: "var(--purple2)" }}>Idea</span> to Object</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--border)" }}>
          {[
            { n: "01", title: "Describe",  desc: "Write a prompt or upload a reference image. No 3D skill needed — just a clear vision.", c: "var(--purple)" },
            { n: "02", title: "Forge",     desc: "Our AI and DekNek 3D's expert artists sculpt, texture and rig your model to perfection.", c: "var(--rose)" },
            { n: "03", title: "Receive",   desc: "Download in FBX, OBJ or GLTF — ready for games, 3D print, AR, or the community gallery.", c: "var(--teal)" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--surf)", padding: "44px 36px", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surf2)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--surf)"}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 88, fontWeight: 700, color: "rgba(255,255,255,0.025)", lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
              <div style={{ height: 2, width: 36, background: s.c, marginBottom: 20, borderRadius: 2 }} />
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--cream)", marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--cream3)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      {!user && (
        <section style={{ padding: "100px 52px", textAlign: "center", position: "relative", zIndex: 1, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "var(--cream)", letterSpacing: -1, marginBottom: 16, position: "relative" }}>
            Ready to build <span style={{ color: "var(--purple2)" }}>something</span>?
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--cream3)", marginBottom: 40, fontWeight: 300, position: "relative" }}>
            Join 8,000+ creators already on VoxDim.
          </div>
          <Link to="/auth" state={{ mode: "signup" }} className="btn-primary" style={{ textDecoration: "none", fontSize: 11, letterSpacing: 3, padding: "15px 44px" }}>
            Create Free Account →
          </Link>
        </section>
      )}

      <Footer />
    </div>
  );
}
