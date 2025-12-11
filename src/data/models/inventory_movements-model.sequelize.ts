import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface InventoryMovementAttributes {
    id: string;
    movementType: "inbound" | "outbound" | "adjustment" | "transfer";
    quantity: number;
    groupId: string;
    reason: string;
    notes: string;
    status: "pending" | "approved" | "canceled";
    reference_type?: string;
    reference_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryMovementCreationAttributes
    extends Optional<InventoryMovementAttributes, "id"> {}

export class InventoryMovement
    extends Model<
        InventoryMovementAttributes,
        InventoryMovementCreationAttributes
    >
    implements InventoryMovementAttributes
{
    public id!: string;
    public movementType!: "inbound" | "outbound" | "adjustment" | "transfer";
    public quantity!: number;
    public groupId!: string;
    public reason!: string;
    public notes!: string;
    public status!: "pending" | "approved" | "canceled";
    public reference_type?: string;
    public reference_id?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InventoryMovement.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "inventory_movement_id",
        },
        movementType: {
            type: DataTypes.ENUM(
                "inbound",
                "outbound",
                "adjustment",
                "transfer"
            ),
            allowNull: false,
            field: "inventory_movement_type",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "inventory_movement_quantity",
        },
        groupId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "inventory_movement_group_id",
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "inventory_movement_reason",
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "inventory_movement_notes",
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "canceled"),
            allowNull: false,
            defaultValue: "pending",
            field: "inventory_movement_status",
        },
        reference_type: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "inventory_movement_reference_type",
        },
        reference_id: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "inventory_movement_reference_id",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "inventory_movements",
        updatedAt: "inventory_movement_updated_at",
        createdAt: "inventory_movement_created_at",
    }
);
