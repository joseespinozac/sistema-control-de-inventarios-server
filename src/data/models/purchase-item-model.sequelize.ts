import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Product from "./product.model.sequelize";
export interface PurchaseItemAttributes {
    id: number;
    quantity: number;
    unitCost: number;
    totalCost: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PurchaseItemCreationAttributes
    extends Optional<PurchaseItemAttributes, "id"> {}

class PurchaseItem
    extends Model<PurchaseItemAttributes, PurchaseItemCreationAttributes>
    implements PurchaseItemAttributes
{
    public id!: number;
    public quantity!: number;
    public unitCost!: number;
    public totalCost!: number;
    public name?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PurchaseItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    },
    {
        tableName: "purchase_item",
        sequelize: sequelizeConnection, // This is the Sequelize instance
        createdAt: "purchase_item_created_at",
        updatedAt: "purchase_item_updated_at",
    }
);

Product.hasMany(PurchaseItem, {
    foreignKey: "product_id",
    as: "purchaseItems",
});

PurchaseItem.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});

export default PurchaseItem;
