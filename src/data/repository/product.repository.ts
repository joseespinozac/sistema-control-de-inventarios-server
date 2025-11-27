import { UpdateProductDto } from "../../api/interfaces/request_dto/product.dto";
import { StringUtil } from "../../utils/string.util";
import Brand from "../models/brand-model.sequelize";
import Category from "../models/category-model.sequelize";
import MeasureUnit from "../models/measure-unit.model.sequelize";
import Product from "../models/product.model.sequelize";

export class ProductRepository {
    async createProduct(data: any) {
        return Product.create(data);
    }

    async updateProduct(
        product: Product,
        updatedProduct: UpdateProductDto,
        updatedImages: string[]
    ) {
        console.log("Images before update:", product.images);
        console.log("New images array:", updatedImages);

        // Primero actualiza solo las imágenes
        await product.update({
            images: updatedImages,
        });

        // Luego actualiza el resto de los campos
        await product.update({
            ...updatedProduct,
        });

        // Actualiza las relaciones
        if (updatedProduct.categoryId) {
            await product.setCategory(
                StringUtil.parseStringToNumber(updatedProduct.categoryId)
            );
        }
        if (updatedProduct.brandId) {
            await product.setBrand(
                StringUtil.parseStringToNumber(updatedProduct.brandId)
            );
        }
        if (updatedProduct.measureUnitId) {
            await product.setMeasureUnit(
                StringUtil.parseStringToNumber(updatedProduct.measureUnitId)
            );
        }

        // Recargar el producto para obtener los datos actualizados
        await product.reload();

        console.log("Images after update:", product.images);
        return product;
    }

    async findProductById(productId: number) {
        return await Product.findByPk(productId, {
            include: [
                { model: Category, as: "category" },
                { model: Brand, as: "brand" },
                { model: MeasureUnit, as: "measureUnit" },
            ],
        });
    }

    async deleteProduct(product: Product) {
        return product.destroy();
    }

    async findAndCount(options: {
        where: any;
        limit: number;
        offset: number;
        order: any[];
    }) {
        const { rows, count } = await Product.findAndCountAll({
            ...options,
            include: [
                { model: Category, as: "category" },
                { model: Brand, as: "brand" },
                { model: MeasureUnit, as: "measureUnit" },
            ],
        });
        return {
            products: rows,
            total: count,
            limit: options.limit,
            offset: options.offset,
        };
    }
}
