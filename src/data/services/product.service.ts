import path from "path";
import { QueryOptions } from "../../api/interfaces/QueryOptions.interface";
import {
    NewProductDto,
    UpdateProductDto,
} from "../../api/interfaces/request_dto/product.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import { buildSequelizeQuery } from "../../utils/sequelizeQuery.util";
import { StringUtil } from "../../utils/string.util";
import Product from "../models/product.model.sequelize";
import { ProductRepository } from "../repository/product.repository";
import fs from "fs";

export class ProductService {
    private readonly productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(
        newProduct: NewProductDto,
        images: string[],
    ): Promise<Product> {
        const product = await this.productRepository.createProduct({
            ...newProduct,
            images,
        });
        if (newProduct.categoryId) {
            product.setCategory(newProduct.categoryId);
        }
        if (newProduct.brandId) {
            product.setBrand(newProduct.brandId);
        }
        if (newProduct.measureUnitId) {
            product.setMeasureUnit(newProduct.measureUnitId);
        }
        return product;
    }

    async updateProduct(
        productId: string,
        updatedProduct: UpdateProductDto,
    ): Promise<Product> {
        const product = await this.productRepository.findProductById(productId);
        if (!product) {
            throw new NotFoundError("Product not found");
        }

        const removedImages = updatedProduct.removedImages || [];

        let updatedImages = Array.isArray(product.images)
            ? [...product.images]
            : [];

        if (removedImages && removedImages.length > 0) {
            removedImages.forEach((image) => {
                const imagePath = path.join(__dirname, "..", "..", "..", image);
                if (fs.existsSync(imagePath)) {
                    fs.rm(imagePath, (err) => {
                        console.log(err);
                    });
                    updatedImages = updatedImages.filter(
                        (img) => img !== image,
                    );
                }
            });
        }

        const newImages = updatedProduct.newImages || [];
        console.log("Adding new images:", newImages);

        updatedImages.push(...newImages.map((image) => `${image}`));
        console.log("Final images array:", updatedImages);

        return this.productRepository.updateProduct(
            product,
            updatedProduct,
            updatedImages,
        );
    }

    async deleteProduct(productId: string) {
        const product = await this.productRepository.findProductById(productId);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return this.productRepository.deleteProduct(product);
    }

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productRepository.findProductById(productId);
        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return product;
    }

    async getPaginatedProducts(query: QueryOptions) {
        const options = buildSequelizeQuery(query);
        return this.productRepository.findAndCount(options);
    }
}
