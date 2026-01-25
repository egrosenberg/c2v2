import NextAuth from "next-auth";
import Logto from "next-auth/providers/logto";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Logto({
    //   id: "logTo",
    //   name: "Logto",
    //   clientId: process.env.LOGTO_APP_ID,
    //   clientSecret: process.env.LOGTO_APP_SECRET,
    //   wellKnown: process.env.AUTH_LOGTO_ISSUER,
    //   client: {
    //     id_token_signed_response_alg: "ES384",
    //   },
    //   authorization: {
    //     params: {
    //       scope: "openid offline_access profile email",
    //     },
    //   },
    //   profile(profile) {
    //     console.log({ profile });
    //     return profile;
    //   },
    //   // ...
    // }),
    Logto,
  ],
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});
