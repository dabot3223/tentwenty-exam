//app/api/auth/lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signIn = async ({ email, pass, domain }) => {
    try {
        const res = await fetch(`/api/users/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fb_email: email,
                password: pass,
            }),
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
                const { email, pass, auth_type } = credentials;

                if (auth_type === "email") {
                    const user = await signIn({
                        email,
                        pass,
                    });

                    if (user?.error) throw new Error(user.error);
                    return { ...user };
                } else {
                    return JSON.parse(credentials.user);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.domain = user.domain;
            }
            return { ...token, ...user, ...account };
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.displayName;
            session.user.role = token.user_role;
            session.user.email = token.email;
            session.user.phone = token.phone;
            session.accessToken = `${token.jti}-${token.iat}-${token.exp}` || "user";
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};