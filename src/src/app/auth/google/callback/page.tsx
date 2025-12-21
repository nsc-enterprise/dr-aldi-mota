// app/auth/google/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          console.error('No authorization code received');
          router.push('/agendar?error=no_code');
          return;
        }

        // Intercambiar código por tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '875894762854-s3mua87g0k4j9r5645hff64d4vhtfehm.apps.googleusercontent.com',
            client_secret: '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',
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: `${window.location.origin}/http://localhost:3001/auth/google/callback`,
          }),
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.text();
          console.error('Token exchange failed:', errorData);
          router.push('/agendar?error=token_exchange_failed');
          return;
        }

        const tokenData = await tokenResponse.json();

        // Obtener información del usuario
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
          },
        });

        if (!userResponse.ok) {
          console.error('Failed to get user info');
          router.push('/agendar?error=user_info_failed');
          return;
        }

        const userData = await userResponse.json();

        // Guardar usuario en localStorage
        const userInfo = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          login_time: new Date().toISOString(),
        };

        localStorage.setItem('google_user', JSON.stringify(userInfo));

        // Redirigir de vuelta a agendar con éxito
        router.push('/agendar?auth=success');

      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/agendar?error=auth_callback_error');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Verificando tu cuenta</h2>
        <p className="text-gray-600">Estamos procesando tu inicio de sesión con Google...</p>
        <p className="text-sm text-gray-500 mt-4">No cierres esta ventana</p>
      </div>
    </div>
  );
}