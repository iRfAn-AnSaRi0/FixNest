import { Router } from "express";
import { authMiddleware, allowRoles } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { createService, updateService, updateIsActiveOfService, getAllService, getCategoryWithServices } from "../controller/service.controller.js"


const serviceRoute = Router();

serviceRoute.get("/", getAllService)

serviceRoute.get("/:id", getCategoryWithServices)

serviceRoute.use(authMiddleware, allowRoles("admin"));

serviceRoute.post("/", upload.single("serviceImage"), createService);

serviceRoute.patch("/:serviceId", upload.single("serviceImage"), updateService);

serviceRoute.patch("/:serviceId/status", updateIsActiveOfService);


export default serviceRoute;