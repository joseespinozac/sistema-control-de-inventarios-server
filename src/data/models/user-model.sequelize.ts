import { BelongsToManyGetAssociationsMixin, DataTypes, HasManyGetAssociationsMixin, HasManyGetAssociationsMixinOptions, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import Role from './user-role-model.sequelize';
import Team from './team-model.sequelize';
import bcrypt from 'bcryptjs';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string,
    lastname: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    role?: Role;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstname!: string;
    public lastname!: string;
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: 'user_id',
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'user_username',
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'user_email',
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_password',
        },
        firstname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_firstname',
        },
        lastname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: 'user_lastname',
        },
    },
    {
        tableName: 'user',
        sequelize: sequelizeConnection,
        updatedAt: 'user_updated_at',
        createdAt: 'user_created_at',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { attributes: undefined }
        },
        hooks: {
            beforeCreate: async (user: User) => {
                user.password = await bcrypt.hash(user.password, 10);
              },
            beforeUpdate: async (user: User) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
            }
        }
    }
);

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'user' });

export default User;