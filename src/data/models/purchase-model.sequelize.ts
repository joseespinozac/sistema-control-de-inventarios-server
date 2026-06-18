import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface PurchaseAttributes {
    id: string;
    purchaseNumber: string;
    supplierId: string;
    inventoryId: string;
    paymentStatus: string;
    paymentMethod: string;
    currency: string;
    status: string;
    total: number;
    notes: string;
    purchaseDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PurchaseCreationAttributes extends Optional<
    PurchaseAttributes,
    "id"
> {}

class Purchase
    extends Model<PurchaseAttributes, PurchaseCreationAttributes>
    implements PurchaseAttributes
{
    public id!: string;
    public purchaseNumber!: string;
    public supplierId!: string;
    public inventoryId!: string;
    public paymentStatus!: string;
    public paymentMethod!: string;
    public currency!: string;
    public status!: string;
    public total!: number;
    public notes!: string;
    public purchaseDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Purchase.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "purchase_id",
        },
        purchaseNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "purchase_number",
        },
        supplierId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "supplier_id",
        },
        inventoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "inventory_id",
        },
        paymentStatus: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "pending",
            field: "purchase_payment_status",
        },
        paymentMethod: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "purchase_payment_method",
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "MXN",
            field: "purchase_currency",
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "purchase_status",
            defaultValue: "draft",
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "purchase_total",
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "purchase_notes",
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "purchase_date",
        },
    },
    {
        tableName: "purchase",
        sequelize: sequelizeConnection,
        updatedAt: "purchase_updated_at",
        createdAt: "purchase_created_at",
    },
);

export default Purchase;
