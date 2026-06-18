import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
    constructor(message: string = "Forbidden") {
        super(message, 403);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
