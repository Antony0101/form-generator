const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "secret",
    corsWhitelist: process.env.CORS ? process.env.CORS.split(",") : [],
};

export default env;
