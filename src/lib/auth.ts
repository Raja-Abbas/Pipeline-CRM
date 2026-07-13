import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) return null;

        const membership = await prisma.workspaceMember.findFirst({
          where: { userId: user.id },
          include: { workspace: true },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
          workspaceId: membership?.workspaceId || null,
          workspaceSlug: membership?.workspace?.slug || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
        token.userId = user.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.workspaceId = (user as any).workspaceId as string | null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.workspaceSlug = (user as any).workspaceSlug as string | null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = session.user as any;
        u.id = token.userId as string;
        u.workspaceId = token.workspaceId as string | null;
        u.workspaceSlug = token.workspaceSlug as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});
