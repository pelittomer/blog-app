import { NextResponse } from "next/server"
import prisma from "../../lib/prismadb"
import bcrypt from "bcrypt"

export async function POST(request) {
    const body = await request.json()
    const { name, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 12)
    if (!name || !email || !password) {
        return NextResponse.json("Kullanıcı adı, e-posta ve şifre bilgileri boş bırakılamaz!", { status: 500 })
    }
    const emailControll = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const nameControl = await prisma.user.findUnique({
        where: {
            name
        }
    })
    if (emailControll) {
        return NextResponse.json("Bu e-posta kullanılıyor!", { status: 500 })
    }
    if (nameControl) {
        return NextResponse.json("Bu kullanıcı adı kullanılıyor!", { status: 500 })
    }

    const newUser = await prisma.user.create({
        data: {
            name, email,
            password: hashedPassword
        }
    })
    return NextResponse.json(newUser)
}