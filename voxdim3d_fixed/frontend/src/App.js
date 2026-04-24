import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar       from "./components/Navbar";
import HomePage     from "./pages/HomePage";
import GalleryPage  from "./pages/GalleryPage";
import SubmitPage   from "./pages/SubmitPage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage     from "./pages/AuthPage";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 4 }}>LOADING...</div>
    </div>
  );
  return user ? children : <Navigate to="/auth" state={{ mode: "login" }} replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/gallery"   element={<GalleryPage />} />
        <Route path="/submit"    element={<SubmitPage />} />
        <Route path="/auth"      element={<AuthPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
