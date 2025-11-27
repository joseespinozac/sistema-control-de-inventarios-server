import { NewCategoryDto } from "../../api/interfaces/request_dto/category.dto";
import { CategoryRepository } from "../repository/category.repository";

export class CategoryService {
    private readonly categoryRePository: CategoryRepository;

    constructor() {
        this.categoryRePository = new CategoryRepository();
    }

    async createCategory(newCategoryDto: NewCategoryDto) {
        const category = await this.categoryRePository.createCategory(
            newCategoryDto
        );
        return category;
    }

    async getAllCategories() {
        const categories = await this.categoryRePository.getAllCategories();
        return categories;
    }
}
