import mongoClientPromise from "@/database/mongoClientPromise";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { revalidatePath } from "next/cache";
import { authConfig } from "../auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    trustHost: true,
    adapter: MongoDBAdapter(mongoClientPromise, {databaseName: process.env.ENVIRONMENT }),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (credentials == null) return null;

                await dbConnect();
                try {
                    const user = await userModel.findOne({"email": credentials.email});
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if(isMatch) {
                            revalidatePath('/dashboard');
                            return user;
                        } else {
                            throw new Error('Email or password mismatch');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch(error) {
                    console.log(error);
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    // callbacks : {
    //     async jwt({token, user, account}) {
    //         console.log(" token user account ",token, user, account);
    //         if(account && user) {
    //             return {
    //                 user
    //             }
    //         }
    //     },
        
    //     async session({session, token}) {
    //         console.log("my session in session ", session, token);
    //         session.user = token.user;
    //         return session;
    //     }
    // }

    // callbacks: {
    //     async jwt({ token, user, account }) {
    //       console.log(`JWT token: ${JSON.stringify(token)}`);
    //       console.log(`JWT Account: ${JSON.stringify(account)}`);

    //         if (account && user) {
    //             return {
    //                 accessToken: account?.access_token,
    //                 accessTokenExpires: Date.now() + account?.expires_in * 1000,
    //                 refreshToken: account?.refresh_token,
    //                 user,
    //             };
    //         }
    //     },

    //     async session({ session, token }) {

    //       session.user = token?.user;
    //       session.accessToken = token?.access_token;
    //       session.error = token?.error

    //       console.log(`Returning Session ${JSON.stringify(session)}`)
    //       return session;
    //     },
    // },

})