import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface PurchaseItemAttributes {
    id: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    name?: string;
    pendingProductRegister: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PurchaseItemCreationAttributes extends Optional<
    PurchaseItemAttributes,
    "id"
> {}

class PurchaseItem
    extends Model<PurchaseItemAttributes, PurchaseItemCreationAttributes>
    implements PurchaseItemAttributes
{
    public id!: string;
    public quantity!: number;
    public unitCost!: number;
    public totalCost!: number;
    public name?: string;
    public pendingProductRegister!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PurchaseItem.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "purchase_item_id",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: "purchase_item_quantity",
        },
        unitCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "purchase_item_unit_cost",
        },
        totalCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: "purchase_item_total_cost",
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "purchase_item_name",
        },
        pendingProductRegister: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "purchase_item_pending_product_register",
        },
    },
    {
        tableName: "purchase_item",
        sequelize: sequelizeConnection,
        createdAt: "purchase_item_created_at",
        updatedAt: "purchase_item_updated_at",
    },
);

export default PurchaseItem;
