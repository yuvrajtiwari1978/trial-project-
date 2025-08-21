const User = require("../models/user.model")
const bcrypt = require('bcryptjs')

exports.getUserById = async (req, res) => {
    try {
        const id = req.user.id;
        if (!id) {
            return res.status(400).json({ message: "User ID is Missing" })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server Error" })
    }
}

exports.updatedUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User is missing" })
        }
        const bodyData = req.body
        const user = await User.findByIdAndUpdate(id, bodyData, {
            new: true
        })
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

exports.createUser = async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData.name.trim() || !bodyData.email.trim()) {
            return res.status(400).json({ message: "Name And Email is required" })
        }
        // const newUser = await User.create(bodyData)

        const newUser = new User(bodyData)
        await newUser.save()

        console.log(newUser)
        return res.status(201).json({ message: "Entery is created" })
    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        user.isActive = !user.isActive
        await user.save()
        return res.status(200).json({ message: "Staus change" })
    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.updatedUserName = async (req, res) => {
    try {
        const id = req.params.id
        const bodyData = req.body
        if (!bodyData.name.trim()) {
            return res.status(400).json({ message: "Missing Name" })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        user.name = bodyData.name
        await user.save()
        return res.status(200).json({ message: "name updated ", user })
    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.updatedUserEmail = async (req, res) => {
    try {
        const id = req.params.id
        const bodyData = req.body
        if (!bodyData.email.trim()) {
            return res.status(400).json({ message: "Missing Email" })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "Email not found" })
        }
        user.email = bodyData.email
        await user.save()
        return res.status(200).json({ message: error || "internal server error" })
    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.deleteOne({ _id: id })
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json({ message: "User deleted Successfully", user })
    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}



exports.userRegister = async (req, res) => {
    try {
        const bodyData = req.body
        if (!bodyData.name || !bodyData.email || !bodyData.password) {
            return res.status(400).json({ message: "Name, Email and Password are required" })
        }
        const salt = 10
        const hashPassword = await bcrypt.hash(bodyData.password, salt)

        console.log("Hashed Password -----------------> : ", hashPassword)
        // Method 1
        const newBody = { ...bodyData, password: hashPassword }

        // Method 2
        // const newBody = bodyData
        // newBody.password = hashPassword

        const user = await User.create(newBody)
        console.log("User Created -----------------> : ", newBody)

        return res.status(201).json({ message: "User Registered Successfully", user })

    } catch (error) {
        console.log("API error" + error)
        return res.status(500).json({ message: error || "Internal server error" })
    }
}

