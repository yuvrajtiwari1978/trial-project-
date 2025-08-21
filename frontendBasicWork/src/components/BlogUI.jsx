import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useBlogData} from '../context/use-blogdata';

function Blogui(blog) {
    const navigate = useNavigate();
    const values = useBlogData();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blog/${blog.blog._id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Blog deleted successfully");
                // Reload the page to reflect the changes
                window.location.reload();
            } else {
                console.error("Failed to delete blog:", data.message);
                alert("Failed to delete blog: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog");
        }
    }

    console.log(blog)

    return (
        <div className='p-4 border-2 border-gray-300 m-4 rounded shadow'>
            {blog.blog.image_url && <img src={blog.blog.image_url} className='w-full h-56 object-cover mb-2' />}
            <h3 className='text-xl font-bold mb-2'>{blog.blog.title}</h3>
            <p className='mb-4'>{blog.blog.content}</p>
            <div className='flex justify-end gap-x-4'>
                <button onClick={() => { values.setEditingBlogData(blog.blog); navigate("/editBlog") }} className='text-blue-500 hover:text-blue-700'>
                    Edit
                </button>
                {/* <Link to={`/editBlog/${blog.blog._id}`} className='text-blue-500 hover:text-blue-700'>
                    Edit
                </Link> */}
                <button onClick={handleDelete} className='text-red-500 hover:text-red-700'>Delete</button>
            </div>
        </div>
    )
}

export default Blogui
