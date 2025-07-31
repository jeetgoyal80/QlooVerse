// Send friend request

import Friend  from "../models/Friends.js";
export const sendFriendRequest = async (req, res) => {
  const { recipientId } = req.body;
  try {
    const alreadyExists = await Friend.findOne({
      requester: req.user._id,
      recipient: recipientId,
    });

    if (alreadyExists) return res.status(400).json({ message: "Request already sent" });

    const request = new Friend({
      requester: req.user._id,
      recipient: recipientId,
    });

    await request.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await Friend.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = 'accepted';
    await request.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
