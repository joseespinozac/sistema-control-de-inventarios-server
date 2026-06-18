import { AssignWarehouseMemberDto } from "../../api/interfaces/request_dto/warehouse-member.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import User from "../models/user-model.sequelize";
import { InventoryMemberRepository } from "../repository/inventory-member.repository";
import { WarehouseMemberRepository } from "../repository/warehouse-member.repository";
import { AuthorizationService } from "./authorization.service";
import { isFullWarehouseAccessRole } from "./inventory-role.util";

export class WarehouseMemberService {
    private readonly warehouseMemberRepository: WarehouseMemberRepository;
    private readonly inventoryMemberRepository: InventoryMemberRepository;
    private readonly authorizationService: AuthorizationService;

    constructor() {
        this.warehouseMemberRepository = new WarehouseMemberRepository();
        this.inventoryMemberRepository = new InventoryMemberRepository();
        this.authorizationService = new AuthorizationService();
    }

    async assignMember(
        actorUserId: string,
        warehouseId: string,
        dto: AssignWarehouseMemberDto
    ) {
        const inventoryId =
            await this.authorizationService.getWarehouseInventoryId(warehouseId);

        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "admin"
        );

        const targetMembership =
            await this.inventoryMemberRepository.findMembership(
                inventoryId,
                dto.userId
            );

        if (!targetMembership) {
            throw new BadRequestError(
                "User must be an inventory member before warehouse assignment"
            );
        }

        if (isFullWarehouseAccessRole(targetMembership.role)) {
            throw new BadRequestError(
                "Owner and admin members already have access to all warehouses"
            );
        }

        const user = await User.findByPk(dto.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const existing = await this.warehouseMemberRepository.findAssignment(
            warehouseId,
            dto.userId
        );
        if (existing) {
            throw new BadRequestError(
                "User is already assigned to this warehouse"
            );
        }

        return this.warehouseMemberRepository.assign(warehouseId, dto);
    }

    async listMembers(actorUserId: string, warehouseId: string) {
        await this.authorizationService.assertWarehouseAccess(
            actorUserId,
            warehouseId,
            "viewer"
        );

        return this.warehouseMemberRepository.findByWarehouse(warehouseId);
    }

    async removeMember(
        actorUserId: string,
        warehouseId: string,
        assignmentId: string
    ) {
        const inventoryId =
            await this.authorizationService.getWarehouseInventoryId(warehouseId);

        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "admin"
        );

        const assignment =
            await this.warehouseMemberRepository.findById(assignmentId);

        if (
            !assignment ||
            (assignment as any).warehouse_id !== warehouseId
        ) {
            throw new NotFoundError("Warehouse assignment not found");
        }

        await this.warehouseMemberRepository.delete(assignment);
    }
}
