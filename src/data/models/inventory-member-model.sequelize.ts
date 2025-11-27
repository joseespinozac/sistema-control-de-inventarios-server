import { Optional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import { Inventory } from "./inventory-model.sequelize";
import User from "./user-model.sequelize";

export interface InventoryMemberAttributes {
    id: string;
    role: "owner" | "admin" | "editor" | "viewer";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InventoryMemberCreationAttributes
    extends Optional<InventoryMemberAttributes, "id"> {}

export class InventoryMember
    extends Model<InventoryMemberAttributes, InventoryMemberCreationAttributes>
    implements InventoryMemberAttributes
{
    public id!: string;
    public role!: "owner" | "admin" | "editor" | "viewer";
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InventoryMember.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "inventory_member_id",
        },
        role: {
            type: DataTypes.ENUM("owner", "admin", "editor", "viewer"),
            allowNull: false,
            field: "inventory_member_role",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "inventory_members",
        updatedAt: "inventory_member_updated_at",
        createdAt: "inventory_member_created_at",
    }
);

User.belongsToMany(Inventory, {
    through: InventoryMember,
    foreignKey: "user_id",
    as: "memberOfInventories",
});

Inventory.belongsToMany(User, {
    through: InventoryMember,
    foreignKey: "inventory_id",
    as: "members",
});

export default InventoryMember;
