import prisma from "../lib/prismadb"

export default async function getPostById(params) {
    try {
        const postId = params
        const singlepost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if (!singlepost) {
            return null
        }
        return {
            ...singlepost,
            createdAt: singlepost.createdAt.toString(),
        }
    } catch (error) {
        return null
    }
}