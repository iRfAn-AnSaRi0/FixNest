import { asyncHandler } from "../utils/async.handler.js"
import { ApiError } from "../utils/api.error.js"
import { ApiResponse } from "../utils/api.response.js"
import { Service } from "../models/service.model.js"
import { Category } from "../models/category.model.js"
import { uploadFile, deleteFile } from "../config/cloudinary.config.js"


const createService = asyncHandler(async (req, res) => {
    const { name, category, price, description, estimateTime } = req.body;

    if (!name || !category || !price || !description || !estimateTime) {
        throw new ApiError(400, "All feilds are required")
    }

    if (!req.file) {
        throw new ApiError(400, "Service image is required")
    }

    if (req.file.size < 10 * 1024) {
        await fs.promises.unlink(req.file.path);
        throw new ApiError(400, "File size must be at least 10KB");
    }


    const uploadImage = await uploadFile(req.file.path, "fixnest/service");

    if (!uploadImage) {
        throw new ApiError(500, "Services image not upload")
    }

    const service = await Service.create({
        name,
        category,
        price,
        description,
        estimateTime,
        serviceImage: uploadImage.secure_url,
        serviceImagePublicId: uploadImage.public_id
    })

    if (!service) {
        throw new ApiError(500, "Server error")
    }

    return res.status(201).json(
        new ApiResponse(201, {}, "Service created")
    )

})

const getAllService = asyncHandler(async (req, res) => {

    const services = await Service.find({ isActive: true }).populate({
        path: "category",
        match: { isActive: true },
        select: "name"
    }).lean();

    if (services.length === 0) {
        throw new ApiError(404, "Service not found")
    }

    // remove services whose category is inactive
    const filteredServices = services.filter(service => service.category !== null);
    return res.status(200).json(
        new ApiResponse(
            200,
            filteredServices,
            "Service fetch"
        )
    )
})

const getCategoryWithServices = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 1. Get category details
    const category = await Category.findOne({ _id: id, isActive: true })
        .select("_id name description categoryImage")
        .lean();

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    // 2. Get services of that category
    const services = await Service.find({
        category: id,
        isActive: true
    })
        .select("_id name description estimateTime serviceImage price")
        .lean();

    return res.status(200).json(
        new ApiResponse(200, {
            category,
            services,
            serviceCount: services.length
        }, "Category + services fetched")
    );
});

const updateService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;
    const { name, category, price, description, estimateTime } = req.body

    const findService = await Service.findById(serviceId);

    if (!findService) {
        throw new ApiError(404, "Service not found")
    }

    if (findService) {
        findService.name = name || findService.name,
            findService.category = category || findService.category,
            findService.price = price || findService.price,
            findService.description = description || findService.description,
            findService.estimateTime = estimateTime || findService.estimateTime
    }

    if (req.file) {

        await deleteFile(findService.serviceImagePublicId);

        const updateServiceImage = await uploadFile(req.file.path, "fixnest/service");

        // await fs.promises.unlink(req.file.path);

        findService.serviceImage = updateServiceImage.secure_url;
        findService.serviceImagePublicId = updateServiceImage.public_id;
    }

    await findService.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Service updated"
        )
    )


})

const updateIsActiveOfService = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    const findService = await Service.findById(serviceId)

    if (!findService) {
        throw new ApiError(404, "Service not found")
    }

    findService.isActive = !findService.isActive

    await findService.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Service status update")
    )

})


export { createService, getAllService, updateService, updateIsActiveOfService, getCategoryWithServices }