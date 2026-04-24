import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user } = useAuth();

  const initialMode = location.state?.mode || 'login';
  const [mode,    setMode]    = useState(initialMode);
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(location.state?.from || '/dashboard', { replace: true });
  }, [user, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      // Backend sends { error: '...' }
      setError(err.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', background: 'var(--bg)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', top: '10%', left: '-10%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)', bottom: '5%', right: '-8%', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440 }}>

        {/* Back button */}
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none',
          marginBottom: 32, transition: 'color 0.2s',
        }}>
          ← Back to Home
        </Link>

        {/* Card */}
        <div style={{
          background: 'var(--surf)', border: '1px solid var(--border2)',
          borderRadius: 14, padding: '44px 40px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          animation: 'scaleIn 0.35s ease',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top gradient line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--purple), var(--rose), transparent)' }} />

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--cream)' }}>
              Vox<span style={{ color: 'var(--purple)' }}>Dim</span>
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)', marginBottom: 6 }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)' }}>
              {mode === 'login' ? 'Sign in to your VoxDim account' : 'Join creators on VoxDim3D'}
            </div>
          </div>

          {/* Mode tabs */}
          <div style={{ display: 'flex', background: 'var(--bg2)', borderRadius: 8, padding: 4, marginBottom: 24 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
                flex: 1, padding: '9px 0', border: 'none', borderRadius: 6,
                background: mode === m ? 'var(--purple)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--muted)',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', fontWeight: mode === m ? 600 : 400,
              }}>{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 6, padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fb7185', marginBottom: 18 }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', justifyContent: 'center', padding: '14px',
                background: loading ? 'var(--surf3)' : 'var(--purple)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 11, letterSpacing: 3,
              }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Switch mode */}
          <div style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--purple2)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)' }}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>
          By continuing, you agree to VoxDim's Terms of Service
        </div>
      </div>
    </div>
  );
}
