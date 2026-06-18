import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface WarehouseMemberAttributes {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WarehouseMemberCreationAttributes extends Optional<
    WarehouseMemberAttributes,
    "id"
> {}

export class WarehouseMember
    extends Model<WarehouseMemberAttributes, WarehouseMemberCreationAttributes>
    implements WarehouseMemberAttributes
{
    public id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

WarehouseMember.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "warehouse_member_id",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "warehouse_members",
        updatedAt: "warehouse_member_updated_at",
        createdAt: "warehouse_member_created_at",
        indexes: [
            {
                unique: true,
                fields: ["user_id", "warehouse_id"],
            },
        ],
    },
);

export default WarehouseMember;
