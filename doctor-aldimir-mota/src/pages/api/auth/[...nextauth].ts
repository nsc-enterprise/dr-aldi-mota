import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	// Don't require NEXTAUTH_URL during build - Next.js auto-detects it
	// Puedes agregar más opciones aquí (callbacks, session, etc.)
};

export default NextAuth(authOptions);