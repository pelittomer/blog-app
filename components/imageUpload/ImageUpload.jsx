import React, { useCallback } from 'react'
import styles from "./Imageupload.module.css"
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'


function ImageUpload({ onChange, value }) {
    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url)
    }, [onChange])
    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset='my_blog_project'
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div className={value && styles.container} onClick={() => open?.()}>
                        <TbPhotoPlus />
                        <div >
                            Click to upload
                        </div>
                        {value && (
                            <div>
                                <Image alt='upload' fill style={{ objectFit: 'cover' }} src={value} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}
export default ImageUpload