import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../../lib/prismadb"
import { NextResponse } from "next/server"


export async function DELETE(request, ctx) {
    const postId = ctx.params.id
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const deleteComment = await prisma.comment.deleteMany({
        where: {
            postId: postId
        }
    })
    const deletePost = await prisma.post.deleteMany({
        where: {
            id: postId,
            authorId: currentUser.id
        }
    })

    return NextResponse.json(deletePost, deleteComment)
}

export async function PUT(request, ctx) {
    const postId = ctx.params.id
    const currentUser = await getCurrentUser()
    const body = await request.json()
    if (!currentUser) {
        throw new Error('Please Login!')
    }
    const updatedPost = await prisma.post.update({
        where: {
            id: postId,
            authorId: currentUser.id
        },
        data: body
    })
    return NextResponse.json(updatedPost)
}