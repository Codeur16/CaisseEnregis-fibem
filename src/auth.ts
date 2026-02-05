import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const body = {
                        username: credentials.email,
                        password: credentials.password,
                        grant_type: "password",
                        client_id: process.env.NEXT_FIBEM_CLIENT_ID!,
                        client_secret: process.env.NEXT_FIBEM_CLIENT_SECRET!,
                    }

                    const response = await fetch(`${process.env.BACKEND_URL}/auth/token/`, {
                        body: JSON.stringify(body),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    const loginData = await response.json() as LoginResponse;


                    if (loginData && loginData.access_token) {
                        const userProfileResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/users/me/`, {
                            headers: {
                                Authorization: `Bearer ${loginData.access_token}`,
                            },
                        })

                        const userProfile = await userProfileResponse.json() as User;

                        return {
                            id: String(userProfile.id),
                            first_name: userProfile.first_name,
                            last_name: userProfile.last_name,
                            email: userProfile.email,
                            role: userProfile.role,
                            phone: userProfile.phone,
                            accessToken: loginData.access_token,
                            refreshToken: loginData.refresh_token,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.id = user.id;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.role = user.role;
                token.phone = user.phone;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                // session.user.accessToken = token.accessToken;
                // session.user.refreshToken = token.refreshToken;
                session.user.id = token.id;
                session.user.first_name = token.first_name;
                session.user.last_name = token.last_name;
                session.user.role = token.role;
                session.user.phone = token.phone;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/connexion",
    },
})