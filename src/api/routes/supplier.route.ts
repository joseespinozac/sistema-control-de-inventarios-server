import { Router } from "express";
import { SupplierController } from "../controllers/supplier.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const SupplierRouter = Router();
const supplierController = new SupplierController();

SupplierRouter.post("/", asyncHandler(supplierController.createSupplier));
SupplierRouter.get("/", asyncHandler(supplierController.getSupplierById));
SupplierRouter.get("/all", asyncHandler(supplierController.getAllSuppliers));
SupplierRouter.put("/", asyncHandler(supplierController.updateSupplier));
SupplierRouter.delete("/", asyncHandler(supplierController.deleteSupplier));

export default SupplierRouter;
