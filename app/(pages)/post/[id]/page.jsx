
import getComment from '@/app/actions/getComment'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getPostById from '@/app/actions/getPostById'
import PostById from '@/components/postById/PostById'
import React from 'react'

export default async function page({ params }) {
    const postId = params.id
    const getPost = await getPostById(postId)
    const currentUser = await getCurrentUser()
    const getComments = await getComment(postId)
    return (
            <PostById getPost={getPost} currentUser={currentUser} getComments={getComments} />
    )
}

