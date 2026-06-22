const express = require("express");
const {addSubscription,
  getSubscriptions,
  updateStatus,
} = require("../controllers/subcriptionController");
const router = express.Router();



router.post("/", addSubscription);
router.get("/", getSubscriptions);
router.patch(
  "/:id/status",
  updateStatus
);

module.exports = router;