import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import EditContext from '../context/use-blogdata';

function EditBlogForm() {
    const params = useParams()
    const values = useContext(EditContext);

    const [title, setTitle] = useState(values.editingBlogData.title)
    const [content, setContent] = useState(values.editingBlogData.content)
    const [image_url, setImage_Url] = useState(values.editingBlogData.image_url)
    const [userId, setUserId] = useState(values.editingBlogData.userId)

    // const fetchBlog = async () => {
    //     const response = await fetch(`http://localhost:5000/blog/${params.id}`)
    //     const data = await response.json()
    //     setTitle(data.data.title)
    //     setContent(data.data.content)
    //     setImage_Url(data.data.image_url)
    //     setUserId(data.data.userId)
    // }
    // !title && !content && !userId && fetchBlog()

    const updateBlog = async () => {
        const response = await fetch(`http://localhost:5000/blog/${values.editingBlogData._id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                image_url,
                userId
            })
        })
        const data = await response.json()
        console.log(data)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (title.trim() === '') {
            alert("Title is Empty")
            return;
        }
        if (content.trim() === '') {
            alert("Content is Empty")
            return;
        }
        await updateBlog()
        setTitle('')
        setContent('')
        setImage_Url('')
    }

    return (
        <div className="p-4">
            <form className="space-y-5 flex flex-col" onSubmit={handleUpdate} action="">
                <input type="text" placeholder="text" value={title} onChange={(e) => { setTitle(e.target.value) }} name="" id="" />
                <textarea type="text" placeholder="Content" value={content} onChange={(e) => { setContent(e.target.value) }} name="" id="" />
                <input type="text" placeholder="Image Url" value={image_url} onChange={(e) => { setImage_Url(e.target.value) }} name="" id="" />

                <button className="bg-blue-400 text-white p-2" type="submit">Update Blog</button>
            </form>
        </div>
    )
}


export default EditBlogForm

