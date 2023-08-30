import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "../../../../lib/prismadb"
import { NextResponse } from "next/server"


export async function PUT(request, ctx) {
    const currentUser = await getCurrentUser()
    const postId = ctx.params.id
    const posts = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (posts) {
        if (posts.likedIds.includes(currentUser.id)) {
            const filterUser = posts.likedIds.filter((item) => item !== currentUser.id)
            const filterLikes = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: filterUser
                }
            })
            return NextResponse.json(filterLikes)
        } else {
            const likesUpdate = await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    likedIds: {
                        push: currentUser.id
                    }
                }
            })
            return NextResponse.json(likesUpdate)
        }
    }
}