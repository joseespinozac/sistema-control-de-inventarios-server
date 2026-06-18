import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface EntryDetailsAttributes {
    id: string;
    quantityArrived: number;
    quantityReceived: number;
    quantityNotReceived: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EntryDetailsCreationAttributes extends Optional<
    EntryDetailsAttributes,
    "id"
> {}

export class EntryDetails
    extends Model<EntryDetailsAttributes, EntryDetailsCreationAttributes>
    implements EntryDetailsAttributes
{
    public id!: string;
    public quantityArrived!: number;
    public quantityReceived!: number;
    public quantityNotReceived!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EntryDetails.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "entry_detail_id",
        },
        quantityArrived: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "entry_detail_quantity_arrived",
        },
        quantityReceived: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "entry_detail_quantity_received",
        },
        quantityNotReceived: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "entry_detail_quantity_not_received",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "entry_details",
        updatedAt: "entry_detail_updated_at",
        createdAt: "entry_detail_created_at",
    },
);

export default EntryDetails;
