import Tax from "../models/tax-model.sequelize";
import {
    NewTaxDto,
    UpdateTaxDto,
} from "../../api/interfaces/request_dto/tax.dto";

export class TaxRepository {
    async create(data: NewTaxDto) {
        return Tax.create({
            code: data.code,
            name: data.name,
            taxType: data.taxType,
            rate: data.rate,
            isActive: data.isActive ?? true,
        });
    }

    async findById(id: string) {
        return Tax.findByPk(id);
    }

    async findAll() {
        return Tax.findAll();
    }

    async update(tax: Tax, data: UpdateTaxDto) {
        return tax.update(data);
    }

    async delete(tax: Tax) {
        return tax.destroy();
    }
}
