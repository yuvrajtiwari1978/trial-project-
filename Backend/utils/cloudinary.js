const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadtoCloudinary = async (localPath) => {
    try {
        console.log("Uploading to Cloudinary:", localPath);
        const response = await cloudinary.uploader.upload(localPath)
        // fs.unlink(localPath);
        return response
    } catch (error) {
        console.error(error);
        throw new Error("Failed to upload image to Cloudinary");
    }
}

module.exports = uploadtoCloudinary;
