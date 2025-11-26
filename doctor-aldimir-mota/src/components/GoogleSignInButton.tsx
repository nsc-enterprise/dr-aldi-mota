import { useState, useEffect } from 'react';

const GOOGLE_CLIENT_ID = '875894762854-s3mua87g0k4j9r5645hff64d4vhtfehm.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = typeof window !== 'undefined' ?
  `${window.location.origin}/auth/google/callback` :
  '';

export function GoogleSignInButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('google_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('google_user');
      }
    }
  }, []);

  const generateGoogleAuthUrl = () => {
    const scope = 'openid email profile';
    const responseType = 'code';
    const state = Math.random().toString(36).substring(7); // Para seguridad

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=${responseType}&` +
      `state=${state}&` +
      `access_type=offline&` +
      `prompt=consent`;

    return authUrl;
  };

  const handleSignIn = () => {
    setLoading(true);
    try {
      const authUrl = generateGoogleAuthUrl();
      window.location.href = authUrl; // Redirigir a Google OAuth
    } catch (error) {
      console.error('Error iniciando sign in:', error);
      alert('Error al iniciar sesión con Google');
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('google_user');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            <img src={user.picture} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-gray-700">{user.name}</span>
          </div>
          <button onClick={handleSignOut} className="bg-gray-200 px-3 py-1 rounded text-sm">Cerrar sesión</button>
        </>
      ) : (
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
            <g><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.22l6.93-6.93C36.16 2.34 30.45 0 24 0 14.64 0 6.27 5.7 2.13 14.02l8.06 6.27C12.6 13.16 17.82 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.56-.14-3.07-.41-4.53H24v9.08h12.44c-.54 2.9-2.18 5.36-4.64 7.02l7.19 5.6C43.73 37.36 46.1 31.44 46.1 24.5z"/><path fill="#FBBC05" d="M10.19 28.29c-.62-1.86-.98-3.83-.98-5.79s.36-3.93.98-5.79l-8.06-6.27C.74 13.7 0 18.7 0 24s.74 10.3 2.13 14.02l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.45 0 12.16-2.13 16.67-5.81l-7.19-5.6c-2.01 1.35-4.59 2.16-7.48 2.16-6.18 0-11.4-3.66-13.81-8.99l-8.06 6.27C6.27 42.3 14.64 48 24 48z"/></g>
          </svg>
          {loading ? 'Cargando...' : 'Iniciar sesión con Google'}
        </button>
      )}
    </div>
  );
}

// Removed duplicate return block and closing brace
