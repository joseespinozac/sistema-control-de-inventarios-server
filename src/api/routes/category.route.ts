import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const CategoryRouter = Router();

const categoryController = new CategoryController();

CategoryRouter.post("/", asyncHandler(categoryController.createCategory));
CategoryRouter.get("/all", asyncHandler(categoryController.getAllCategories));

export default CategoryRouter;
