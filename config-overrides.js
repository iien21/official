const path = require("path");

module.exports = function override(config, env) {
  config.resolve.alias = {
    "@": path.resolve("src"),
    "@p": path.resolve("src/pages"),
    "@i": path.resolve("src/images"),
    "@c": path.resolve("src/components"),
    "@co": path.resolve("src/common"),
    "@r": path.resolve("src/redux"),
  };
  return config;
};
