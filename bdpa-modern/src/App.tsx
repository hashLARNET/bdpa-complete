import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';
import { ProgressDashboard } from './components/ProgressDashboard';
import { MeasurementsModule } from './components/MeasurementsModule';
import type { Usuario } from './types';

function App() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedObra, setSelectedObra] = useState<string>('los-encinos-id'); // ID fijo para Los Encinos

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser?.userData || null);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { userData } = await authService.login(email, password);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <img 
                  src="https://i.imgur.com/Uw8kbQO.png" 
                  alt="Logo Larnet" 
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">BDPA Modern</h1>
                  <p className="text-sm text-gray-500">Los Encinos - Control de Progreso</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user.nombre} {user.apellido} ({user.rol})
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/dashboard" 
              element={<ProgressDashboard obraId={selectedObra} />} 
            />
            <Route 
              path="/mediciones" 
              element={<MeasurementsModule obraId={selectedObra} />} 
            />
          </Routes>
        </main>

        {/* Navigation tabs */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex">
              <NavTab 
                to="/dashboard" 
                icon="📊" 
                label="Dashboard" 
                active={window.location.pathname === '/dashboard'}
              />
              <NavTab 
                to="/mediciones" 
                icon="📏" 
                label="Mediciones" 
                active={window.location.pathname === '/mediciones'}
              />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

// Componente de Login
const LoginForm: React.FC<{ onLogin: (email: string, password: string) => Promise<void> }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onLogin(email, password);
    } catch (error) {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="https://i.imgur.com/Uw8kbQO.png" 
            alt="Logo Larnet" 
            className="h-16 w-16 mx-auto rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">BDPA Modern</h1>
          <p className="text-gray-600">Los Encinos - Control de Progreso</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>admin@larnet.cl / admin123</p>
          <p>supervisor@larnet.cl / sup123</p>
        </div>
      </div>
    </div>
  );
};

// Componente de navegación
const NavTab: React.FC<{ to: string; icon: string; label: string; active: boolean }> = ({ 
  to, icon, label, active 
}) => {
  return (
    <a
      href={to}
      className={`flex-1 flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors ${
        active 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <span className="text-lg mb-1">{icon}</span>
      {label}
    </a>
  );
};

export default App;