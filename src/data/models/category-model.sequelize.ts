import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryCreationAttributes
    extends Optional<CategoryAttributes, "id"> {}

class Category
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
{
    public id!: number;
    public name!: string;
    public description?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            field: "category_id",
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "category_name",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "category_description",
        },
    },
    {
        tableName: "category",
        sequelize: sequelizeConnection,
        updatedAt: "category_updated_at",
        createdAt: "category_created_at",
    }
);

export default Category;
