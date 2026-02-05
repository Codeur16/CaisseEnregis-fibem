import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            role: string;
            phone: string;
        } & DefaultSession["user"];
    }

    // interface User {
    //     id: string | number;
    //     first_name: string;
    //     last_name: string;
    //     email: string;
    //     role: string;
    //     phone: string;
    //     accessToken: string;
    //     refreshToken: string;
    // }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        id?: string | number;
        first_name?: string;
        last_name?: string;
        role?: string;
        phone?: string;
    }
}
