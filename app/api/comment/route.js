import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request) {
    const body = await request.json()
    const { postId, comment } = body
    if (!comment) {
        return NextResponse.json("Yorum bölgesi boş bırakılamaz!", { status: 500 })
    }
    const currentUser = await getCurrentUser()
    const createComment = await prisma.comment.create({
        data: {
            postId, comment,
            authorId: currentUser.id,
            authorname: currentUser.name
        }
    })
    return NextResponse.json(createComment)
}