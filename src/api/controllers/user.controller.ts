import { Request, Response } from "express";
import { UserService } from "../../data/services/user.service";
import { handleControllerError } from "../../utils/errorHandler";

export class UserController {

    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsersBySearchQuery = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.findUsersBySearchTerm(req.query.search as string);
            res.status(200).send(users);
        } catch (error) {
            handleControllerError(error, res);
        }
    }

    getUserByEmail = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.findUserByEmail(req.query.email as string);
            res.status(200).send({
                message: 'User found',
                data: user
            });
        } catch (error) {
            handleControllerError(error, res);
        }
    }
}