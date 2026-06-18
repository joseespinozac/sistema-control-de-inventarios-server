import {
    NewInventoryDto,
    UpdateInventoryDto,
} from "../../api/interfaces/request_dto/inventory.dto";
import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import Inventory from "../models/inventory-model.sequelize";
import InventoryMember from "../models/inventory-member-model.sequelize";
import { InventoryRepository } from "../repository/inventory.repository";
import { AuthorizationService } from "./authorization.service";

export class InventoryService {
    private readonly inventoryRepository: InventoryRepository;
    private readonly authorizationService: AuthorizationService;

    constructor() {
        this.inventoryRepository = new InventoryRepository();
        this.authorizationService = new AuthorizationService();
    }

    async createInventory(userId: string, dto: NewInventoryDto) {
        const inventory = await this.inventoryRepository.create(dto, userId);

        await InventoryMember.create({
            inventory_id: inventory.id,
            user_id: userId,
            role: "owner",
        } as any);

        return inventory;
    }

    async getInventoryById(userId: string, inventoryId: string) {
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "viewer"
        );

        const inventory = await this.inventoryRepository.findById(inventoryId);
        if (!inventory) {
            throw new NotFoundError("Inventory not found");
        }

        return inventory;
    }

    async listInventories(userId: string) {
        return this.inventoryRepository.findForUser(userId);
    }

    async updateInventory(
        userId: string,
        inventoryId: string,
        dto: UpdateInventoryDto
    ) {
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "admin"
        );

        const inventory = await this.inventoryRepository.findById(inventoryId);
        if (!inventory) {
            throw new NotFoundError("Inventory not found");
        }

        return this.inventoryRepository.update(inventory, dto);
    }

    async deleteInventory(userId: string, inventoryId: string) {
        const role = await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "owner"
        );

        if (role !== "owner") {
            throw new ForbiddenError("Only the owner can delete an inventory");
        }

        const inventory = await this.inventoryRepository.findById(inventoryId);
        if (!inventory) {
            throw new NotFoundError("Inventory not found");
        }

        await this.inventoryRepository.delete(inventory);
    }
}
