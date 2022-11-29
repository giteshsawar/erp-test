const env = require("./env"),
  response_msgs = require("./response_message.json");

var constantObj = {
  response_msgs: response_msgs,
  baseUrl: "",
};

switch (env) {
  case "development":
    constantObj.baseUrl = "http://localhost:4050";
    break;
}

module.exports = constantObj;
