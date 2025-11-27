import { Op } from "sequelize";
import { User } from "../models";

export const USER_EXCLUDED_ATTRIBUTES = ['createdAt', 'updatedAt', 'password'];

export class UserRepository {
    async findUserByEmail(email: string) {
        return User.findOne({ where: { email }, attributes: { exclude: USER_EXCLUDED_ATTRIBUTES } });
    }

    async findUsersBySearchTerm(searchTerm: string) {
        return User.findAll({
            where: {
                username: {
                    [Op.like]: `%${searchTerm}%`
                }
            },
            attributes: { exclude: USER_EXCLUDED_ATTRIBUTES },
        });
    }

    async findUserById(userId: number) {
        return User.findOne({ where: { id: userId }, attributes: { exclude: USER_EXCLUDED_ATTRIBUTES } });
    }
}