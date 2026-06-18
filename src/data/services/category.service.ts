import { NewCategoryDto, UpdateCategoryDto } from "../../api/interfaces/request_dto/category.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import { CategoryRepository } from "../repository/category.repository";

export class CategoryService {
    private readonly categoryRePository: CategoryRepository;

    constructor() {
        this.categoryRePository = new CategoryRepository();
    }

    async createCategory(newCategoryDto: NewCategoryDto) {
        return this.categoryRePository.createCategory({
            name: newCategoryDto.categoryName,
            description: newCategoryDto.categoryDescription,
        });
    }

    async getCategoryById(id: string) {
        const category = await this.categoryRePository.findCategoryById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        return category;
    }

    async getAllCategories() {
        return this.categoryRePository.getAllCategories();
    }

    async updateCategory(id: string, dto: UpdateCategoryDto) {
        const category = await this.getCategoryById(id);
        return category.update({
            ...(dto.categoryName !== undefined && { name: dto.categoryName }),
            ...(dto.categoryDescription !== undefined && {
                description: dto.categoryDescription,
            }),
        });
    }

    async deleteCategory(id: string) {
        const category = await this.getCategoryById(id);
        await category.destroy();
    }
}
