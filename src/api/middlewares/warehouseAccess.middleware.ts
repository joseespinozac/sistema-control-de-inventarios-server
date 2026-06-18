import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";
import { AuthorizationService } from "../../data/services/authorization.service";
import { InventoryRole } from "../../data/services/inventory-role.util";
import { handleControllerError } from "../../utils/errorHandler";

const authorizationService = new AuthorizationService();

const resolveWarehouseId = (req: AuthenticatedRequest): string | undefined => {
    return (
        (req.params.warehouseId as string) ||
        (req.body.warehouseId as string) ||
        (req.query.warehouseId as string)
    );
};

export const warehouseAccess =
    (minRole: InventoryRole) =>
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const warehouseId = resolveWarehouseId(req);
            if (!warehouseId) {
                res.status(400).json({ message: "warehouseId is required" });
                return;
            }

            const access = await authorizationService.assertWarehouseAccess(
                req.userId!,
                warehouseId,
                minRole
            );

            (req as any).warehouseId = warehouseId;
            (req as any).inventoryId = access.inventoryId;
            (req as any).inventoryRole = access.role;
            next();
        } catch (error) {
            handleControllerError(error, res);
        }
    };
