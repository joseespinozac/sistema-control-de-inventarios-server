import {
    AddInventoryMemberDto,
    UpdateInventoryMemberDto,
} from "../../api/interfaces/request_dto/inventory-member.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import User from "../models/user-model.sequelize";
import { InventoryMemberRepository } from "../repository/inventory-member.repository";
import { AuthorizationService } from "./authorization.service";

export class InventoryMemberService {
    private readonly inventoryMemberRepository: InventoryMemberRepository;
    private readonly authorizationService: AuthorizationService;

    constructor() {
        this.inventoryMemberRepository = new InventoryMemberRepository();
        this.authorizationService = new AuthorizationService();
    }

    async addMember(
        actorUserId: string,
        inventoryId: string,
        dto: AddInventoryMemberDto
    ) {
        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "admin"
        );

        if (dto.role === "owner") {
            throw new BadRequestError("Cannot assign owner role to a member");
        }

        const user = await User.findByPk(dto.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const existing = await this.inventoryMemberRepository.findMembership(
            inventoryId,
            dto.userId
        );
        if (existing) {
            throw new BadRequestError("User is already a member of this inventory");
        }

        return this.inventoryMemberRepository.create(inventoryId, dto);
    }

    async listMembers(actorUserId: string, inventoryId: string) {
        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "viewer"
        );

        return this.inventoryMemberRepository.findByInventory(inventoryId);
    }

    async updateMemberRole(
        actorUserId: string,
        inventoryId: string,
        memberId: string,
        dto: UpdateInventoryMemberDto
    ) {
        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "admin"
        );

        if (dto.role === "owner") {
            throw new BadRequestError("Cannot assign owner role to a member");
        }

        const member = await this.inventoryMemberRepository.findById(memberId);
        if (!member || (member as any).inventory_id !== inventoryId) {
            throw new NotFoundError("Inventory member not found");
        }

        if (member.role === "owner") {
            throw new ForbiddenError("Cannot change the owner role");
        }

        return this.inventoryMemberRepository.update(member, dto);
    }

    async removeMember(
        actorUserId: string,
        inventoryId: string,
        memberId: string
    ) {
        await this.authorizationService.assertInventoryAccess(
            actorUserId,
            inventoryId,
            "admin"
        );

        const member = await this.inventoryMemberRepository.findById(memberId);
        if (!member || (member as any).inventory_id !== inventoryId) {
            throw new NotFoundError("Inventory member not found");
        }

        if (member.role === "owner") {
            throw new ForbiddenError("Cannot remove the inventory owner");
        }

        await this.inventoryMemberRepository.delete(member);
    }
}
