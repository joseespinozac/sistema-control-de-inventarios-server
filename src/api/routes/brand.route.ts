import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const BrandRouter = Router();
const brandController = new BrandController();

BrandRouter.post("/", asyncHandler(brandController.createBrand));
BrandRouter.get("/", asyncHandler(brandController.getBrandById));
BrandRouter.get("/all", asyncHandler(brandController.getAllBrands));
BrandRouter.put("/", asyncHandler(brandController.updateBrand));
BrandRouter.delete("/", asyncHandler(brandController.deleteBrand));

export default BrandRouter;
