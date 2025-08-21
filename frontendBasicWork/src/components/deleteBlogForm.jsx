import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteBlogForm() {
    const params = useParams();
    const navigate = useNavigate();

    const deleteBlog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blog/${params.id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Blog deleted successfully");
                // Redirect to blog list or home page after deletion
                navigate("/blogs");
            } else {
                console.error("Failed to delete blog:", data.message);
                alert("Failed to delete blog: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog");
        }
    };

    // Delete immediately when component loads
    React.useEffect(() => {
        deleteBlog();
    }, []);

    return (
        <div className="p-4 text-center">
            <p>Deleting blog...</p>
        </div>
    );
}

export default DeleteBlogForm;
