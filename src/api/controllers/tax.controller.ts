import { TaxService } from "../../data/services/tax.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { handleControllerError } from "../../utils/errorHandler";
import { NewTaxDto, UpdateTaxDto } from "../interfaces/request_dto/tax.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";

export class TaxController {
    private readonly taxService: TaxService;

    constructor() {
        this.taxService = new TaxService();
    }

    createTax = async (req: Request, res: Response) => {
        try {
            const dto: NewTaxDto = req.body;
            const tax = await this.taxService.createTax(dto);
            res.status(201).json({
                message: "Tax created",
                data: tax,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getTaxById = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Tax id is required");
            }
            const tax = await this.taxService.getTaxById(id);
            res.status(200).json({
                message: "Tax retrieved",
                data: tax,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getAllTaxes = async (req: Request, res: Response) => {
        try {
            const taxes = await this.taxService.getAllTaxes();
            res.status(200).json({
                message: "Taxes retrieved",
                data: taxes,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateTax = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Tax id is required");
            }
            const dto: UpdateTaxDto = req.body;
            const tax = await this.taxService.updateTax(id, dto);
            res.status(200).json({
                message: "Tax updated",
                data: tax,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteTax = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Tax id is required");
            }
            await this.taxService.deleteTax(id);
            res.status(200).json({
                message: "Tax deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
