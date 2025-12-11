import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface BrandAttributes {
    id: string;
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
    public id!: string;
    public name!: string;
    public description?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Brand.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
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
