import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/src/lib/prisma";

// Helper function to safely convert values to expected types
function safeStringConvert(value: any): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function safeNumberConvert(value: any): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow account linking by checking if user exists with same email
      if (account?.provider && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existingUser) {
          // Check if this provider is already linked
          const existingAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );

          if (!existingAccount) {
            // Link the new provider to existing user with proper type handling
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: safeStringConvert(account.refresh_token),
                access_token: safeStringConvert(account.access_token),
                expires_at: safeNumberConvert(account.expires_at),
                token_type: safeStringConvert(account.token_type),
                scope: safeStringConvert(account.scope),
                id_token: safeStringConvert(account.id_token),
                session_state: safeStringConvert(account.session_state),
              },
            });
          }

          // Update user object with existing user data
          user.id = existingUser.id;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
