import {
    NewMeasureUnitDto,
    UpdateMeasureUnitDto,
} from "../../api/interfaces/request_dto/measure-unit.dto";
import { NotFoundError } from "../../errors/NotFoundError";
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
        return this.measureUnitRepository.createMeasureUnit({
            name: newMeasureUnit.measureUnitName,
            abbreviation: newMeasureUnit.measureUnitAbbrev,
        });
    }

    async getMeasureUnitById(id: string): Promise<MeasureUnit> {
        const measureUnit = await this.measureUnitRepository.findMeasureUnitById(
            id
        );
        if (!measureUnit) {
            throw new NotFoundError("Measure unit not found");
        }
        return measureUnit;
    }

    async getAllMeasureUnits(): Promise<MeasureUnit[]> {
        return this.measureUnitRepository.findAllMeasureUnits();
    }

    async updateMeasureUnit(
        id: string,
        dto: UpdateMeasureUnitDto
    ): Promise<MeasureUnit> {
        const measureUnit = await this.getMeasureUnitById(id);
        return measureUnit.update({
            ...(dto.measureUnitName !== undefined && {
                name: dto.measureUnitName,
            }),
            ...(dto.measureUnitAbbrev !== undefined && {
                abbreviation: dto.measureUnitAbbrev,
            }),
        });
    }

    async deleteMeasureUnit(id: string): Promise<void> {
        const measureUnit = await this.getMeasureUnitById(id);
        await measureUnit.destroy();
    }
}
