import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ParticleBg, Footer } from '../components/Shared';
import { API } from '../context/AuthContext';

const STATUS_META = {
  pending:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  label: 'Pending'     },
  'in-progress':{ color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', label: 'In Progress' },
  done:         { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.25)',  label: 'Completed'   },
  cancelled:    { color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',   border: 'rgba(244,63,94,0.25)',   label: 'Cancelled'   },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate          = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (!user) { navigate('/auth', { state: { mode: 'login' } }); return; }

    axios.get(`${API}/requests/mine`)
      .then(({ data }) => setRequests(data))
      .catch(() => setError('Failed to load requests. Please refresh.'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    setDeleting(id);
    try {
      await axios.delete(`${API}/requests/${id}`);
      // Use r.id (not r._id — we use JSON, not MongoDB)
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch {
      alert('Failed to delete request. Try again.');
    } finally {
      setDeleting(null);
    }
  };

  const stats = [
    { label: 'Total',       val: requests.length,                                        color: 'var(--purple2)' },
    { label: 'Pending',     val: requests.filter(r => r.status === 'pending').length,     color: '#f59e0b'        },
    { label: 'In Progress', val: requests.filter(r => r.status === 'in-progress').length, color: 'var(--purple)'  },
    { label: 'Completed',   val: requests.filter(r => r.status === 'done').length,        color: '#4ade80'        },
  ];

  if (!user) return null;

  return (
    <div>
      <ParticleBg />
      <div style={{ padding: '120px 52px 80px', position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* Profile header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 68, height: 68, borderRadius: '50%',
              background: 'var(--purple)',
              border: '3px solid rgba(139,92,246,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#fff',
            }}>
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1 }}>
                Hello, <span style={{ color: 'var(--purple2)' }}>{user.name}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>
                {user.email}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/submit" className="btn-primary" style={{ textDecoration: 'none', fontSize: 10, letterSpacing: 3 }}>
              + New Request
            </Link>
            <button onClick={logout} style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--muted)', padding: '8px 16px', borderRadius: 6,
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>Logout</button>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 48 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 10, padding: '22px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Requests list */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--cream)', marginBottom: 20 }}>
          Your <span style={{ color: 'var(--purple2)' }}>Requests</span>
        </div>

        {error && (
          <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 8, padding: '12px 16px', color: '#fb7185', fontFamily: 'var(--font-body)', fontSize: 13, marginBottom: 20 }}>
            ⚠ {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: 3 }}>LOADING...</div>
        ) : requests.length === 0 ? (
          <div style={{ background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 10, padding: '56px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>◈</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--cream3)', marginBottom: 8 }}>No requests yet</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Submit your first 3D model request to get started.</div>
            <Link to="/submit" className="btn-primary" style={{ textDecoration: 'none', fontSize: 10, letterSpacing: 3 }}>
              Make a Request →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {requests.map(r => {
              const sm = STATUS_META[r.status] || STATUS_META.pending;
              return (
                <div key={r.id} style={{
                  background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 10,
                  padding: '20px 24px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--cream)', marginBottom: 5 }}>
                      {r.name || (r.prompt?.slice(0, 60) + (r.prompt?.length > 60 ? '...' : '')) || 'Custom Brief'}
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {r.category && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--purple2)', letterSpacing: 1, textTransform: 'uppercase' }}>
                          {r.category}
                        </span>
                      )}
                      {r.style && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>
                          {r.style}
                        </span>
                      )}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 1 }}>
                        {r.type?.toUpperCase()} · {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      {r.isPublic && (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--teal2)', letterSpacing: 1, textTransform: 'uppercase' }}>
                          Public
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      background: sm.bg, border: `1px solid ${sm.border}`, borderRadius: 100,
                      padding: '5px 14px', fontFamily: 'var(--font-mono)', fontSize: 9,
                      letterSpacing: 2, textTransform: 'uppercase', color: sm.color,
                    }}>{sm.label}</div>
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      style={{
                        background: 'transparent', border: '1px solid rgba(244,63,94,0.2)',
                        color: deleting === r.id ? 'var(--muted)' : 'rgba(244,63,94,0.6)',
                        padding: '5px 12px', borderRadius: 6, fontFamily: 'var(--font-mono)',
                        fontSize: 9, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.2s',
                        textTransform: 'uppercase',
                      }}>
                      {deleting === r.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
