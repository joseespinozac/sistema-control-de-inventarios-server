import { Request, Response, NextFunction } from "express";
import {
    Request as OAuthRequest,
    Response as OAuthResponse,
} from "oauth2-server";
import oauth from "../../config/oauthServer";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest.interface";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const request = new OAuthRequest(req);
    const response = new OAuthResponse(res);

    oauth
        .authenticate(request, response)
        .then((token) => {
            const userId = token.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            (req as AuthenticatedRequest).userId = userId;
            next();
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
};
