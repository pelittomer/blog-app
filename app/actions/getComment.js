import prisma from "../lib/prismadb"

export default async function getComment(params) {
    const postId = params
    try {
        const comment = await prisma.comment.findMany({
            where: {
                postId: postId
            }
        })
        return comment
    } catch (error) {
        return null
    }
}