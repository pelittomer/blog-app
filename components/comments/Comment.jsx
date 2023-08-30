
import React from 'react'
import styles from "./comment.module.css"
import avatar from "../../public/avatar.png"
import Image from 'next/image'
function Comment({ comments }) {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Image className={styles.avatar} src={avatar} width={36} height={36} />
                <div className={styles.content}>
                    <p>{comments.authorname}</p>
                    <p>{comments.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment