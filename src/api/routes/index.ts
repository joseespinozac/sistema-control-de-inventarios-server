import { Router, static as _static } from "express";

import UsersRouter from "./user.route";
import AuthRouter from "./auth.route";
import BrandRouter from "./brand.route";
import CategoryRouter from "./category.route";
import MeasureUnitRouter from "./measure-unit.route";
import ProductRouter from "./product.route";
import SupplierRouter from "./supplier.route";
import TaxRouter from "./tax.route";
import InventoryRouter from "./inventory.route";
import WarehouseRouter from "./warehouse.route";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.use("/uploads", _static("uploads"));

router.use("/users", authenticate, UsersRouter);
router.use("/brands", authenticate, BrandRouter);
router.use("/categories", authenticate, CategoryRouter);
router.use("/measure-units", authenticate, MeasureUnitRouter);
router.use("/products", authenticate, ProductRouter);
router.use("/suppliers", authenticate, SupplierRouter);
router.use("/taxes", authenticate, TaxRouter);
router.use("/inventories", authenticate, InventoryRouter);
router.use("/warehouses", authenticate, WarehouseRouter);
router.use("/auth", AuthRouter);

export default router;
