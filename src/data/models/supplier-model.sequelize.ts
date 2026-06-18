import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface SupplierAttributes {
    id: string;
    name: string;
    contactName: string;
    phone: string;
    email: string;
    address: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SupplierCreationAttributes
    extends Optional<SupplierAttributes, "id" | "isActive"> {}

class Supplier
    extends Model<SupplierAttributes, SupplierCreationAttributes>
    implements SupplierAttributes
{
    public id!: string;
    public name!: string;
    public contactName!: string;
    public phone!: string;
    public email!: string;
    public address!: string;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Supplier.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "supplier_id",
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: "supplier_name",
        },
        contactName: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: "supplier_contact_name",
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: "supplier_phone",
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: "supplier_email",
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "supplier_address",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "supplier_is_active",
        },
    },
    {
        tableName: "suppliers",
        sequelize: sequelizeConnection,
        updatedAt: "supplier_updated_at",
        createdAt: "supplier_created_at",
    }
);

export default Supplier;
