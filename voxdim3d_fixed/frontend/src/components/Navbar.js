import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/submit", label: "Submit" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      padding: "16px 52px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(7,5,8,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(139,92,246,0.1)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.4s",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--cream)", letterSpacing: 1, lineHeight: 1 }}>
          Vox<span style={{ color: "var(--purple)" }}>Dim</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 7, letterSpacing: 4, color: "var(--muted)", textTransform: "uppercase" }}>
          3D Platform
        </div>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 28 }}>
        {links.map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3,
            textTransform: "uppercase", textDecoration: "none",
            color: location.pathname === to ? "var(--purple2)" : "var(--muted)",
            borderBottom: location.pathname === to ? "1px solid var(--purple)" : "1px solid transparent",
            paddingBottom: 2, transition: "color 0.2s",
          }}>{label}</Link>
        ))}
      </div>

      {/* Auth buttons */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {user ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: user.avatar ? "transparent" : "var(--purple)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#fff",
                border: "2px solid rgba(139,92,246,0.3)",
              }}>
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : user.name?.[0]?.toUpperCase()}
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--cream2)" }}>{user.name}</span>
            </div>
            <button onClick={logout} style={{
              background: "transparent", border: "1px solid var(--border)",
              color: "var(--muted)", padding: "7px 16px", borderRadius: 6,
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth" state={{ mode: "login" }} style={{
              background: "transparent", border: "1px solid var(--border)",
              color: "var(--cream2)", padding: "8px 18px", borderRadius: 6,
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
              textDecoration: "none", display: "inline-block",
            }}>Sign In</Link>
            <Link to="/auth" state={{ mode: "signup" }} style={{
              background: "var(--purple)", border: "none", color: "#fff",
              padding: "8px 20px", borderRadius: 6,
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
              textDecoration: "none", display: "inline-block",
              transition: "background 0.2s",
            }}>Get Access</Link>
          </>
        )}
      </div>
    </nav>
  );
}
