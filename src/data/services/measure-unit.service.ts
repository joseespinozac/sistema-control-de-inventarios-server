import { NewMeasureUnitDto } from "../../api/interfaces/request_dto/measure-unit.dto";
import MeasureUnit from "../models/measure-unit.model.sequelize";
import { MeasureUnitRepository } from "../repository/measure-unit.repository";

export class MeasureUnitService {
    private readonly measureUnitRepository: MeasureUnitRepository;

    constructor() {
        this.measureUnitRepository = new MeasureUnitRepository();
    }

    async createMeasureUnit(
        newMeasureUnit: NewMeasureUnitDto
    ): Promise<MeasureUnit> {
        const measureUnit = await this.measureUnitRepository.createMeasureUnit(
            newMeasureUnit
        );
        return measureUnit;
    }

    async getAllMeasureUnits(): Promise<MeasureUnit[]> {
        return await this.measureUnitRepository.findAllMeasureUnits();
    }
}
