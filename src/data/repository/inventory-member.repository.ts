import Inventory from "../models/inventory-model.sequelize";
import InventoryMember from "../models/inventory-member-model.sequelize";
import User from "../models/user-model.sequelize";
import {
    AddInventoryMemberDto,
    UpdateInventoryMemberDto,
} from "../../api/interfaces/request_dto/inventory-member.dto";

export class InventoryMemberRepository {
    async create(inventoryId: string, dto: AddInventoryMemberDto) {
        return InventoryMember.create({
            inventory_id: inventoryId,
            user_id: dto.userId,
            role: dto.role,
        } as any);
    }

    async findByInventory(inventoryId: string) {
        const inventory = await Inventory.findByPk(inventoryId, {
            include: [
                {
                    model: User,
                    as: "members",
                    attributes: [
                        "id",
                        "username",
                        "email",
                        "firstname",
                        "lastname",
                    ],
                    through: {
                        attributes: ["id", "role"],
                    },
                },
            ],
        });

        return inventory?.get("members") ?? [];
    }

    async findMembership(inventoryId: string, userId: string) {
        return InventoryMember.findOne({
            where: {
                inventory_id: inventoryId,
                user_id: userId,
            } as any,
        });
    }

    async findById(memberId: string) {
        return InventoryMember.findByPk(memberId);
    }

    async update(member: InventoryMember, dto: UpdateInventoryMemberDto) {
        return member.update({ role: dto.role });
    }

    async delete(member: InventoryMember) {
        return member.destroy();
    }
}
