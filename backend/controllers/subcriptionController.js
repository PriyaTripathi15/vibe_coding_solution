const Subscription = require("../models/Subcription");

const addSubscription = async (req, res) => {
  try {
    const {
      serviceName,
      cost,
      billingCycle,
      renewalDate,
    } = req.body;

    const subscription =
      await Subscription.create({
        serviceName,
        cost,
        billingCycle,
        renewalDate,
      });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions =
      await Subscription.find();

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const subscription =
      await Subscription.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    res.json(subscription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addSubscription,
  getSubscriptions,
  updateStatus,
};