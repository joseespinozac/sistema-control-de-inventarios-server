import { Op } from "sequelize";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import Inventory from "../models/inventory-model.sequelize";
import InventoryMember from "../models/inventory-member-model.sequelize";
import Warehouse from "../models/warehouse-model.sequelize";
import WarehouseMember from "../models/warehouse-member-model.sequelize";
import {
    hasMinRole,
    InventoryRole,
    isFullWarehouseAccessRole,
} from "./inventory-role.util";

export class AuthorizationService {
    async getInventoryMembership(userId: string, inventoryId: string) {
        return InventoryMember.findOne({
            where: {
                user_id: userId,
                inventory_id: inventoryId,
            } as any,
        });
    }

    async getInventoryRole(
        userId: string,
        inventoryId: string
    ): Promise<InventoryRole | null> {
        const inventory = await Inventory.findByPk(inventoryId);
        if (!inventory) {
            return null;
        }

        const membership = await this.getInventoryMembership(userId, inventoryId);
        if (membership) {
            return membership.role;
        }

        const ownerId = (inventory as any).owner_user_id as string | undefined;
        if (ownerId === userId) {
            return "owner";
        }

        return null;
    }

    async assertInventoryAccess(
        userId: string,
        inventoryId: string,
        minRole: InventoryRole
    ): Promise<InventoryRole> {
        const role = await this.getInventoryRole(userId, inventoryId);
        if (!role || !hasMinRole(role, minRole)) {
            throw new ForbiddenError(
                "You do not have access to this inventory"
            );
        }
        return role;
    }

    async getAccessibleWarehouseIds(
        userId: string,
        inventoryId: string
    ): Promise<string[]> {
        const role = await this.assertInventoryAccess(
            userId,
            inventoryId,
            "viewer"
        );

        if (isFullWarehouseAccessRole(role)) {
            const warehouses = await Warehouse.findAll({
                where: { inventory_id: inventoryId } as any,
                attributes: ["id"],
            });
            return warehouses.map((warehouse) => warehouse.id);
        }

        const assignments = await WarehouseMember.findAll({
            where: { user_id: userId } as any,
            include: [
                {
                    model: Warehouse,
                    as: "warehouse",
                    where: { inventory_id: inventoryId } as any,
                    attributes: [],
                    required: true,
                },
            ],
        });

        return assignments.map(
            (assignment) => (assignment as any).warehouse_id as string
        );
    }

    async getWarehouseInventoryId(warehouseId: string): Promise<string> {
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) {
            throw new NotFoundError("Warehouse not found");
        }
        return (warehouse as any).inventory_id as string;
    }

    async assertWarehouseAccess(
        userId: string,
        warehouseId: string,
        minRole: InventoryRole
    ): Promise<{ inventoryId: string; role: InventoryRole }> {
        const inventoryId = await this.getWarehouseInventoryId(warehouseId);
        const role = await this.assertInventoryAccess(
            userId,
            inventoryId,
            minRole
        );

        if (isFullWarehouseAccessRole(role)) {
            return { inventoryId, role };
        }

        const assignment = await WarehouseMember.findOne({
            where: {
                user_id: userId,
                warehouse_id: warehouseId,
            } as any,
        });

        if (!assignment) {
            throw new ForbiddenError(
                "You do not have access to this warehouse"
            );
        }

        return { inventoryId, role };
    }

    async assertWarehouseBelongsToInventory(
        warehouseId: string,
        inventoryId: string
    ): Promise<void> {
        const warehouse = await Warehouse.findOne({
            where: {
                id: warehouseId,
                inventory_id: inventoryId,
            } as any,
        });

        if (!warehouse) {
            throw new NotFoundError(
                "Warehouse not found in the specified inventory"
            );
        }
    }

    async findInventoriesForUser(userId: string) {
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
}
