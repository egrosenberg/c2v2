import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// import NextAuth from "next-auth";

// const handler = NextAuth({
//   providers: [
//     {
//       id: "logto",
//       name: "Logto",
//       type: "oauth",
//       // You can get the well-known URL from the Logto Application Details page,
//       // in the field "OpenID Provider configuration endpoint"
//       wellKnown: process.env.LOGTO_WELL_KNOWN,
//       authorization: {
//         params: { scope: "openid offline_access profile email" },
//       },
//       clientId: process.env.LOGTO_APP_ID,
//       clientSecret: process.env.LOGTO_APP_SECRET,
//       client: {
//         id_token_signed_response_alg: "ES384",
//       },
//       profile(profile) {
//         // You can customize the user profile mapping here
//         return {
//           ...profile,
//           id: profile.sub,
//           name: profile.name ?? profile.username,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     },
//   ],
// });

// export { handler as GET, handler as POST };
