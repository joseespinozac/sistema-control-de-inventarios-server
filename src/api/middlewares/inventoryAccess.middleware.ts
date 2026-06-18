import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import { AuthorizationService } from "../../data/services/authorization.service";
import { InventoryRole } from "../../data/services/inventory-role.util";
import { handleControllerError } from "../../utils/errorHandler";

const authorizationService = new AuthorizationService();

const resolveInventoryId = (req: AuthenticatedRequest): string | undefined => {
    return (
        (req.params.inventoryId as string) ||
        (req.body.inventoryId as string) ||
        (req.query.inventoryId as string)
    );
};

export const inventoryAccess =
    (minRole: InventoryRole) =>
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const inventoryId = resolveInventoryId(req);
            if (!inventoryId) {
                res.status(400).json({ message: "inventoryId is required" });
                return;
            }

            const role = await authorizationService.assertInventoryAccess(
                req.userId!,
                inventoryId,
                minRole
            );

            (req as any).inventoryId = inventoryId;
            (req as any).inventoryRole = role;
            next();
        } catch (error) {
            handleControllerError(error, res);
        }
    };
