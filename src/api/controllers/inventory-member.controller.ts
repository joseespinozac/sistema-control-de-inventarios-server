import { InventoryMemberService } from "../../data/services/inventory-member.service";
import { handleControllerError } from "../../utils/errorHandler";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import {
    AddInventoryMemberDto,
    UpdateInventoryMemberDto,
} from "../interfaces/request_dto/inventory-member.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";

export class InventoryMemberController {
    private readonly inventoryMemberService: InventoryMemberService;

    constructor() {
        this.inventoryMemberService = new InventoryMemberService();
    }

    addMember = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const dto: AddInventoryMemberDto = req.body;
            const member = await this.inventoryMemberService.addMember(
                userId,
                inventoryId,
                dto
            );
            res.status(201).json({
                message: "Inventory member added",
                data: member,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    listMembers = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const members = await this.inventoryMemberService.listMembers(
                userId,
                inventoryId
            );
            res.status(200).json({
                message: "Inventory members retrieved",
                data: members,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateMember = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const memberId = req.params.memberId;
            const dto: UpdateInventoryMemberDto = req.body;
            const member = await this.inventoryMemberService.updateMemberRole(
                userId,
                inventoryId,
                memberId,
                dto
            );
            res.status(200).json({
                message: "Inventory member updated",
                data: member,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    removeMember = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const inventoryId = req.params.inventoryId;
            const memberId = req.params.memberId;
            await this.inventoryMemberService.removeMember(
                userId,
                inventoryId,
                memberId
            );
            res.status(200).json({
                message: "Inventory member removed",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
