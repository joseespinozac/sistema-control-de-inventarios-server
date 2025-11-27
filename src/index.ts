import express, { Application, Request, Response } from "express";
import session from "express-session";
import oauth from "./config/oauthServer";
import routes from "./api/routes";
import dbInit from "./data/init";
import cors from "cors";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV ?? "development"}`;

dotenv.config({ path: envFile });

import { OAuthRequest, OAuthResponse } from "oauth2-server";

const port = 3000;

dbInit();

export const get = () => {
    const app: Application = express();

    app.use(
        cors({
            origin: "http://localhost:4200",
            credentials: true,
        })
    );

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        })
    );

    app.post("/oauth/token", (req, res, next) => {
        const request = new OAuthRequest(req);
        const response = new OAuthResponse(res);

        oauth
            .token(request, response)
            .then((token) => {
                res.json(token);
            })
            .catch((err) => {
                res.status(err.code || 500).json(err);
            });
    });

    app.get("/", async (_req: Request, res: Response) => {
        res.status(200).send({
            message: `Welcome to the tasks manager API! \n Endpoints available at http://localhost:${port}/api/v1`,
        });
    });

    app.use("/api/v1", routes);

    return app;
};

export const start = () => {
    const app = get();
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
};

start();
