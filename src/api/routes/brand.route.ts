import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const BrandRouter = Router();
const brandController = new BrandController();

BrandRouter.post("/", asyncHandler(brandController.createBrand));
BrandRouter.get("/all", asyncHandler(brandController.getAllBrands));

export default BrandRouter;
