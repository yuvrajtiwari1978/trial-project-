const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    avater: { type: String },
    name: { type: String, default: "New_User", required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    dob: { type: Date, required: false },
    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model("User", userSchema)

