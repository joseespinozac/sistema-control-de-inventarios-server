// src/data/models/accessToken-model.sequelize.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface AccessTokenAttributes {
    token: string;
    expiresAt: Date;
    clientId: string;
    userId: string;
}

export interface AccessTokenCreationAttributes extends Optional<
    AccessTokenAttributes,
    "token"
> {}

class AccessToken
    extends Model<AccessTokenAttributes, AccessTokenCreationAttributes>
    implements AccessTokenAttributes
{
    public token!: string;
    public expiresAt!: Date;
    public clientId!: string;
    public userId!: string;
}

AccessToken.init(
    {
        token: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "access_tokens",
        sequelize: sequelizeConnection,
    },
);

export default AccessToken;
