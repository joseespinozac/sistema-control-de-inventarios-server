import { Optional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";

export type StockMode = "manual" | "auto";

export interface InventoryAttributes {
    id: string;
    name: string;
    lowStockThreshold: number;
    stockMode: StockMode;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryCreationAttributes extends Optional<
    InventoryAttributes,
    "id"
> {}

export class Inventory
    extends Model<InventoryAttributes, InventoryCreationAttributes>
    implements InventoryAttributes
{
    public id!: string;
    public name!: string;
    public lowStockThreshold!: number;
    public stockMode!: StockMode;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Inventory.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "inventory_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "inventory_name",
        },
        lowStockThreshold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5,
            field: "inventory_low_stock_threshold",
        },
        stockMode: {
            type: DataTypes.ENUM("manual", "auto"),
            allowNull: false,
            defaultValue: "manual",
            field: "inventory_stock_mode",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "inventories",
        updatedAt: "inventory_updated_at",
        createdAt: "inventory_created_at",
    },
);

export default Inventory;
