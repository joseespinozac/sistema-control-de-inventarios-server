import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const CategoryRouter = Router();

const categoryController = new CategoryController();

CategoryRouter.post("/", asyncHandler(categoryController.createCategory));
CategoryRouter.get("/", asyncHandler(categoryController.getCategoryById));
CategoryRouter.get("/all", asyncHandler(categoryController.getAllCategories));
CategoryRouter.put("/", asyncHandler(categoryController.updateCategory));
CategoryRouter.delete("/", asyncHandler(categoryController.deleteCategory));

export default CategoryRouter;
