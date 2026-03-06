import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.random().toString(36).substring(2, 8);
        cb(null, uniqueName + ext);
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error("Only JPG, PNG, WEBP allowed"));
        } else {
            cb(null, true);
        }
    }
});


/*if (!req.file) {
    throw new ApiError(400, "Document is required");
}

if (req.file.size < 10 * 1024) {
    await fs.promises.unlink(req.file.path);
    throw new ApiError(400, "File must be at least 10KB");
} */