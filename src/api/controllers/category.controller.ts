import { CategoryService } from "../../data/services/category.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { handleControllerError } from "../../utils/errorHandler";
import {
    NewCategoryDto,
    UpdateCategoryDto,
} from "../interfaces/request_dto/category.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";

export class CategoryController {
    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    createCategory = async (req: any, res: any) => {
        try {
            const requestBody: NewCategoryDto = req.body;
            const newCategory = await this.categoryService.createCategory(
                requestBody
            );
            res.status(201).json({
                message: "Category created",
                data: newCategory,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getCategoryById = async (req: any, res: any) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Category id is required");
            }
            const category = await this.categoryService.getCategoryById(id);
            res.status(200).json({
                message: "Category retrieved",
                data: category,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getAllCategories = async (req: any, res: any) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({
                message: "Categories retrieved",
                data: categories,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateCategory = async (req: any, res: any) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Category id is required");
            }
            const dto: UpdateCategoryDto = req.body;
            const category = await this.categoryService.updateCategory(id, dto);
            res.status(200).json({
                message: "Category updated",
                data: category,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteCategory = async (req: any, res: any) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Category id is required");
            }
            await this.categoryService.deleteCategory(id);
            res.status(200).json({
                message: "Category deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
