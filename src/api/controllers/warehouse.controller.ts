import { WarehouseService } from "../../data/services/warehouse.service";
import { handleControllerError } from "../../utils/errorHandler";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import {
    NewWarehouseDto,
    UpdateWarehouseDto,
} from "../interfaces/request_dto/warehouse.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";

export class WarehouseController {
    private readonly warehouseService: WarehouseService;

    constructor() {
        this.warehouseService = new WarehouseService();
    }

    createWarehouse = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const dto: NewWarehouseDto = req.body;
            const warehouse = await this.warehouseService.createWarehouse(
                userId,
                inventoryId,
                dto
            );
            res.status(201).json({
                message: "Warehouse created",
                data: warehouse,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getWarehouseById = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            const warehouse = await this.warehouseService.getWarehouseById(
                userId,
                warehouseId
            );
            res.status(200).json({
                message: "Warehouse retrieved",
                data: warehouse,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    listWarehouses = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const warehouses =
                await this.warehouseService.listWarehousesByInventory(
                    userId,
                    inventoryId
                );
            res.status(200).json({
                message: "Warehouses retrieved",
                data: warehouses,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateWarehouse = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            const dto: UpdateWarehouseDto = req.body;
            const warehouse = await this.warehouseService.updateWarehouse(
                userId,
                warehouseId,
                dto
            );
            res.status(200).json({
                message: "Warehouse updated",
                data: warehouse,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteWarehouse = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            await this.warehouseService.deleteWarehouse(
                userId,
                warehouseId
            );
            res.status(200).json({
                message: "Warehouse deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
