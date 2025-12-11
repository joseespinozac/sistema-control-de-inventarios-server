import { Router, static as _static } from "express";

import TeamsRouter from "./team.route";
import UsersRouter from "./user.route";
import ProjectsRouter from "./project.route";
import TaskRouter from "./task.route";
import AuthRouter from "./auth.route";
import { authenticate } from "../middlewares/authenticate";
import BrandRouter from "./brand.route";
import CategoryRouter from "./category.route";
import MeasureUnitRouter from "./measure-unit.route";
import ProductRouter from "./product.route";

const router = Router();

router.use("/uploads", _static("uploads"));

router.use("/users", authenticate, UsersRouter);
// router.use("/teams", authenticate, TeamsRouter);
// router.use("/projects", authenticate, ProjectsRouter);
// router.use("/tasks", authenticate, TaskRouter);
router.use("/brands", authenticate, BrandRouter);
router.use("/categories", authenticate, CategoryRouter);
router.use("/measure-units", authenticate, MeasureUnitRouter);
router.use("/products", authenticate, ProductRouter);
router.use("/auth", AuthRouter);

export default router;
