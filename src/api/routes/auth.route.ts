// src/api/routes/auth.route.ts
import { Router } from "express";
import oauth from "../../config/oauthServer";
import {
    Request as OAuthRequest,
    Response as OAuthResponse,
} from "oauth2-server";
import { User } from "../../data/models";

const AuthRouter = Router();

AuthRouter.post("/register", async (req, res) => {
    try {
        const { email, password, username, firstname, lastname } = req.body;
        const user = await User.create({
            email,
            password,
            username,
            firstname,
            lastname,
        });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: (err as any).message,
        });
    }
});

AuthRouter.post("/token", (req, res, next) => {
    const request = new OAuthRequest(req);
    const response = new OAuthResponse(res);

    oauth
        .token(request, response)
        .then((token) => {
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("accessToken", token.accessToken, {
                httpOnly: true,
                secure: isProduction,
                path: "/",
            });
            res.cookie("refreshToken", token.refreshToken, {
                httpOnly: true,
                secure: isProduction,
                path: "/",
            });
            res.json(token);
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
});

AuthRouter.get("/authorize", (req, res, next) => {
    const request = new OAuthRequest(req);
    const response = new OAuthResponse(res);

    oauth
        .authorize(request, response)
        .then((code) => {
            res.json(code);
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
});

AuthRouter.post("/logout", (req, res) => {
    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
});

export default AuthRouter;
