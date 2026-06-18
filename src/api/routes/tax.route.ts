import { Router } from "express";
import { TaxController } from "../controllers/tax.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const TaxRouter = Router();
const taxController = new TaxController();

TaxRouter.post("/", asyncHandler(taxController.createTax));
TaxRouter.get("/", asyncHandler(taxController.getTaxById));
TaxRouter.get("/all", asyncHandler(taxController.getAllTaxes));
TaxRouter.put("/", asyncHandler(taxController.updateTax));
TaxRouter.delete("/", asyncHandler(taxController.deleteTax));

export default TaxRouter;
