import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prismadb"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import NextAuth from "next-auth/next";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }

            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('E-posta ve şifre boş bırakılamaz!')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.password) {
                    throw new Error('Böyle bir kullanıcı bulunamadı! E-postanızı kontrol edin!')
                }
                const comparePassword = await bcrypt.compare(credentials.password, user.password)
                if (!comparePassword) {
                    throw new Error('Böyle bir kullanıcı bulunamadı! Şifrenizi kontrol edin!')
                }
                return user
            }
        })
    ],
    pages: { signIn: "/" },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    randomKey: user.randomKey
                }
            }
            return token
        }
    },
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }