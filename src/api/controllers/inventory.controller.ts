import { InventoryService } from "../../data/services/inventory.service";
import { handleControllerError } from "../../utils/errorHandler";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import {
    NewInventoryDto,
    UpdateInventoryDto,
} from "../interfaces/request_dto/inventory.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Response, Request } from "express";

export class InventoryController {
    private readonly inventoryService: InventoryService;

    constructor() {
        this.inventoryService = new InventoryService();
    }

    createInventory = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const dto: NewInventoryDto = req.body;
            const inventory = await this.inventoryService.createInventory(
                userId,
                dto
            );
            res.status(201).json({
                message: "Inventory created",
                data: inventory,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getInventoryById = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const inventory = await this.inventoryService.getInventoryById(
                userId,
                inventoryId
            );
            res.status(200).json({
                message: "Inventory retrieved",
                data: inventory,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    listInventories = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventories = await this.inventoryService.listInventories(
                userId
            );
            res.status(200).json({
                message: "Inventories retrieved",
                data: inventories,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateInventory = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const dto: UpdateInventoryDto = req.body;
            const inventory = await this.inventoryService.updateInventory(
                userId,
                inventoryId,
                dto
            );
            res.status(200).json({
                message: "Inventory updated",
                data: inventory,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    deleteInventory = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            await this.inventoryService.deleteInventory(
                userId,
                inventoryId
            );
            res.status(200).json({
                message: "Inventory deleted",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
