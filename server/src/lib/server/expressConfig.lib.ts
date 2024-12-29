// This file is used to configure express server without listening to any port or routing
// It is used to start the server differently in different environments
import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { generalVersions } from "../../utils/version.utils.js";
import notFoundMiddleware from "../middlewares/not-found.js";
import errorHandler from "../error/error.handler.js";
import { responseSuccess } from "../../utils/response.utils.js";
import env from "../../utils/env.utils.js";

type ServerType = {
    app: Express;
    init(): void;
    initComplete(...args: any[]): void;
};
const ExpressServer: ServerType = {
    app: express(),
    init() {
        const corsEnvList = env.corsWhitelist;
        const whitelist = [
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://127.0.0.1:3001",
            "http://localhost:3001",
            ...corsEnvList,
        ];
        console.log("cors:", whitelist);
        const corsOptions: CorsOptions = {
            origin(origin, callback) {
                if (!origin) {
                    // for mobile app and postman client
                    // console.log("origin is null");
                    return callback(null, true);
                }
                if (whitelist.indexOf(origin) !== -1) {
                    // console.log("allowed by CORS");
                    callback(null, true);
                } else {
                    // console.log("Not allowed by CORS");
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, //access-control-allow-credentials:true
            optionsSuccessStatus: 204,
            methods: [
                "GET",
                "POST",
                "DELETE",
                "UPDATE",
                "PUT",
                "PATCH",
                "HEAD",
            ],
            allowedHeaders: "*",
            // exposedHeaders: "*",
        };

        this.app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(express.json());

        this.app.get("/", (req, res) =>
            responseSuccess(res, {
                message: "server is running",
                data: generalVersions,
            }),
        );

        console.log("NODE_ENV:", env.nodeEnv);
    },
    initComplete(...args: any[]) {
        this.app.use(notFoundMiddleware);
        this.app.use(errorHandler);
    },
};

export default ExpressServer;
