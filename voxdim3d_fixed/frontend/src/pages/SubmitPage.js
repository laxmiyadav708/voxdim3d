import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ParticleBg, Footer } from '../components/Shared';
import { API } from '../context/AuthContext';

const CATEGORIES = ['Characters','Creatures','Vehicles','Architecture','Furniture','Weapons','Nature','Other'];
const STYLES     = ['Realistic','Stylized','Sci-Fi','Fantasy','Low Poly','Horror / Dark','Anime','Abstract'];

function FLabel({ children }) {
  return <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>{children}</label>;
}

export default function SubmitPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [tab,     setTab]     = useState('text');
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState('');

  const [form, setForm] = useState({
    prompt: '', category: '', style: '',
    name:   user?.name  || '',
    email:  user?.email || '',
    notes: '', referenceLinks: '',
    isPublic: false,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/auth', { state: { mode: 'signup', from: '/submit' } });
      return;
    }

    setError(''); setLoading(true);
    try {
      await axios.post(`${API}/requests`, { ...form, type: tab });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', animation: 'scaleIn 0.5s ease' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(139,92,246,0.12)', border: '2px solid var(--purple)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px', fontSize: 28,
        }}>✦</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: 'var(--cream)', marginBottom: 12 }}>
          Request <span style={{ color: 'var(--purple2)' }}>Sent!</span>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--cream3)', marginBottom: 36, maxWidth: 400, lineHeight: 1.7 }}>
          Your 3D request is in the forge. The team will review and reach out soon.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setDone(false); setForm({ prompt:'', category:'', style:'', name: user?.name||'', email: user?.email||'', notes:'', referenceLinks:'', isPublic:false }); }}
            className="btn-outline" style={{ fontSize: 11, letterSpacing: 3 }}>
            Submit Another
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ fontSize: 11, letterSpacing: 3 }}>
            View Dashboard →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <ParticleBg />
      <div style={{ padding: '120px 52px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* Header */}
          <div className="section-eyebrow">Create</div>
          <div className="section-title" style={{ marginBottom: 8 }}>
            Submit Your <span style={{ color: 'var(--purple2)' }}>Request</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted)', marginBottom: 48, fontWeight: 300 }}>
            {user
              ? <>Signed in as <span style={{ color: 'var(--purple2)' }}>{user.email}</span></>
              : <><Link to="/auth" state={{ mode: 'signup' }} style={{ color: 'var(--purple2)' }}>Create an account</Link> to track your requests and view status updates</>}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 36 }}>
            {[['text','✦ Text Prompt'],['image','⬆ Image Reference'],['custom','★ Custom Brief']].map(([v, l]) => (
              <button key={v} onClick={() => setTab(v)} style={{
                padding: '11px 24px', background: 'transparent', border: 'none',
                borderBottom: tab === v ? '2px solid var(--purple)' : '2px solid transparent',
                color: tab === v ? 'var(--cream)' : 'var(--muted)',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', marginBottom: -1,
              }}>{l}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* TEXT TAB */}
            {tab === 'text' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ marginBottom: 16 }}>
                  <FLabel>Your Prompt *</FLabel>
                  <textarea
                    value={form.prompt}
                    onChange={e => set('prompt', e.target.value.slice(0, 500))}
                    placeholder="Describe your 3D model — style, materials, era, mood, use case, scale..."
                    required className="form-input"
                    style={{ minHeight: 120, resize: 'vertical', lineHeight: 1.6 }}
                  />
                  <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>
                    {form.prompt.length}/500
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                  <div>
                    <FLabel>Category</FLabel>
                    <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select category...</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <FLabel>Art Style</FLabel>
                    <select value={form.style} onChange={e => set('style', e.target.value)} className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Any style...</option>
                      {STYLES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* IMAGE TAB */}
            {tab === 'image' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{
                  border: '1px dashed rgba(139,92,246,0.3)', borderRadius: 10,
                  padding: '52px 40px', textAlign: 'center', cursor: 'pointer',
                  background: 'rgba(139,92,246,0.03)', marginBottom: 20, transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10, color: 'var(--purple2)' }}>↑</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream3)' }}>
                    Drop your reference image here or <span style={{ color: 'var(--purple2)' }}>click to browse</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 8, letterSpacing: 1 }}>
                    PNG · JPG · WEBP · Max 10MB
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FLabel>Describe the reference *</FLabel>
                  <textarea
                    value={form.prompt}
                    onChange={e => set('prompt', e.target.value)}
                    placeholder="What should we focus on from this reference image?"
                    required className="form-input"
                    style={{ minHeight: 90, resize: 'vertical' }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FLabel>Additional Notes</FLabel>
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    placeholder="Any extra details..." className="form-input"
                    style={{ minHeight: 70, resize: 'vertical' }} />
                </div>
              </div>
            )}

            {/* CUSTOM TAB */}
            {tab === 'custom' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ marginBottom: 16 }}>
                  <FLabel>Full Brief *</FLabel>
                  <textarea
                    value={form.prompt}
                    onChange={e => set('prompt', e.target.value)}
                    placeholder="Dimensions, materials, colors, target platform (game engine, 3D print, AR/VR), polygon budget, file format needed..."
                    required className="form-input"
                    style={{ minHeight: 140, resize: 'vertical' }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <FLabel>Reference Links (optional)</FLabel>
                  <input value={form.referenceLinks} onChange={e => set('referenceLinks', e.target.value)}
                    placeholder="ArtStation, Pinterest, Sketchfab URLs..." className="form-input" />
                </div>
              </div>
            )}

            {/* Common contact fields — WIRED to form state */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 8 }}>
              <div>
                <FLabel>Full Name *</FLabel>
                <input
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Your name"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <FLabel>Email *</FLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Public toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 28px' }}>
              <div onClick={() => set('isPublic', !form.isPublic)} style={{
                width: 42, height: 24, borderRadius: 100,
                background: form.isPublic ? 'var(--purple)' : 'var(--surf2)',
                border: '1px solid var(--border2)',
                cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
              }}>
                <div style={{
                  position: 'absolute', top: 3, left: form.isPublic ? 20 : 3,
                  width: 16, height: 16, borderRadius: '50%',
                  background: form.isPublic ? '#fff' : 'var(--muted)',
                  transition: 'left 0.2s',
                }} />
              </div>
              <span
                style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream3)', cursor: 'pointer' }}
                onClick={() => set('isPublic', !form.isPublic)}>
                Publish to community gallery after completion
              </span>
            </div>

            {error && (
              <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 8, padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fb7185', marginBottom: 20 }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', justifyContent: 'center', padding: 16,
                fontSize: 11, letterSpacing: 4,
                background: loading ? 'var(--surf3)' : 'var(--purple)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}>
              {loading ? 'Submitting...' : user ? 'Submit to Forge →' : 'Sign Up & Submit →'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
