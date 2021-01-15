const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const router = require("../routes/test");
const ErrorResponse = require("../utils/errorResponse");
const { findById } = require("../models/User");

// @desc        Send message
// @route       GET /api/v1/auth/users
// @access      Private/Admin
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { subject, body, email } = req.body;

  if (!email) {
    return res.status(401).json({ error: "Email is required" });
  }

  const fUser = await User.findById(req.user.id);
  const tUser = await User.findOne({ email: req.body.email });

  //console.log(tUser);
  //console.log(fUser);

  console.log(fUser.id);
  console.log(tUser.id);

  if (fUser.id === tUser.id) {
    fUser.sentmessages.unshift({
      to: email,
      subject,
      body,
    });

    fUser.messages.unshift({
      from: fUser.email,
      subject,
      body,
    });

    await fUser.save();
  } else {
    fUser.sentmessages.unshift({
      to: email,
      subject,
      body,
    });

    tUser.messages.unshift({
      from: fUser.email,
      subject,
      body,
    });

    await fUser.save();
    await tUser.save();
  }

  res.status(200).json({
    success: true,
    fUser,
    tUser,
  });
});

// @desc        get sent message from user
// @route       GET /messages/sentmessages/:id
// @access      Private
exports.getSentMessages = asyncHandler(async (req, res, next) => {
  const messages = await User.findById(req.user.id).select("sentmessages");

  if (messages.length === 0) {
    return res.json({ error: "Inbox is empty" });
  }

  return res.json({ messages });
});

// @desc        get message from user
// @route       GET /messages/:Profileid
// @access      Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await User.findOne(req.user).select("messages");
  console.log(messages);

  if (messages.length === 0) {
    return res.json({ error: "Inbox is empty" });
  }

  return res.json({ messages });
});

// @route   DELETE api/profile/experience/:msg_id
// @desc    Delete message
// @access  Private
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    console.log(user);

    // Get remove index
    const removeIndex = user.messages
      .map((item) => item.id)
      .indexOf(req.params.msg_id);

    user.messages.splice(removeIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc        Delete sent message
// @route       GET /messages/sentmessages/:msgId
// @access      Private
exports.deleteSentMessage = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    console.log(user);

    // Get remove index
    const removeIndex = user.sentmessages
      .map((item) => item.id)
      .indexOf(req.params.msg_id);

    user.sentmessages.splice(removeIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
