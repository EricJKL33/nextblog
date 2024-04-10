import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  ...authOptions,
  providers: authOptions.provider,
});

export { handler as GET, handler as POST };
