// src/data/models/client-model.sequelize.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ClientAttributes {
  clientId: number;
  clientSecret: string;
  redirectUris: string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'clientId'> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public clientId!: number;
  public clientSecret!: string;
  public redirectUris!: string;
}

Client.init(
    {
        clientId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        clientSecret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        redirectUris: {
            type: DataTypes.TEXT, // Change this to TEXT to store JSON string
            allowNull: false,
            get() {
                const value = this.getDataValue('redirectUris');
                return value ? JSON.parse(value) : [];
            },
            set(value: string[]) {
                this.setDataValue('redirectUris', JSON.stringify(value));
            },
        },
    },
    {
        tableName: 'clients',
        sequelize: sequelizeConnection,
    }
);

export default Client;