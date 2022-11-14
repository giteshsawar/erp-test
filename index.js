require("app-module-path").addPath(__dirname);
const express = require("express"),
  config = require("./config/");
const { errors } = require("celebrate"),
  mongoose = require("mongoose"),
  env = require("./config/env"),
  cors = require("cors"),
  expressSanitizer = require("express-sanitizer");
const app = express();
const http = require("http").Server(app);
const logger = require("./config/logger.js");

app.use(cors());
app.options("*", cors());
app.use(expressSanitizer());

mongoose.connect(
  config.db,
  {
    //auto_reconnect: true,
    //connectWithNoPrimary: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      logger.info("❌ " + "Mongodb Connection Error");
      logger.error(err.toString());
    } else {
      logger.info("✅ " + "Mongodb Connected");
    }
  }
);

http.listen(config.port, () => {
  logger.info(
    `Express server listening on port ${config.port}\nOn env : ${env}`
  );
});

require("./config/express")(app, config);

app.use((req, res, next) => {
  const err = new Error(`${req.path} --	 Path Not Found`);
  err.status = 404;
  next(err);
});

app.use(errors());
app.use((err, req, res, next) => {
  logger.error(err);
  let resObj = {};
  const error = err.stack ? err.stack : err;
  const status = err.status ? err.status : 500;
  console.error("ERROR -> ", error);
  if (env === "staging" || env === "production") {
    resObj = {
      success: false,
      description: typeof err === "object" ? err.message : err,
      message: "Service unavailable. Please try again later",
    };
  } else {
    resObj = {
      success: false,
      description: err.message,
      message: "Service unavailable. please try again later",
      error,
    };
  }

  res.status(status).json(resObj);
});

process.on("unhandledRejection", (reason, p) => {
  logger.error("UNHANDLED REJECTION", reason, p);
});

process.on("uncaughtException", (error) => {
  logger.error("UNCAUGHT EXCEPTION", error);
  process.exit(1);
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = {
  app,
};
