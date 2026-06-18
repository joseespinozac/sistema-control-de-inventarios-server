import {
    NewSupplierDto,
    UpdateSupplierDto,
} from "../../api/interfaces/request_dto/supplier.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import Supplier from "../models/supplier-model.sequelize";
import { SupplierRepository } from "../repository/supplier.repository";

export class SupplierService {
    private readonly supplierRepository: SupplierRepository;

    constructor() {
        this.supplierRepository = new SupplierRepository();
    }

    async createSupplier(dto: NewSupplierDto): Promise<Supplier> {
        return this.supplierRepository.create(dto);
    }

    async getSupplierById(id: string): Promise<Supplier> {
        const supplier = await this.supplierRepository.findById(id);
        if (!supplier) {
            throw new NotFoundError("Supplier not found");
        }
        return supplier;
    }

    async getAllSuppliers(): Promise<Supplier[]> {
        return this.supplierRepository.findAll();
    }

    async updateSupplier(
        id: string,
        dto: UpdateSupplierDto
    ): Promise<Supplier> {
        const supplier = await this.getSupplierById(id);
        return this.supplierRepository.update(supplier, dto);
    }

    async deleteSupplier(id: string): Promise<void> {
        const supplier = await this.getSupplierById(id);
        await this.supplierRepository.delete(supplier);
    }
}
