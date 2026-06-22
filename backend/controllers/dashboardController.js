const Subscription = require("../models/Subcription");

const getMetrics = async (req, res) => {
  try {
    const subscriptions =
      await Subscription.find({
        status: "Active",
      });

    let totalMonthlyBurnRate = 0;

    let upcomingRenewalsCount = 0;

    const today = new Date();

    subscriptions.forEach((sub) => {
      if (
        sub.billingCycle === "Monthly"
      ) {
        totalMonthlyBurnRate +=
          sub.cost;
      } else {
        totalMonthlyBurnRate +=
          sub.cost / 12;
      }

      const renewalDate =
        new Date(sub.renewalDate);

      const diffDays = Math.ceil(
        (renewalDate - today) /
          (1000 * 60 * 60 * 24)
      );

      if (
        diffDays >= 0 &&
        diffDays <= 7
      ) {
        upcomingRenewalsCount++;
      }
    });

    res.json({
      totalMonthlyBurnRate:
        Number(
          totalMonthlyBurnRate.toFixed(2)
        ),
      upcomingRenewalsCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMetrics,
};