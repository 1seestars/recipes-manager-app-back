const { Schema } = require("mongoose");

const versionSchema = new Schema({
  description: String
});

module.exports = { versionSchema };
