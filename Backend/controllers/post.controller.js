const Blog = require('../models/blog.model')
const User = require('../models/user.model')

const getPosts = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("userId").select({
            title: 1,
            content: 1,
            userId: 1
        })
        return res.status(200).json({ message: "Blogs fetched successfully", data: blogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

const getPostById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog fetched successfully", data: blog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

const createPost = async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData.userId || !bodyData.title || !bodyData.content) {
            return res.status(400).json({ message: "Please fill all fields" })
        }
        const newBlog = await Blog.create(bodyData)
        res.status(201).json({ message: "Blog created successfully", data: newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

const getUsers = async (req, res) => {
    try {
        const Reqemail = req.query.email
        const users = await User.find({ email: Reqemail })
        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

module.exports = { getPosts, getPostById, createPost, getUsers, getUserById }
