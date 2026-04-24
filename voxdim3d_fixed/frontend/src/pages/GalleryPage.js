import { useState, useEffect } from "react";
import axios from "axios";
import { ModelCard, Footer, ParticleBg } from "../components/Shared";
import { API } from "../context/AuthContext";

const CATS = ["All","Characters","Creatures","Vehicles","Furniture","Weapons","Architecture","Nature"];

const DEMO_MODELS = [
  { name: "Emerald Wyvern",  category: "Creatures",     likes: 4821, color: "#8b5cf6" },
  { name: "Mech Overlord",   category: "Characters",    likes: 3912, color: "#f43f5e" },
  { name: "Void Throne",     category: "Furniture",     likes: 2340, color: "#14b8a6" },
  { name: "Plasma Katana",   category: "Weapons",       likes: 5103, color: "#f59e0b" },
  { name: "Chrome Speeder",  category: "Vehicles",      likes: 2891, color: "#3b82f6" },
  { name: "Stone Golem",     category: "Characters",    likes: 3344, color: "#a3e635" },
  { name: "Crystal Spire",   category: "Architecture",  likes: 1982, color: "#d4a843" },
  { name: "Sand Drake",      category: "Creatures",     likes: 2567, color: "#fb923c" },
  { name: "Obsidian Throne", category: "Furniture",     likes: 1443, color: "#9c92b4" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [models, setModels] = useState(DEMO_MODELS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/requests/gallery`, { params: { cat: active } });
        if (data.length > 0) setModels(data);
        else setModels(active === "All" ? DEMO_MODELS : DEMO_MODELS.filter(m => m.category === active));
      } catch {
        setModels(active === "All" ? DEMO_MODELS : DEMO_MODELS.filter(m => m.category === active));
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [active]);

  return (
    <div>
      <ParticleBg />
      <div style={{ padding: "120px 52px 80px", position: "relative", zIndex: 1 }}>

        <div className="section-eyebrow">Community</div>
        <div className="section-title" style={{ marginBottom: 40 }}>
          3D <span style={{ color: "var(--purple2)" }}>Gallery</span>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: "7px 18px", border: `1px solid ${active === c ? "var(--purple)" : "var(--border)"}`,
              background: active === c ? "rgba(139,92,246,0.15)" : "transparent",
              color: active === c ? "var(--purple2)" : "var(--muted)",
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", borderRadius: 6, transition: "all 0.2s",
            }}>{c}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 3 }}>
            LOADING...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {models.map((m, i) => <ModelCard key={i + m.name} model={m} tall={i % 5 === 0} index={i} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
