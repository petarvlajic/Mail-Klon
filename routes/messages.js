const express = require("express");

const {
  sendMessage,
  getSentMessages,
  getMessages,
  deleteMessage,
  deleteSentMessage,
} = require("../controllers/messages");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.route("/").post(protect, sendMessage);

router.route("/").get(protect, getMessages);

router.route("/delete/:msg_id").delete(protect, deleteMessage);

router.route("/sentmessages").get(protect, getSentMessages);

router.route("/sentmessages/:msg_id").delete(protect, deleteSentMessage);

module.exports = router;
