import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_APISECRET,
});

const uploadFile = async (filePath) => {
    try {
        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, {
            folder: "technician-documents",
            resource_type: "auto",
            quality: "auto",
            fetch_format: "auto"
        });

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

export { uploadFile };