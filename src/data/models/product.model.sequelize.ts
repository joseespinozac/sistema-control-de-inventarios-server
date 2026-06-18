import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    Optional,
} from "sequelize";
import sequelizeConnection from "../config";
import type MeasureUnit from "./measure-unit.model.sequelize";
import type Category from "./category-model.sequelize";
import type Brand from "./brand-model.sequelize";

export interface ProductAttributes {
    id: string;
    name: string;
    description: string;
    unitQty: number;
    min_stock: number;
    max_stock: number;
    profit_margin: number;
    currentPrice: number;
    sku: string;
    barcode: string;
    images: string[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<
    ProductAttributes,
    "id"
> {}

export class Product
    extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes
{
    public id!: string;
    public name!: string;
    public description!: string;
    public unitQty!: number;
    public currentPrice!: number;
    public sku!: string;
    public barcode!: string;
    public min_stock!: number;
    public max_stock!: number;
    public profit_margin!: number;
    public images!: string[];
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare public getCategory: HasOneGetAssociationMixin<Category>;
    declare public setCategory: HasOneSetAssociationMixin<
        Category,
        Category["id"]
    >;
    declare public getBrand: HasOneGetAssociationMixin<Brand>;
    declare public setBrand: HasOneSetAssociationMixin<Brand, Brand["id"]>;
    declare public getMeasureUnit: HasOneGetAssociationMixin<MeasureUnit>;
    declare public setMeasureUnit: HasOneSetAssociationMixin<
        MeasureUnit,
        MeasureUnit["id"]
    >;
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "product_id",
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "product_name",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "product_description",
        },
        unitQty: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "product_unit_qty",
        },
        min_stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "product_min_stock",
        },
        max_stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "product_max_stock",
        },
        profit_margin: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            field: "product_profit_margin",
        },
        currentPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "product_current_price",
        },
        sku: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "product_sku",
        },
        barcode: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "product_barcode",
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true,
            field: "product_images",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "product_is_active",
        },
    },
    {
        tableName: "products",
        updatedAt: "product_updated_at",
        createdAt: "product_created_at",
        sequelize: sequelizeConnection,
    },
);

export default Product;
