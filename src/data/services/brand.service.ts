import { NewBrandDto, UpdateBrandDto } from "../../api/interfaces/request_dto/brand.dto";
import Brand from "../models/brand-model.sequelize";
import { BrandRepository } from "../repository/brand.repository";
import { NotFoundError } from "../../errors/NotFoundError";

export class BrandService {
    private readonly brandRepository: BrandRepository;

    constructor() {
        this.brandRepository = new BrandRepository();
    }

    async createBrand(newBrandDto: NewBrandDto): Promise<Brand> {
        return await this.brandRepository.createBrand(newBrandDto);
    }

    async getBrandById(id: string): Promise<Brand> {
        const brand = await this.brandRepository.findBrandById(id);
        if (!brand) {
            throw new NotFoundError("Brand not found");
        }
        return brand;
    }

    async getAllBrands(): Promise<Brand[]> {
        return await this.brandRepository.findAllBrands();
    }

    async updateBrand(id: string, dto: UpdateBrandDto): Promise<Brand> {
        const brand = await this.getBrandById(id);
        return brand.update(dto);
    }

    async deleteBrand(id: string): Promise<void> {
        const brand = await this.getBrandById(id);
        await brand.destroy();
    }
}
