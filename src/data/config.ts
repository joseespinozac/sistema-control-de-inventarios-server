import { Sequelize } from "sequelize";

export const sequelizeConnection = new Sequelize({
    dialect: "sqlite",
    storage: "sequelize.sqlite",
    logging: true,
    logQueryParameters: false,
});

export default sequelizeConnection;
