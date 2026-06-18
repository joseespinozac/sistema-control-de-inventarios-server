import Category from "../models/category-model.sequelize";
export class CategoryRepository {
    async createCategory(data: any) {
        return Category.create(data);
    }

    async findCategoryById(categoryId: string) {
        return await Category.findByPk(categoryId);
    }

    async getAllCategories() {
        return await Category.findAll();
    }
}
