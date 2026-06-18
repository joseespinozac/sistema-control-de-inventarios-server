import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface InvoiceDetailAttributes {
    id: string;
    quantityInvoiced: number;
    unitCost: number;
    tax: number;
    discount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvoiceDetailCreationAttributes extends Optional<
    InvoiceDetailAttributes,
    "id"
> {}

class InvoiceDetail
    extends Model<InvoiceDetailAttributes, InvoiceDetailCreationAttributes>
    implements InvoiceDetailAttributes
{
    public id!: string;
    public quantityInvoiced!: number;
    public unitCost!: number;
    public tax!: number;
    public discount!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InvoiceDetail.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "invoice_detail_id",
        },
        quantityInvoiced: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "invoice_detail_quantity_invoiced",
        },
        unitCost: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            field: "invoice_detail_unit_cost",
        },
        tax: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_detail_tax",
        },
        discount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_detail_discount",
        },
    },
    {
        tableName: "invoice_details",
        sequelize: sequelizeConnection,
        updatedAt: "invoice_detail_updated_at",
        createdAt: "invoice_detail_created_at",
    },
);

export default InvoiceDetail;
