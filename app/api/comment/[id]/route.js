import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../../lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(request, ctx) {
    const commentId = ctx.params.id
    const currentUser = await getCurrentUser()
    const comment = await prisma.comment.deleteMany({
        where: {
            id: commentId,
            authorId: currentUser.id
        }
    })
    return NextResponse.json(comment)
}