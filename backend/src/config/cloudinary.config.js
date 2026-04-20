import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_APISECRET,
});

const uploadFile = async (filePath, folderName) => {
    try {
        if (!filePath) return null;
        console.time("cloudinaryUpload");
        const response = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
            resource_type: "image",
            transformation: [
                { width: 1200, crop: "limit" }, // resize large images
                { quality: "auto", fetch_format: "auto" }
            ]
        });

        console.timeEnd("cloudinaryUpload");

        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;

    } finally {
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    }
};

const deleteFile = async (publicId) => {
    try {
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId)

        return response;
    } catch (error) {
        console.error("Cloudinary delete error", error);
        return null;
    }
}

export { uploadFile, deleteFile };