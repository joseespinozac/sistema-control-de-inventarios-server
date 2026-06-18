import { BrandService } from "../../data/services/brand.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { Request, Response } from "express";
import { handleControllerError } from "../../utils/errorHandler";
import { NewBrandDto, UpdateBrandDto } from "../interfaces/request_dto/brand.dto";
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

    getBrandById = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Brand id is required");
            }
            const brand = await this.brandService.getBrandById(id);
            res.status(200).json({
                message: "Brand retrieved",
                data: brand,
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

    updateBrand = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Brand id is required");
            }
            const dto: UpdateBrandDto = req.body;
            const brand = await this.brandService.updateBrand(id, dto);
            res.status(200).json({
                message: "Brand updated",
                data: brand,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteBrand = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Brand id is required");
            }
            await this.brandService.deleteBrand(id);
            res.status(200).json({
                message: "Brand deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
