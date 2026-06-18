import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export type MovementType =
    | "IN"
    | "OUT"
    | "ADJUSTMENT"
    | "TRANSFER_IN"
    | "TRANSFER_OUT";

export interface InventoryMovementAttributes {
    id: string;
    movementType: MovementType;
    quantity: number;
    groupId: string;
    reason: string;
    notes: string;
    status: "draft" | "approved" | "cancelled";
    referenceType?: string;
    referenceId?: string;
    approvedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryMovementCreationAttributes extends Optional<
    InventoryMovementAttributes,
    "id"
> {}

export class InventoryMovement
    extends Model<
        InventoryMovementAttributes,
        InventoryMovementCreationAttributes
    >
    implements InventoryMovementAttributes
{
    public id!: string;
    public movementType!: MovementType;
    public quantity!: number;
    public groupId!: string;
    public reason!: string;
    public notes!: string;
    public status!: "draft" | "approved" | "cancelled";
    public referenceType?: string;
    public referenceId?: string;
    public approvedAt?: Date;
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
                "IN",
                "OUT",
                "ADJUSTMENT",
                "TRANSFER_IN",
                "TRANSFER_OUT",
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
            type: DataTypes.ENUM("draft", "approved", "cancelled"),
            allowNull: false,
            defaultValue: "draft",
            field: "inventory_movement_status",
        },
        referenceType: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "inventory_movement_reference_type",
        },
        referenceId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "inventory_movement_reference_id",
        },
        approvedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "inventory_movement_approved_at",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "inventory_movements",
        updatedAt: "inventory_movement_updated_at",
        createdAt: "inventory_movement_created_at",
    },
);

export default InventoryMovement;
