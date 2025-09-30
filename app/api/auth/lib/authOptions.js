// app/api/auth/lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signIn = async ({ email, pass }) => {
  try {
    const res = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("SignIn API error:", err);
    return { error: "Login request failed" };
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, pass, remember } = credentials;

        const user = await signIn({ email, pass });
        if (user?.error) throw new Error(user.error);

        return { ...user, remember: !!remember };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.remember = user.remember; 
        token.loginTime = Date.now(); 
      }

      if (!token.remember) {
        const age = Date.now() - token.loginTime;
        const maxShort = 24 * 60 * 60 * 1000; 
        if (age > maxShort) return {}; 
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.remember = token.remember; 
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET,
};
