import { NotFoundError } from "../../errors/NotFoundError";
import { UserRepository } from "../repository/user.repository";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if(!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    async findUsersBySearchTerm(searchTerm: string) {
        return this.userRepository.findUsersBySearchTerm(searchTerm);
    }

}