import { ProductService } from "../../data/services/product.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { handleControllerError } from "../../utils/errorHandler";
import {
    NewProductDto,
    UpdateProductDto,
} from "../interfaces/request_dto/product.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";
import { StringUtil } from "../../utils/string.util";

export class ProductController {
    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    createProduct = async (req: Request, res: Response) => {
        try {
            const requestBody: NewProductDto = req.body;
            const files = req.files as Express.Multer.File[]; // Assuming multer is used for file uploads
            const images = files
                ? files.map((file) => `/uploads/${file.filename}`)
                : [];
            const newProduct = await this.productService.createProduct(
                requestBody,
                images
            );

            res.status(201).json({
                message: "Product created",
                data: newProduct,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateProduct = async (req: Request, res: Response) => {
        try {
            const productId = Number.parseInt(req.query.id as string);
            if (Number.isNaN(productId)) {
                throw new BadRequestError("Invalid product ID");
            }
            const files = (req.files as Express.Multer.File[]) || [];
            const requestBody: UpdateProductDto = req.body;
            requestBody.newImages = files.map(
                (file) => `/uploads/${file.filename}`
            );
            const updatedProduct = await this.productService.updateProduct(
                productId,
                requestBody
            );
            res.status(200).json({
                message: "Product updated",
                data: updatedProduct,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const productId = parseInt(req.query.id as string);
            if (isNaN(productId)) {
                throw new BadRequestError("Invalid product ID");
            }
            await this.productService.deleteProduct(productId);
            res.status(200).json({
                message: "Product deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getProductById = async (req: Request, res: Response) => {
        try {
            const productId = parseInt(req.query.id as string);
            if (isNaN(productId)) {
                throw new BadRequestError("Invalid product ID");
            }
            const product = await this.productService.getProduct(productId);
            res.status(200).json({
                message: "Product retrieved",
                data: product,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getPaginatedProducts = async (req: Request, res: Response) => {
        const { limit, offset, sort, ...rest } = req.query;

        // Extrae filtros dinámicamente de "filter[clave]"
        const filter: Record<string, any> = {};
        Object.keys(rest).forEach((key) => {
            const f: any = rest[key];
            Object.keys(f).forEach((subKey) => {
                filter[subKey] = f[subKey];
            });
        });

        const result = await this.productService.getPaginatedProducts({
            limit: Number(limit),
            offset: Number(offset),
            sort: sort as string,
            filter,
        });

        res.status(200).json({
            message: "Products retrieved",
            data: result,
        });
    };
}
