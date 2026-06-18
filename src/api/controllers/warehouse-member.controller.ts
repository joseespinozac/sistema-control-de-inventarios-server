import { WarehouseMemberService } from "../../data/services/warehouse-member.service";
import { handleControllerError } from "../../utils/errorHandler";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import { AssignWarehouseMemberDto } from "../interfaces/request_dto/warehouse-member.dto";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { Request, Response } from "express";

export class WarehouseMemberController {
    private readonly warehouseMemberService: WarehouseMemberService;

    constructor() {
        this.warehouseMemberService = new WarehouseMemberService();
    }

    assignMember = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            const dto: AssignWarehouseMemberDto = req.body;
            const assignment = await this.warehouseMemberService.assignMember(
                userId,
                warehouseId,
                dto
            );
            res.status(201).json({
                message: "Warehouse member assigned",
                data: assignment,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    listMembers = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            const members = await this.warehouseMemberService.listMembers(
                userId,
                warehouseId
            );
            res.status(200).json({
                message: "Warehouse members retrieved",
                data: members,
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    removeMember = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId!;
            const warehouseId = req.params.warehouseId;
            const assignmentId = req.params.assignmentId;
            await this.warehouseMemberService.removeMember(
                userId,
                warehouseId,
                assignmentId
            );
            res.status(200).json({
                message: "Warehouse member removed",
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
