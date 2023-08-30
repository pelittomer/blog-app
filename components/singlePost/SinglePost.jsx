"use client"
import React from 'react'
import styles from "./singlePost.module.css"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import postImage from "../../public/postImage.jpg"
import { FcLike } from "react-icons/fc"
import avatar from "../../public/avatar.png"

function SinglePost({ posts }) {
    const router = useRouter()
    return (
        <div className={styles.container}>
            {
                posts.map((post) => {
                    const { title, imageSrc, description, authorname, id, likedIds } = post
                    return (
                        <div className={styles.post} key={id}>
                            <p className={styles.title}>{title}</p>
                            <Image src={postImage} alt={imageSrc} width="300" height="200" className={styles.img} />
                            <div className={styles.details}>
                                <p>{`${description.substring(0, 25)}...`} </p>
                                <p className={styles.author}>
                                    <Image className={styles.avatar} src={avatar} width={27} height={27} />
                                    <span>{authorname}</span>
                                </p>
                                <p className={styles.likes}>
                                    <span><FcLike size="25" /></span>
                                    {likedIds.length} <br />
                                </p>
                                <button onClick={() => router.push(`/post/${id}`)}>Devamını oku</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SinglePost