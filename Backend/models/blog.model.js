const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image_url: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Blog", blogSchema)




