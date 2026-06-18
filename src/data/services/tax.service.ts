import {
    NewTaxDto,
    UpdateTaxDto,
} from "../../api/interfaces/request_dto/tax.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import Tax from "../models/tax-model.sequelize";
import { TaxRepository } from "../repository/tax.repository";

export class TaxService {
    private readonly taxRepository: TaxRepository;

    constructor() {
        this.taxRepository = new TaxRepository();
    }

    async createTax(dto: NewTaxDto): Promise<Tax> {
        return this.taxRepository.create(dto);
    }

    async getTaxById(id: string): Promise<Tax> {
        const tax = await this.taxRepository.findById(id);
        if (!tax) {
            throw new NotFoundError("Tax not found");
        }
        return tax;
    }

    async getAllTaxes(): Promise<Tax[]> {
        return this.taxRepository.findAll();
    }

    async updateTax(id: string, dto: UpdateTaxDto): Promise<Tax> {
        const tax = await this.getTaxById(id);
        return this.taxRepository.update(tax, dto);
    }

    async deleteTax(id: string): Promise<void> {
        const tax = await this.getTaxById(id);
        await this.taxRepository.delete(tax);
    }
}
