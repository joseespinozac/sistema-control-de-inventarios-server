import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface WarehouseAttributes {
    id: string;
    name: string;
    description: string;
    location: string;
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
    },
    {
        sequelize: sequelizeConnection,
        tableName: "warehouses",
        updatedAt: "warehouse_updated_at",
        createdAt: "warehouse_created_at",
    }
);
