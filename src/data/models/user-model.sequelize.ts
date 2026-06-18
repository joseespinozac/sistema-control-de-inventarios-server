import {
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyGetAssociationsMixinOptions,
    Model,
    Optional,
} from "sequelize";
import sequelizeConnection from "../config";
import Role from "./user-role-model.sequelize";
import Team from "./team-model.sequelize";
import bcrypt from "bcryptjs";

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    isActive: boolean;
    globalRole: string;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<
    UserAttributes,
    "id" | "isActive" | "globalRole" | "lastLogin"
> {
    role?: Role;
}

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstname!: string;
    public lastname!: string;
    public isActive!: boolean;
    public globalRole!: string;
    public lastLogin?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    declare getTeams: BelongsToManyGetAssociationsMixin<Team>;
    declare getOwnerTeam: HasManyGetAssociationsMixin<Team>;

    public async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: "user_id",
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: "user_username",
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: "user_email",
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "user_password",
        },
        firstname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "user_firstname",
        },
        lastname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "user_lastname",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "user_is_active",
        },
        globalRole: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "user",
            field: "user_global_role",
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "user_last_login",
        },
    },
    {
        tableName: "user",
        sequelize: sequelizeConnection,
        updatedAt: "user_updated_at",
        createdAt: "user_created_at",
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        scopes: {
            withPassword: { attributes: undefined },
        },
        hooks: {
            beforeCreate: async (user: User) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user: User) => {
                if (user.changed("password")) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    },
);

export default User;
