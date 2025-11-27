import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { asyncHandler } from "../wrappers/asyncHandler";
import { upload } from "../../utils/multer.util";

const ProductRouter = Router();

const productController = new ProductController();

ProductRouter.post(
    "/",
    upload.array("images", 5),
    asyncHandler(productController.createProduct)
);

ProductRouter.put(
    "/",
    upload.array("images", 5),
    asyncHandler(productController.updateProduct)
);

ProductRouter.get("/", asyncHandler(productController.getProductById));

ProductRouter.delete("/", asyncHandler(productController.deleteProduct));

ProductRouter.get(
    "/list",
    asyncHandler(productController.getPaginatedProducts)
);

export default ProductRouter;
