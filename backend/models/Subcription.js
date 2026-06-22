const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ["Monthly", "Yearly"],
      required: true,
    },

    renewalDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Paused"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);