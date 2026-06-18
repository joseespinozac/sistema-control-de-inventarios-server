import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface ProductWarehouseAttributes {
    id: string;
    stock: number;
    minStock: number;
    maxStock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductWarehouseCreationAttributes extends Optional<
    ProductWarehouseAttributes,
    "id"
> {}

export class ProductWarehouse
    extends Model<
        ProductWarehouseAttributes,
        ProductWarehouseCreationAttributes
    >
    implements ProductWarehouseAttributes
{
    public id!: string;
    public stock!: number;
    public minStock!: number;
    public maxStock!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductWarehouse.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "product_warehouse_id",
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "product_warehouse_stock",
        },
        minStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "product_warehouse_min_stock",
        },
        maxStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "product_warehouse_max_stock",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "product_warehouses",
        updatedAt: "product_warehouse_updated_at",
        createdAt: "product_warehouse_created_at",
    },
);

export default ProductWarehouse;
