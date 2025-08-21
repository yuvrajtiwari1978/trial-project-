import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddBlogForm() {
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState(null)

    const createBlog = async () => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('imageFile', imageFile);

        const response = await fetch("http://localhost:5000/blog", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        })
        const data = await response.json()
        console.log(data)
        setTitle('')
        setContent('')
        setImageFile('')
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title.trim() === '') {
            alert("Title is Empty")
            return;
        }
        if (content.trim() === '') {
            alert("Content is Empty")
            return;
        }
        createBlog()
        
    }

    const handleFileUpload = (e) => {
        setImageFile(e.target.files[0])
    }

    const handleRemove = () => {
        setImageFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="p-4">
            <form className="space-y-5 flex flex-col" onSubmit={handleSubmit} action="">
                <input type="text" placeholder="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <textarea type="text" placeholder="Content" value={content} onChange={(e) => { setContent(e.target.value) }} />
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} />
                {imageFile && <p>{imageFile.fileName}</p>}
                {imageFile && <button onClick={handleRemove}>Remove Image</button>}
                {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 object-cover" />}
                <button className="bg-blue-400 text-white p-2" type="submit">Add Blog</button>
            </form>
        </div>
    )
}

export default AddBlogForm

