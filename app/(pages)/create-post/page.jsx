"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import styles from "./page.module.css"
import ImageUpload from '@/components/imageUpload/ImageUpload'
const initialState = {
    title: "",
    imageSrc: "",
    description: ""
}
function page() {
    const [state, setState] = useState(initialState)
    const router = useRouter()
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/post', state)
            .then(() => {
                setTimeout(() => {
                    toast.success("Post başarıyla paylaşıldı!")
                    router.refresh()
                    router.push('/')
                }, 2500);

            })
            .catch((error) => {
                toast.error(error.response.data)
            })
    }
    const setCustomValue = (id, value) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };
    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <h1>Yeni post ekle</h1>
            <textarea name='title' placeholder='Başlık' value={state.title} onChange={onChange} rows="3"></textarea>
            <textarea name='description' placeholder='İçerik' value={state.description} onChange={onChange} cols="30" rows="15"></textarea>
            <div>
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
            <button type='Submit'>Paylaş</button>
        </form>
    )
}

export default page