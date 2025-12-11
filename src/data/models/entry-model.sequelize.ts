import { Optional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";

export interface EntryAttributes {
    id: string;
    entryNumber: string;
    entryType: "purchase" | "return" | "adjustment";
    notes: string;
    status: "pending" | "completed" | "canceled" | "rejected";
    rejectionReason?: string;
    receivedDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EntryCreationAttributes
    extends Optional<EntryAttributes, "id"> {}

export class Entry
    extends Model<EntryAttributes, EntryCreationAttributes>
    implements EntryAttributes
{
    public id!: string;
    public entryNumber!: string;
    public entryType!: "purchase" | "return" | "adjustment";
    public notes!: string;
    public status!: "pending" | "completed" | "canceled" | "rejected";
    public rejectionReason?: string;
    public receivedDate?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Entry.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "entry_id",
        },
        entryNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "entry_number",
        },
        entryType: {
            type: DataTypes.ENUM("purchase", "return", "adjustment"),
            allowNull: false,
            field: "entry_type",
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "entry_notes",
        },
        status: {
            type: DataTypes.ENUM(
                "pending",
                "completed",
                "canceled",
                "rejected"
            ),
            allowNull: false,
            defaultValue: "pending",
            field: "entry_status",
        },
        rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "entry_rejection_reason",
        },
        receivedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "entry_received_date",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "entries",
        updatedAt: "entry_updated_at",
        createdAt: "entry_created_at",
    }
);
