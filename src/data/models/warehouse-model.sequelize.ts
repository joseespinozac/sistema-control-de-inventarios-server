import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user-model.sequelize";
import Inventory from "./inventory-model.sequelize";

export interface WarehouseAttributes {
    id: string;
    name: string;
    description: string;
    location: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WarehouseCreationAttributes
    extends Optional<WarehouseAttributes, "id"> {}

export class Warehouse
    extends Model<WarehouseAttributes, WarehouseCreationAttributes>
    implements WarehouseAttributes
{
    public id!: string;
    public name!: string;
    public description!: string;
    public location!: string;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Warehouse.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "warehouse_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "warehouse_name",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "warehouse_description",
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "warehouse_location",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "warehouse_is_active",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "warehouses",
        updatedAt: "warehouse_updated_at",
        createdAt: "warehouse_created_at",
    }
);

Warehouse.belongsTo(User, {
    foreignKey: {
        name: "manager_id",
        allowNull: false,
    },
    as: "manager",
});

Warehouse.belongsTo(Inventory, {
    foreignKey: {
        name: "inventory_id",
        allowNull: false,
    },
    as: "inventory",
});

export default Warehouse;
