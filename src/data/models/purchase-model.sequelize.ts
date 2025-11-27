import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import PurchaseItem from "./purchase-item-model.sequelize";

export interface PurchaseAttributes {
    id: number;
    supplierName: string;
    status: string;
    total: number;
    notes: string;
    purchaseDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PurchaseCreationAttributes
    extends Optional<PurchaseAttributes, "id"> {}

class Purchase
    extends Model<PurchaseAttributes, PurchaseCreationAttributes>
    implements PurchaseAttributes
{
    public id!: number;
    public supplierName!: string;
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
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: "purchase_id",
        },
        supplierName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "supplier_name",
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
    }
);

Purchase.hasMany(PurchaseItem, {
    foreignKey: "purchase_id",
    as: "items",
});

PurchaseItem.belongsTo(Purchase, {
    foreignKey: "purchase_id",
    as: "purchase",
});

export default Purchase;
