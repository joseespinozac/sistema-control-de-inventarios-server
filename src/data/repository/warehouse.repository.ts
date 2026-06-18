import { Op } from "sequelize";
import Warehouse from "../models/warehouse-model.sequelize";
import User from "../models/user-model.sequelize";
import {
    NewWarehouseDto,
    UpdateWarehouseDto,
} from "../../api/interfaces/request_dto/warehouse.dto";

export class WarehouseRepository {
    async create(inventoryId: string, dto: NewWarehouseDto) {
        return Warehouse.create({
            name: dto.name,
            code: dto.code,
            description: dto.description ?? "",
            location: dto.location,
            isActive: dto.isActive ?? true,
            inventory_id: inventoryId,
            manager_id: dto.managerId,
        } as any);
    }

    async findById(id: string) {
        return Warehouse.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "manager",
                    attributes: ["id", "username", "email"],
                },
            ],
        });
    }

    async findByInventory(inventoryId: string, warehouseIds?: string[]) {
        const where: Record<string, unknown> = {
            inventory_id: inventoryId,
        };
        if (warehouseIds && warehouseIds.length > 0) {
            where.id = { [Op.in]: warehouseIds };
        } else if (warehouseIds && warehouseIds.length === 0) {
            return [];
        }

        return Warehouse.findAll({
            where: where as any,
            include: [
                {
                    model: User,
                    as: "manager",
                    attributes: ["id", "username", "email"],
                },
            ],
        });
    }

    async update(warehouse: Warehouse, dto: UpdateWarehouseDto) {
        return warehouse.update({
            ...(dto.name !== undefined && { name: dto.name }),
            ...(dto.code !== undefined && { code: dto.code }),
            ...(dto.description !== undefined && {
                description: dto.description,
            }),
            ...(dto.location !== undefined && { location: dto.location }),
            ...(dto.isActive !== undefined && { isActive: dto.isActive }),
            ...(dto.managerId !== undefined && { manager_id: dto.managerId }),
        } as any);
    }

    async delete(warehouse: Warehouse) {
        return warehouse.destroy();
    }
}
