import {
    NewWarehouseDto,
    UpdateWarehouseDto,
} from "../../api/interfaces/request_dto/warehouse.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import { WarehouseRepository } from "../repository/warehouse.repository";
import { AuthorizationService } from "./authorization.service";

export class WarehouseService {
    private readonly warehouseRepository: WarehouseRepository;
    private readonly authorizationService: AuthorizationService;

    constructor() {
        this.warehouseRepository = new WarehouseRepository();
        this.authorizationService = new AuthorizationService();
    }

    async createWarehouse(
        userId: string,
        inventoryId: string,
        dto: NewWarehouseDto
    ) {
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "admin"
        );

        return this.warehouseRepository.create(inventoryId, dto);
    }

    async getWarehouseById(userId: string, warehouseId: string) {
        await this.authorizationService.assertWarehouseAccess(
            userId,
            warehouseId,
            "viewer"
        );

        const warehouse = await this.warehouseRepository.findById(warehouseId);
        if (!warehouse) {
            throw new NotFoundError("Warehouse not found");
        }

        return warehouse;
    }

    async listWarehousesByInventory(userId: string, inventoryId: string) {
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "viewer"
        );

        const accessibleIds =
            await this.authorizationService.getAccessibleWarehouseIds(
                userId,
                inventoryId
            );

        return this.warehouseRepository.findByInventory(
            inventoryId,
            accessibleIds
        );
    }

    async updateWarehouse(
        userId: string,
        warehouseId: string,
        dto: UpdateWarehouseDto
    ) {
        const inventoryId =
            await this.authorizationService.getWarehouseInventoryId(warehouseId);
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "admin"
        );

        const warehouse = await this.warehouseRepository.findById(warehouseId);
        if (!warehouse) {
            throw new NotFoundError("Warehouse not found");
        }

        return this.warehouseRepository.update(warehouse, dto);
    }

    async deleteWarehouse(userId: string, warehouseId: string) {
        const inventoryId =
            await this.authorizationService.getWarehouseInventoryId(warehouseId);
        await this.authorizationService.assertInventoryAccess(
            userId,
            inventoryId,
            "admin"
        );

        const warehouse = await this.warehouseRepository.findById(warehouseId);
        if (!warehouse) {
            throw new NotFoundError("Warehouse not found");
        }

        await this.warehouseRepository.delete(warehouse);
    }
}
