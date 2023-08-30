"use client"
import React, { useState } from 'react'
import styles from "./updateContent.module.css"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
function UpdateContent({ getPost, active, setActive }) {
    const initalState = {
        title: getPost.title,
        imageSrc: getPost.imageSrc,
        description: getPost.description
    }
    const router = useRouter()
    const [state, setState] = useState(initalState)

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/api/post/${getPost.id}`, state)
            .then(() => {
                toast.success("Post başarıyla güncellendi!")
                router.refresh()
                setActive(!active)
            })
            .catch(() => {
                toast.error("İşlem başarısız!")
            })
    }
    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <span onClick={() => setActive(!active)} className={styles.exitbtn} >X</span>
            <textarea name='title' value={state.title} onChange={onChange} cols="35" rows="5"></textarea>
            <textarea name='description' value={state.description} onChange={onChange} cols="35" rows="5"></textarea>
            <textarea name='imageSrc' value={state.imageSrc} onChange={onChange} cols="35" rows="5"></textarea>
            <button type='submit'>update</button>
        </form>
    )
}

export default UpdateContent