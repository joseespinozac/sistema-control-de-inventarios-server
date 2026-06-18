import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";
import { InventoryMemberController } from "../controllers/inventory-member.controller";
import { WarehouseController } from "../controllers/warehouse.controller";
import { inventoryAccess } from "../middlewares/inventoryAccess.middleware";
import { warehouseAccess } from "../middlewares/warehouseAccess.middleware";
import { asyncHandler } from "../wrappers/asyncHandler";

const InventoryRouter = Router();
const inventoryController = new InventoryController();
const inventoryMemberController = new InventoryMemberController();
const warehouseController = new WarehouseController();

InventoryRouter.post("/", asyncHandler(inventoryController.createInventory));
InventoryRouter.get("/list", asyncHandler(inventoryController.listInventories));
InventoryRouter.get(
    "/:inventoryId",
    inventoryAccess("viewer"),
    asyncHandler(inventoryController.getInventoryById)
);
InventoryRouter.put(
    "/:inventoryId",
    inventoryAccess("admin"),
    asyncHandler(inventoryController.updateInventory)
);
InventoryRouter.delete(
    "/:inventoryId",
    inventoryAccess("owner"),
    asyncHandler(inventoryController.deleteInventory)
);

InventoryRouter.post(
    "/:inventoryId/members",
    inventoryAccess("admin"),
    asyncHandler(inventoryMemberController.addMember)
);
InventoryRouter.get(
    "/:inventoryId/members",
    inventoryAccess("viewer"),
    asyncHandler(inventoryMemberController.listMembers)
);
InventoryRouter.put(
    "/:inventoryId/members/:memberId",
    inventoryAccess("admin"),
    asyncHandler(inventoryMemberController.updateMember)
);
InventoryRouter.delete(
    "/:inventoryId/members/:memberId",
    inventoryAccess("admin"),
    asyncHandler(inventoryMemberController.removeMember)
);

InventoryRouter.post(
    "/:inventoryId/warehouses",
    inventoryAccess("admin"),
    asyncHandler(warehouseController.createWarehouse)
);
InventoryRouter.get(
    "/:inventoryId/warehouses",
    inventoryAccess("viewer"),
    asyncHandler(warehouseController.listWarehouses)
);

export default InventoryRouter;
