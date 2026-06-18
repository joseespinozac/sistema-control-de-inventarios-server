import WarehouseMember from "../models/warehouse-member-model.sequelize";
import User from "../models/user-model.sequelize";
import Warehouse from "../models/warehouse-model.sequelize";
import { AssignWarehouseMemberDto } from "../../api/interfaces/request_dto/warehouse-member.dto";

export class WarehouseMemberRepository {
    async assign(warehouseId: string, dto: AssignWarehouseMemberDto) {
        return WarehouseMember.create({
            warehouse_id: warehouseId,
            user_id: dto.userId,
        } as any);
    }

    async findByWarehouse(warehouseId: string) {
        return WarehouseMember.findAll({
            where: { warehouse_id: warehouseId } as any,
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username", "email", "firstname", "lastname"],
                },
            ],
        });
    }

    async findAssignment(warehouseId: string, userId: string) {
        return WarehouseMember.findOne({
            where: {
                warehouse_id: warehouseId,
                user_id: userId,
            } as any,
        });
    }

    async findById(id: string) {
        return WarehouseMember.findByPk(id, {
            include: [{ model: Warehouse, as: "warehouse" }],
        });
    }

    async delete(assignment: WarehouseMember) {
        return assignment.destroy();
    }
}
