import {
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    Optional,
} from "sequelize";
import sequelizeConnection from "../config";
import MeasureUnit from "./measure-unit.model.sequelize";
import Category from "./category-model.sequelize";
import Brand from "./brand-model.sequelize";

export interface ProductAttributes {
    id: number;
    name: string;
    description: string;
    unitQty: number;
    stock: number;
    currentPrice: number;
    sku: string;
    barcode: string;
    images: string[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductCreationAttributes
    extends Optional<ProductAttributes, "id"> {}

export class Product
    extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public unitQty!: number;
    public stock!: number;
    public currentPrice!: number;
    public sku!: string;
    public barcode!: string;
    public images!: string[];
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public declare getCategory: HasOneGetAssociationMixin<Category>;
    public declare setCategory: HasOneSetAssociationMixin<
        Category,
        Category["id"]
    >;
    public declare getBrand: HasOneGetAssociationMixin<Brand>;
    public declare setBrand: HasOneSetAssociationMixin<Brand, Brand["id"]>;
    public declare getMeasureUnit: HasOneGetAssociationMixin<MeasureUnit>;
    public declare setMeasureUnit: HasOneSetAssociationMixin<
        MeasureUnit,
        MeasureUnit["id"]
    >;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
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
        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "product_stock",
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
    }
);

Product.belongsTo(MeasureUnit, {
    foreignKey: "measure_unit_id",
    as: "measureUnit",
});

MeasureUnit.hasMany(Product, {
    foreignKey: "measure_unit_id",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: {
        name: "category_id",
        allowNull: true,
    },
    as: "category",
});

Category.hasMany(Product, {
    foreignKey: "category_id",
    as: "products",
});

Product.belongsTo(Brand, {
    foreignKey: {
        name: "brand_id",
        allowNull: true,
    },
    as: "brand",
});

Brand.hasMany(Product, {
    foreignKey: "brand_id",
    as: "products",
});

export default Product;
