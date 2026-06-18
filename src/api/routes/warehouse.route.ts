import { Router } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";
import { WarehouseMemberController } from "../controllers/warehouse-member.controller";
import { warehouseAccess } from "../middlewares/warehouseAccess.middleware";
import { asyncHandler } from "../wrappers/asyncHandler";

const WarehouseRouter = Router();
const warehouseController = new WarehouseController();
const warehouseMemberController = new WarehouseMemberController();

WarehouseRouter.get(
    "/:warehouseId",
    warehouseAccess("viewer"),
    asyncHandler(warehouseController.getWarehouseById)
);
WarehouseRouter.put(
    "/:warehouseId",
    asyncHandler(warehouseController.updateWarehouse)
);
WarehouseRouter.delete(
    "/:warehouseId",
    asyncHandler(warehouseController.deleteWarehouse)
);

WarehouseRouter.post(
    "/:warehouseId/members",
    warehouseAccess("admin"),
    asyncHandler(warehouseMemberController.assignMember)
);
WarehouseRouter.get(
    "/:warehouseId/members",
    warehouseAccess("viewer"),
    asyncHandler(warehouseMemberController.listMembers)
);
WarehouseRouter.delete(
    "/:warehouseId/members/:assignmentId",
    warehouseAccess("admin"),
    asyncHandler(warehouseMemberController.removeMember)
);

export default WarehouseRouter;
