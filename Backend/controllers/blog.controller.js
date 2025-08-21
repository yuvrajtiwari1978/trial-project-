const Blog = require('../models/blog.model')
const { options } = require('../routes/blog.route')
const uploadtoCloudinary = require('../utils/cloudinary')

exports.createBlog = async (req, res) => {
    try {
        const bodyData = req.body;
        const imageFile = req.file;
        if (!bodyData.title || !bodyData.content) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        bodyData.userId = req.user.id
        console.log(req.body, imageFile, bodyData)
        const cloudResponse = await uploadtoCloudinary(imageFile.path)
        console.log("Cloudinary response:", cloudResponse);
        bodyData.image_url = cloudResponse.secure_url;

        const newBlog = await Blog.create(bodyData)
        res.status(201).json({ message: "Blog create successfully", data: newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json({ message: "blog featch successfully", data: blogs })
    } catch (error) {
        console.log(error)
        return res.status(202).json({ message: error || "Internal server error" })
    }
}

exports.getBlogByUserId = async (req, res) => {
    try {
        const userIdfromToken = req.user.id
        const userUploadedBlog = await Blog.find({ userId: userIdfromToken })
        res.status(200).json({ message: "User blogs fetched successfully", data: userUploadedBlog })
    } catch (error) {
        console.log(error)
        return res.status(202).json({ message: error || "Internal server error" })
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog featch successfully", data: blog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const bodyData = req.body
        const updatedBlog = await Blog.findByIdAndUpdate(id, bodyData, { new: true })
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog updated successfully", data: updatedBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        const deletedBlog = await Blog.findByIdAndDelete(id)
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog deleted successfully", data: deletedBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}
