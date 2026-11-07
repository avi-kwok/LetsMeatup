import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      // Only openid + profile. Email scope intentionally omitted.
      authorization: { params: { scope: "openid profile" } },
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      // Keep only sub (id) and name; drop everything else.
      if (profile) {
        token.sub = profile.sub ?? token.sub;
        token.name = profile.name ?? token.name;
      }
      return { sub: token.sub, name: token.name };
    },
    session({ session, token }) {
      return {
        expires: session.expires,
        user: { id: token.sub as string, name: token.name as string },
      } as typeof session;
    },
  },
});
