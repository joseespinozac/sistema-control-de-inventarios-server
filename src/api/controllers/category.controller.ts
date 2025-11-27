import { CategoryService } from "../../data/services/category.service";
import { handleControllerError } from "../../utils/errorHandler";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";

export class CategoryController {
    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    createCategory = async (req: any, res: any) => {
        try {
            const requestBody = req.body;
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
}
