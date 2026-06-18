import Supplier from "../models/supplier-model.sequelize";
import {
    NewSupplierDto,
    UpdateSupplierDto,
} from "../../api/interfaces/request_dto/supplier.dto";

export class SupplierRepository {
    async create(data: NewSupplierDto) {
        return Supplier.create({
            name: data.name,
            contactName: data.contactName ?? "",
            phone: data.phone ?? "",
            email: data.email ?? "",
            address: data.address ?? "",
            isActive: data.isActive ?? true,
        });
    }

    async findById(id: string) {
        return Supplier.findByPk(id);
    }

    async findAll() {
        return Supplier.findAll();
    }

    async update(supplier: Supplier, data: UpdateSupplierDto) {
        return supplier.update(data);
    }

    async delete(supplier: Supplier) {
        return supplier.destroy();
    }
}
