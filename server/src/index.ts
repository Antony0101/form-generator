import indexRouter from "./router.js";
import ExpressServer from "./lib/server/expressConfig.lib.js";
import http from "http";
import env from "./utils/env.utils.js";

function main() {
    // await defaultLogger.init(`apiServer`, "console");
    ExpressServer.init();
    const app = http.createServer(ExpressServer.app);
    ExpressServer.app.use("/api/v1", indexRouter);
    ExpressServer.initComplete();
    const PORT = env.port;
    app.listen(PORT, () => {
        console.log(`listening on http://127.0.0.1:${PORT}`);
    });

    console.log(`Process ID: ${process.pid}`);
    process.on("SIGTERM", function () {
        app.close(function () {
            console.log("\x1b[33m SIGTERM: closing server \x1b[0m");
        });
        // console.log(process._getActiveHandles().length);
        // console.log(process._getActiveRequests());

        console.log("\x1b[33m SIGTERM: shutting down... \x1b[0m");
    });
}

main();
