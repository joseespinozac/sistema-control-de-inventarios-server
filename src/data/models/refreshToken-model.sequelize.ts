// src/data/models/refreshToken-model.sequelize.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface RefreshTokenAttributes {
    token: string;
    expiresAt: Date;
    clientId: string;
    userId: string;
}

export interface RefreshTokenCreationAttributes extends Optional<
    RefreshTokenAttributes,
    "token"
> {}

class RefreshToken
    extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
    implements RefreshTokenAttributes
{
    public token!: string;
    public expiresAt!: Date;
    public clientId!: string;
    public userId!: string;
}

RefreshToken.init(
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
        tableName: "refresh_tokens",
        sequelize: sequelizeConnection,
    },
);

export default RefreshToken;
