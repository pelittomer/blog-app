"use client"
import React, { useState } from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const initalState = {
    name: "",
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
        axios.post('/api/register', state)
            .then(() => {
                toast.success("Hesap başarıyla oluşturuldu!")
                router.refresh()
                router.push('/login')
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
    }
    return (
        <form onSubmit={onSubmit} className={styles.container} >
            <h1>Kayıt ol</h1>
            <input type="text" name='name' placeholder='Name' onChange={onChange} />
            <input type="email" name='email' placeholder='Email' onChange={onChange} />
            <input type="password" name='password' placeholder='Password' onChange={onChange} />
            <button type='submit'>Kayıt Ol</button>
        </form>
    )
}

export default page