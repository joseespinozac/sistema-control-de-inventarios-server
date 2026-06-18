import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface InvoiceDetailTaxAttributes {
    id: string;
    taxRate: number;
    taxAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvoiceDetailTaxCreationAttributes extends Optional<
    InvoiceDetailTaxAttributes,
    "id"
> {}

class InvoiceDetailTax
    extends Model<
        InvoiceDetailTaxAttributes,
        InvoiceDetailTaxCreationAttributes
    >
    implements InvoiceDetailTaxAttributes
{
    public id!: string;
    public taxRate!: number;
    public taxAmount!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InvoiceDetailTax.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "invoice_detail_tax_id",
        },
        taxRate: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false,
            field: "invoice_detail_tax_rate",
        },
        taxAmount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            field: "invoice_detail_tax_amount",
        },
    },
    {
        tableName: "invoice_detail_taxes",
        sequelize: sequelizeConnection,
        updatedAt: "invoice_detail_tax_updated_at",
        createdAt: "invoice_detail_tax_created_at",
    },
);

export default InvoiceDetailTax;
