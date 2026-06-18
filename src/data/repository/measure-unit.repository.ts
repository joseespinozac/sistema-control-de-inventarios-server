import MeasureUnit from "../models/measure-unit.model.sequelize";

export class MeasureUnitRepository {
    async createMeasureUnit(data: any) {
        return MeasureUnit.create(data);
    }

    async findMeasureUnitById(measureUnitId: string) {
        return await MeasureUnit.findByPk(measureUnitId);
    }

    async findAllMeasureUnits() {
        return await MeasureUnit.findAll();
    }
}
