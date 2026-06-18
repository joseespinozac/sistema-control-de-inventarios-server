import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface TaxAttributes {
    id: string;
    code: string;
    name: string;
    taxType: string;
    rate: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TaxCreationAttributes
    extends Optional<TaxAttributes, "id" | "isActive"> {}

class Tax
    extends Model<TaxAttributes, TaxCreationAttributes>
    implements TaxAttributes
{
    public id!: string;
    public code!: string;
    public name!: string;
    public taxType!: string;
    public rate!: number;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Tax.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "tax_id",
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: "tax_code",
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: "tax_name",
        },
        taxType: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "tax_type",
        },
        rate: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false,
            field: "tax_rate",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "tax_is_active",
        },
    },
    {
        tableName: "taxes",
        sequelize: sequelizeConnection,
        updatedAt: "tax_updated_at",
        createdAt: "tax_created_at",
    }
);

export default Tax;
