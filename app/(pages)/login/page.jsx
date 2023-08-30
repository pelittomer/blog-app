"use client"
import React, { useState } from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { toast } from 'react-hot-toast'

const initalState = {
    email: "",
    password: ""
}
function page() {
    const [state, setState] = useState(initalState)
    const router = useRouter()
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        signIn("credentials", { ...state, redirect: false })
            .then((callback) => {
                if (callback.error) {
                    toast.error(callback.error)
                } else {
                    toast.success("Giriş yapıldı!")
                    router.refresh()
                    router.push('/')
                }
            })
    }
    return (
        <form onSubmit={onSubmit} className={styles.container} >
            <h1>Giriş yap</h1>
            <input type="email" name='email' placeholder='Email' onChange={onChange} />
            <input type="password" name='password' placeholder='Password' onChange={onChange} />
            <button type="submit">Giriş yap</button>
        </form>
    )
}

export default page