const mongoose = require("mongoose");

const UserLogSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: String,
      required: true,
    },
    affectedResource: {
      type: String,
      required: true,
    },
    actionTaken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserLogs", UserLogSchema);
