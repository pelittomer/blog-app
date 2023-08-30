"use client"
import React, { useState } from 'react'
import styles from "./postById.module.css"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Comment from '../comments/Comment'
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { BiCommentDetail } from "react-icons/bi"
import avatar from "../../public/avatar.png"
import postImage from "../../public/postImage.jpg"
import Image from 'next/image'
import UpdateContent from '../updateContent/UpdateContent'
function PostById({ getPost, currentUser, getComments }) {
    const router = useRouter()
    const [comment, setComment] = useState("")
    const [setting, setSetting] = useState(false)
    const [active, setActive] = useState(false)
    const onDelete = () => {
        axios.delete(`/api/post/${getPost.id}`)
            .then(() => {
                toast.success("Post başarıyla silindi!")
                router.refresh()
                router.push('/')
            })
            .catch(() => {
                toast.error("İşlem başarısız!")
            })
    }
    const onLike = () => {
        axios.put(`/api/post/${getPost.id}/like`)
            .then(() => {
                router.refresh()
            })
    }
    const commentSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/comment", { comment, postId: getPost.id })
            .then(() => {
                toast.success("Yorumu başarıyla paylaştın!")
                router.refresh()
                setComment("")
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.head}>
                    <Image src={avatar} width={27} height={27} className={styles.avatar} />
                    <span>{getPost.authorname}</span>
                </p>
                {
                    currentUser.id === getPost.authorId &&
                    (
                        <span className={styles.setSetting}
                            onClick={() => setSetting(!setting)}>
                            :
                            {
                                currentUser.id === getPost.authorId &&
                                <div className={`${(setting ? styles.active : styles.setting)}`}>
                                    <button onClick={onDelete} >Delete</button> <br />
                                    <button onClick={() => setActive(!active)}>Update</button>
                                </div>
                            }
                        </span>
                    )

                }
            </div>
            <div className={styles.contentBox}>
                <Image src={postImage} width={500} height={300} className={styles.img} />
                <div className={styles.content}>
                    <p className={styles.title}>{getPost.title}</p>
                    <p className={styles.description}>{getPost.description}</p>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.likes}>
                    <p>
                        {
                            getPost.likedIds.includes(currentUser.id) ?
                                (<span className={styles.like} onClick={onLike}>< FcLike size={25} /></span>) :
                                (<span className={styles.like} onClick={onLike}><FcLikePlaceholder size={25} /></span>)
                        }
                    </p>
                    <p>{getPost.likedIds.length}</p>
                </div>
                <div className={styles.likes}>
                    <BiCommentDetail size={25} />
                    <span>{getComments.length}</span>
                </div>
            </div>
            {
                active && (
                    <UpdateContent getPost={getPost} active={active} setActive={setActive} />
                )
            }
            <h1 className={styles.comments}>Yorumlar</h1>
            {
                getComments.map((comments) => {
                    return (
                        <Comment comments={comments} key={comments.id} />
                    )
                })
            }
            <div className={styles.formcontainer}>
                <form onSubmit={commentSubmit} className={styles.commentsForm} >
                    <textarea rows="4" placeholder='Yorum ekle...' value={comment} onChange={(e) => setComment(e.target.value)} name='comment'></textarea>
                    <button type='Submit' disabled={!comment}>Gonder</button>
                </form>
            </div>
        </div>
    )
}

export default PostById