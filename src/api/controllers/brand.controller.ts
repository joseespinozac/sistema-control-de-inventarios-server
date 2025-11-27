import { BrandService } from "../../data/services/brand.service";
import { Request, Response } from "express";
import { handleControllerError } from "../../utils/errorHandler";
import { NewBrandDto } from "../interfaces/request_dto/brand.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";

export class BrandController {
    private readonly brandService: BrandService;

    constructor() {
        this.brandService = new BrandService();
    }

    createBrand = async (req: Request, res: Response) => {
        try {
            const newBrandDto: NewBrandDto = req.body;
            const newBrand = await this.brandService.createBrand(newBrandDto);
            res.status(201).json({
                message: "Brand created",
                data: newBrand,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
    getAllBrands = async (req: Request, res: Response) => {
        try {
            const brands = await this.brandService.getAllBrands();
            res.status(200).json({
                message: "Brands retrieved",
                data: brands,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
