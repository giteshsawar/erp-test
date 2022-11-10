const env = require("./env");

const config = {
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
  },
};

module.exports = config[env];
