import { Optional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user-model.sequelize";
import { Warehouse } from "./warehouse-model.sequelize";

export interface InventoryAttributes {
    id: string;
    name: string;
    lowStockThreshold: number;
    settings: object | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryCreationAttributes
    extends Optional<InventoryAttributes, "id"> {}

export class Inventory
    extends Model<InventoryAttributes, InventoryCreationAttributes>
    implements InventoryAttributes
{
    public id!: string;
    public name!: string;
    public lowStockThreshold!: number;
    public settings!: object | null;
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
        settings: {
            type: DataTypes.JSON,
            allowNull: true,
            field: "inventory_settings",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "inventories",
        updatedAt: "inventory_updated_at",
        createdAt: "inventory_created_at",
    }
);

Inventory.belongsTo(User, {
    foreignKey: {
        name: "owner_user_id",
        allowNull: false,
    },
    as: "owner",
});

Warehouse.belongsTo(Inventory, {
    foreignKey: {
        name: "inventory_id",
        allowNull: false,
    },
    as: "inventory",
});

Inventory.hasMany(Warehouse, {
    foreignKey: "inventory_id",
    as: "warehouses",
});

export default Inventory;
