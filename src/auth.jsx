import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";
import { loginService } from "./service/auth-service";
// import { loginService } from "./service/login-service";


export const {  signIn , auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const res = await loginService({ email, password });
        
        return res;
      },

    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt(token) {
      if (token?.account?.provider === "google") {
        console.log("token in login with google ", token);

        console.log("Login with google ");
      }
      
      if(token?.user?.payload?.token) {
        return token?.user?.payload;
      }

    

      return token;
    },
    async session(props) {
      const { token } = props;
      return token?.token;
    },
  },
  strategy: "jwt",

  pages: {
    signIn: "/login",
  },
});
