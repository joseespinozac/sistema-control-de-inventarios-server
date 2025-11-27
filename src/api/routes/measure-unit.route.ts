import { Router } from "express";
import { MeasureUnitController } from "../controllers/measure-unit.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const MeasureUnitRouter = Router();
const measureUnitController = new MeasureUnitController();

MeasureUnitRouter.post(
    "/",
    asyncHandler(measureUnitController.createMeasureUnit)
);
MeasureUnitRouter.get(
    "/all",
    asyncHandler(measureUnitController.getAllMeasureUnits)
);

export default MeasureUnitRouter;
