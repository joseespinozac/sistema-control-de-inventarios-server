import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface InvoiceAttributes {
    id: string;
    invoiceNumber: string;
    invoiceDate: Date;
    subtotal: number;
    totalTaxes: number;
    totalDiscount: number;
    total: number;
    currency: string;
    paymentStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvoiceCreationAttributes extends Optional<
    InvoiceAttributes,
    "id"
> {}

class Invoice
    extends Model<InvoiceAttributes, InvoiceCreationAttributes>
    implements InvoiceAttributes
{
    public id!: string;
    public invoiceNumber!: string;
    public invoiceDate!: Date;
    public subtotal!: number;
    public totalTaxes!: number;
    public totalDiscount!: number;
    public total!: number;
    public currency!: string;
    public paymentStatus!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Invoice.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "invoice_id",
        },
        invoiceNumber: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: "invoice_number",
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "invoice_date",
        },
        subtotal: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_subtotal",
        },
        totalTaxes: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_total_taxes",
        },
        totalDiscount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_total_discount",
        },
        total: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0,
            field: "invoice_total",
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "MXN",
            field: "invoice_currency",
        },
        paymentStatus: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "pending",
            field: "invoice_payment_status",
        },
    },
    {
        tableName: "invoices",
        sequelize: sequelizeConnection,
        updatedAt: "invoice_updated_at",
        createdAt: "invoice_created_at",
    },
);

export default Invoice;
