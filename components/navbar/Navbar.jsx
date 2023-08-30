"use client"
import React, { useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import avatar from "../../public/avatar.png"
import Image from 'next/image'
function Navbar({ currenUser }) {
    const [active, setActive] = useState(false)
    const router = useRouter()
    const handleOut = () => {
        router.push('/')
        setTimeout(() => {
            signOut()
        }, 2000);

    }
    return (
        <div className={styles.container}>

            <Link className={styles.logo} href="/">HOME</Link>
            {
                currenUser ? (
                    <div className={styles.navOnline} >
                        <span>{currenUser.name}</span>
                        <Image src={avatar} className={styles.avatar} width="36" height="36" onClick={() => setActive(!active)} />
                        <div className={`${(active ? styles.active : styles.popup)}`}>
                            <Link href="/create-post" onClick={() => setActive(!active)}>Yeni post</Link>
                            <p onClick={handleOut}>Çıkış yap</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles.navOffline}>
                        <Link href="/login">Giriş Yap</Link>
                        <Link href="/register">Kayıt Ol</Link>
                    </div >
                )
            }

        </div >
    )
}

export default Navbar