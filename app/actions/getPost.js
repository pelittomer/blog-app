import prisma from "../lib/prismadb"


export default async function getPost() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return posts
    } catch (error) {
        return null
    }
}