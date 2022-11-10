const env = require("./env"),
  response_msgs = require("./response_message.json");

let constantObj = {
  response_msgs: response_msgs,
};

switch (env) {
  case "production":
    constantsObj.baseUrl = "http://localhost:4050/api/v1";
    break;
}

module.exports = constantObj;
