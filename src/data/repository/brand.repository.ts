import Brand from "../models/brand-model.sequelize";

export class BrandRepository {
    async createBrand(data: any) {
        return Brand.create(data);
    }

    async findBrandById(brandId: string) {
        return await Brand.findByPk(brandId);
    }

    async findAllBrands() {
        return await Brand.findAll();
    }
}
