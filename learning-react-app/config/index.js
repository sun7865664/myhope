module.exports = {
    "db": require("./mysql"),
    "local": require("./local"),
    "logger": require("./logger"),
    "policies": require("./policies"),
    "schedule": require("./schedule"),
    "session": require("./session")
};
