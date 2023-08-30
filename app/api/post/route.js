import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json("Giriş yapın!", { status: 500 })
    }
    const body = await request.json()
    const { title, imageSrc, description } = body
    if (!title || !imageSrc || !description) {
        return NextResponse.json("Başlık, fotoğraf ve açıklama kısmı boş bırakılamaz!", { status: 500 })
    }
    const newPost = await prisma.post.create({
        data: {
            title, imageSrc, description,
            authorId: currentUser.id,
            authorname: currentUser.name
        }
    })
    return NextResponse.json(newPost)
}