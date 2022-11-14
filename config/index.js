const path = require("path");
let rootPath = path.normalize(`${__dirname}/..`),
  env = require("./env");

const config = {
  root: rootPath,
  development: {
    app: {
      name: "warehouse_backend",
      domain: "http://localhost:4050",
      webApi: "v1",
    },
    jwtSecret: process.env.jwt_secret || "test_secret",
    port: process.env.PORT || 4050,
    db: process.env.db || "mongodb://localhost:27017/warehouse_db_dev",
    dbName: "warehouse_db",
    rateLimiter: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs,
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    },
  },
};

module.exports = config[env];
