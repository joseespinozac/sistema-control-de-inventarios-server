import { SupplierService } from "../../data/services/supplier.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { handleControllerError } from "../../utils/errorHandler";
import {
    NewSupplierDto,
    UpdateSupplierDto,
} from "../interfaces/request_dto/supplier.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";

export class SupplierController {
    private readonly supplierService: SupplierService;

    constructor() {
        this.supplierService = new SupplierService();
    }

    createSupplier = async (req: Request, res: Response) => {
        try {
            const dto: NewSupplierDto = req.body;
            const supplier = await this.supplierService.createSupplier(dto);
            res.status(201).json({
                message: "Supplier created",
                data: supplier,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getSupplierById = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Supplier id is required");
            }
            const supplier = await this.supplierService.getSupplierById(id);
            res.status(200).json({
                message: "Supplier retrieved",
                data: supplier,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getAllSuppliers = async (req: Request, res: Response) => {
        try {
            const suppliers = await this.supplierService.getAllSuppliers();
            res.status(200).json({
                message: "Suppliers retrieved",
                data: suppliers,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateSupplier = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Supplier id is required");
            }
            const dto: UpdateSupplierDto = req.body;
            const supplier = await this.supplierService.updateSupplier(id, dto);
            res.status(200).json({
                message: "Supplier updated",
                data: supplier,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteSupplier = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Supplier id is required");
            }
            await this.supplierService.deleteSupplier(id);
            res.status(200).json({
                message: "Supplier deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
