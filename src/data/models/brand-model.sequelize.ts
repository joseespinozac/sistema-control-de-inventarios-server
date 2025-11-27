import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface BrandAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BrandCreationAttributes
    extends Optional<BrandAttributes, "id"> {}

class Brand
    extends Model<BrandAttributes, BrandCreationAttributes>
    implements BrandAttributes
{
    public id!: number;
    public name!: string;
    public description?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Brand.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: "brand_id",
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "brand_name",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "brand_description",
        },
    },
    {
        tableName: "brand",
        sequelize: sequelizeConnection,
        updatedAt: "brand_updated_at",
        createdAt: "brand_created_at",
    }
);

export default Brand;
