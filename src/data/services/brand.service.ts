import { NewBrandDto } from "../../api/interfaces/request_dto/brand.dto";
import Brand from "../models/brand-model.sequelize";
import { BrandRepository } from "../repository/brand.repository";

export class BrandService {
    private readonly brandRepository: BrandRepository;

    constructor() {
        this.brandRepository = new BrandRepository();
    }

    async createBrand(newBrandDto: NewBrandDto): Promise<Brand> {
        const brand = await this.brandRepository.createBrand(newBrandDto);
        return brand;
    }

    async getAllBrands(): Promise<Brand[]> {
        return await this.brandRepository.findAllBrands();
    }
}
