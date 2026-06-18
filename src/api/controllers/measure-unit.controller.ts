import { MeasureUnitService } from "../../data/services/measure-unit.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { Request, Response } from "express";
import {
    NewMeasureUnitDto,
    UpdateMeasureUnitDto,
} from "../interfaces/request_dto/measure-unit.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { handleControllerError } from "../../utils/errorHandler";

export class MeasureUnitController {
    private readonly measureUnitService: MeasureUnitService;

    constructor() {
        this.measureUnitService = new MeasureUnitService();
    }

    createMeasureUnit = async (req: Request, res: Response) => {
        try {
            const newMeasureUnitDto: NewMeasureUnitDto = req.body;
            const newMeasureUnit =
                await this.measureUnitService.createMeasureUnit(
                    newMeasureUnitDto
                );
            res.status(201).json({
                message: "Measure unit created",
                data: newMeasureUnit,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getMeasureUnitById = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Measure unit id is required");
            }
            const measureUnit =
                await this.measureUnitService.getMeasureUnitById(id);
            res.status(200).json({
                message: "Measure unit retrieved",
                data: measureUnit,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getAllMeasureUnits = async (req: Request, res: Response) => {
        try {
            const measureUnits =
                await this.measureUnitService.getAllMeasureUnits();
            res.status(200).json({
                message: "Measure units retrieved",
                data: measureUnits,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateMeasureUnit = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Measure unit id is required");
            }
            const dto: UpdateMeasureUnitDto = req.body;
            const measureUnit = await this.measureUnitService.updateMeasureUnit(
                id,
                dto
            );
            res.status(200).json({
                message: "Measure unit updated",
                data: measureUnit,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteMeasureUnit = async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                throw new BadRequestError("Measure unit id is required");
            }
            await this.measureUnitService.deleteMeasureUnit(id);
            res.status(200).json({
                message: "Measure unit deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
