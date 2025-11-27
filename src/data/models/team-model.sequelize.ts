import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    Optional,
} from "sequelize";
import User, { UserCreationAttributes } from "./user-model.sequelize";
import Project from "./project-model.sequelize";
import { sequelizeConnection } from "../config";

export interface TeamAttributes {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TeamCreationAttributes
    extends Optional<TeamAttributes, "id"> {}

class Team
    extends Model<TeamAttributes, TeamCreationAttributes>
    implements TeamAttributes
{
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public declare getUsers: BelongsToManyGetAssociationsMixin<User>;
    public declare setUsers: BelongsToManySetAssociationsMixin<
        User,
        User["id"]
    >;
    public declare addUsers: BelongsToManyAddAssociationsMixin<
        User,
        User["id"]
    >;
    public declare addUser: BelongsToManyAddAssociationMixin<User, User["id"]>;
    public declare createUser: BelongsToManyCreateAssociationMixin<User>;
    public declare removeUser: BelongsToManyRemoveAssociationMixin<
        User,
        User["id"]
    >;
    public declare removeUsers: BelongsToManyRemoveAssociationsMixin<
        User,
        User["id"]
    >;
    public declare hasUser: BelongsToManyHasAssociationMixin<User, User["id"]>;
    public declare hasUsers: BelongsToManyHasAssociationsMixin<
        User,
        User["id"]
    >;
    public declare countUsers: BelongsToManyCountAssociationsMixin;

    public declare getOwner: HasOneGetAssociationMixin<User>;
    public declare setOwner: HasOneSetAssociationMixin<User, User["id"]>;

    public declare getProjects: HasManyGetAssociationsMixin<Project>;

    // setComments: Sequelize.HasManySetAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // addComments: Sequelize.HasManyAddAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // addComment: Sequelize.HasManyAddAssociationMixin<CommentInstance, CommentInstance['id']>;
    // createComment: Sequelize.HasManyCreateAssociationMixin<CommentAttributes, CommentInstance>;
    // removeComment: Sequelize.HasManyRemoveAssociationMixin<CommentInstance, CommentInstance['id']>;
    // removeComments: Sequelize.HasManyRemoveAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // hasComment: Sequelize.HasManyHasAssociationMixin<CommentInstance, CommentInstance['id']>;
    // hasComments: Sequelize.HasManyHasAssociationsMixin<CommentInstance, CommentInstance['id']>;
    // countComments: Sequelize.HasManyCountAssociationsMixin;
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            field: "team_id",
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            field: "team_name",
        },
        description: {
            type: new DataTypes.TEXT(),
            allowNull: false,
            field: "team_description",
        },
    },
    {
        tableName: "team",
        updatedAt: "team_updated_at",
        createdAt: "team_created_at",
        sequelize: sequelizeConnection, // passing the `sequelize` instance is required
    }
);

// This way owner_id will be added to the Team table,
// and you can include the owner when querying the Team model
Team.belongsTo(User, { as: "owner", foreignKey: "owner_id" });
// User.hasMany(Team, { as: "ownerTeam", foreignKey: "owner_id" });

Team.hasMany(Project, { foreignKey: "project_team_id", as: "projects" });
Project.belongsTo(Team, { foreignKey: "project_team_id", as: "team" });

export default Team;
