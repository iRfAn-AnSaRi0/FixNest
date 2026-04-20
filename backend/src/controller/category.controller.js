import { asyncHandler } from "../utils/async.handler.js"
import { ApiError } from "../utils/api.error.js"
import { ApiResponse } from "../utils/api.response.js"
import { Category } from "../models/category.model.js"
import { uploadFile, deleteFile } from "../config/cloudinary.config.js"


const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "Category and description required")
    }

    const check = await Category.findOne({ name });

    if (check) {
        throw new ApiError(400, "Category already exixt")
    }

    if (!req.file) {
        throw new ApiError(400, "Category image is required")
    }

    if (req.file.size < 10 * 1024) {
        await fs.promises.unlink(req.file.path);
        throw new ApiError(400, "File size must be at least 10KB");
    }

    const uploadCategoryImage = await uploadFile(req.file.path, "fixnest/category");

    if (!uploadCategoryImage) {
        throw new ApiError(500, "Image failed to upload")
    }

    const category = await Category.create({
        name,
        description,
        categoryImage: uploadCategoryImage.secure_url,
        categoryImagePublicId: uploadCategoryImage.public_id
    })

    if (!category) {
        throw new ApiError(500, "Server error")
    }

    return res.status(201).json(
        new ApiResponse(201, {}, "Category created")
    )


})

const getAllCategory = asyncHandler(async (req, res) => {

    const category = await Category.aggregate([
        {
            $match: { isActive: true }
        },
        {
            $lookup: {
                from: "services", // ⚠️ check your actual collection name in MongoDB
                localField: "_id",
                foreignField: "category",
                as: "services"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                categoryImage: 1,
                serviceCount: { $size: "$services" } // 👈 count added here
            }
        }
    ]);

    if (category.length === 0) {
        throw new ApiError(404, "No Category Found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            category,
            "Category fetch with service count"
        )
    );

});

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const findCategory = await Category.findById(categoryId)

    if (!findCategory) {
        throw new ApiError(404, "Category not found")
    }
    if (name) findCategory.name = name;
    if (description) findCategory.description = description;

    if (req.file) {
        await deleteFile(findCategory.categoryImagePublicId);

        const upload = await uploadFile(req.file.path, "fixnest/category");

        // await fs.promises.unlink(req.file.path);

        findCategory.categoryImage = upload.secure_url;
        findCategory.categoryImagePublicId = upload.public_id;
    }

    await findCategory.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Category updated"
        )
    )

})

const updateIsActiveOfCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const findCategory = await Category.findById(categoryId);

    if (!findCategory) {
        throw new ApiError(404, "Category not found")
    }

    findCategory.isActive = !findCategory.isActive;

    await findCategory.save()

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Category status update"
        )
    )
})



export { createCategory, getAllCategory, updateCategory, updateIsActiveOfCategory };