import { signIn, signOut, useSession } from 'next-auth/react';

export default function GoogleLoginButton() {
  const { data: session } = useSession();

  if (session) {
    // Correcting TypeScript error by using optional chaining
    // This ensures that if session.user is undefined, it won't throw an error
    return (
      <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
        Cerrar sesión ({session.user?.email})
      </button>
    );
  }

  return (
    <button onClick={() => signIn('google')} className="px-4 py-2 bg-blue-500 text-white rounded">
      Iniciar sesión con Google
    </button>
  );
}
