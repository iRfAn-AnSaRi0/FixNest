import { Router } from "express";
import { authMiddleware, allowRoles } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { createCategory, updateCategory, updateIsActiveOfCategory, getAllCategory } from "../controller/category.controller.js"

const categoryRoute = Router();

categoryRoute.get("/category", getAllCategory)

categoryRoute.use(authMiddleware, allowRoles("admin"));


categoryRoute.post("/", upload.single("categoryImage"), createCategory);

categoryRoute.patch("/:categoryId", upload.single("categoryImage"), updateCategory);

categoryRoute.patch("/:categoryId/status", updateIsActiveOfCategory);

export default categoryRoute;