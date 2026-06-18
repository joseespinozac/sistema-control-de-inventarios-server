import { Op } from "sequelize";
import Inventory from "../models/inventory-model.sequelize";
import InventoryMember from "../models/inventory-member-model.sequelize";
import User from "../models/user-model.sequelize";
import {
    NewInventoryDto,
    UpdateInventoryDto,
} from "../../api/interfaces/request_dto/inventory.dto";

export class InventoryRepository {
    async create(data: NewInventoryDto, ownerUserId: string) {
        return Inventory.create({
            name: data.name,
            lowStockThreshold: data.lowStockThreshold ?? 5,
            stockMode: data.stockMode ?? "manual",
            owner_user_id: ownerUserId,
        } as any);
    }

    async findById(id: string) {
        return Inventory.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["id", "username", "email"],
                },
            ],
        });
    }

    async findByIds(ids: string[]) {
        if (ids.length === 0) {
            return [];
        }
        return Inventory.findAll({
            where: { id: { [Op.in]: ids } },
        });
    }

    async findForUser(userId: string) {
        const memberships = await InventoryMember.findAll({
            where: { user_id: userId } as any,
            attributes: ["inventory_id"],
        });

        const memberInventoryIds = memberships.map(
            (membership) => (membership as any).inventory_id as string
        );

        return Inventory.findAll({
            where: {
                [Op.or]: [
                    { owner_user_id: userId },
                    { id: { [Op.in]: memberInventoryIds } },
                ],
            } as any,
        });
    }

    async update(inventory: Inventory, data: UpdateInventoryDto) {
        return inventory.update({
            ...(data.name !== undefined && { name: data.name }),
            ...(data.lowStockThreshold !== undefined && {
                lowStockThreshold: data.lowStockThreshold,
            }),
            ...(data.stockMode !== undefined && { stockMode: data.stockMode }),
        });
    }

    async delete(inventory: Inventory) {
        return inventory.destroy();
    }
}
