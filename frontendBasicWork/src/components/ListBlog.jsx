import React, { useEffect, useState } from 'react'
import Blogui from './BlogUI'
import { useNavigate } from 'react-router-dom';

function ListBlog() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    if (!token) {
        navigate("/register")
    }

    const [blogData, setBlogData] = useState(null)
    const [error, setError] = useState('')

    const fetchBlogData = async () => {
        try {
            const response = await fetch("http://localhost:5000/blog")
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`)
            }
            const data = await response.json()
            setBlogData(Array.isArray(data?.data) ? data.data : [])
        } catch (err) {
            console.log(err)
            setError('Failed to load blogs. Is the backend running on port 5000?')
            setBlogData([])
        }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])
    
    console.log(blogData)
    if (error) {
        return <div className='p-4 text-red-600'>{error}</div>
    }

    if (!blogData) {
        return <div className='p-4'>Loading blogs...</div>
    }

    return (
        <div>
            {blogData.length === 0 && (
                <div className='p-4'>No blogs yet.</div>
            )}
            {blogData.length > 0 && blogData.map((eachblog) => (
                <Blogui key={eachblog._id} blog={eachblog} />
            ))}
        </div>
    )
}

export default ListBlog
