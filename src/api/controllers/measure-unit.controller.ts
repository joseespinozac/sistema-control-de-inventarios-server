import { MeasureUnitService } from "../../data/services/measure-unit.service";
import { Request, Response } from "express";
import { NewMeasureUnitDto } from "../interfaces/request_dto/measure-unit.dto";
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
}
